import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { loginRequest } from "../AuthorConfig/AuthorConfig";
import { Get } from "../baseService/baseService";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./practice.module.scss";

const cx = classNames.bind(style);

export const Practice = () => {
    const { instance, inProgress, accounts } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();
    const [authError, setAuthError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // ✅ Xử lý authentication với backend sau khi login Microsoft thành công
    useEffect(() => {
        const authenticateWithBackend = async () => {
            // Skip nếu chưa authenticated hoặc không có account
            if (!isAuthenticated || accounts.length === 0) {

                return;
            }

            // Skip nếu đã có token trong localStorage
            const existingToken = localStorage.getItem('token');
            if (existingToken) {

                navigate('/scoreup/dashboard');
                return;
            }

            // Skip nếu đang loading
            if (isLoading) {
                return;
            }

            setIsLoading(true);
            setAuthError(null);

            try {
                console.log("🔍 Accounts:", accounts);
                console.log("🔍 Account[0]:", accounts[0]);

                // ⚠️ QUAN TRỌNG: Backend cần ACCESS TOKEN, không phải ID TOKEN
                console.log("⚙️ Acquiring access token from Microsoft...");

                const tokenResponse = await instance.acquireTokenSilent({
                    ...loginRequest,
                    account: accounts[0]
                });

                // ✅ Dùng accessToken thay vì idToken
                const token = tokenResponse.accessToken;

                if (!token) {
                    throw new Error("No access token available after acquisition");
                }

                console.log("🔑 Access Token acquired");
                console.log("🔑 Token (first 30 chars):", token.substring(0, 30) + "...");
                console.log("📡 Calling backend API...");

                // ✅ Gửi với format "Bearer <token>" như backend expect
                const login = await Get("/login_microsoft", {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },

                    _skipAuthRefresh: true  // Skip retry interceptor
                });

                console.log("📥 Backend response status:", login?.status);
                console.log("📥 Backend response data:", login?.data);

                if (login?.status === 200) {
                    if (login?.data?.token) {
                        localStorage.setItem('token', JSON.stringify(login.data.token));
                        localStorage.setItem('user', JSON.stringify(login?.data?.data));
                        console.log("✅ Token saved, navigating to dashboard");
                        navigate('/scoreup/dashboard');
                    } else {
                        throw new Error("Backend response missing token");
                    }
                } else {
                    throw new Error(`Backend returned status ${login.status}`);
                }

            } catch (error) {
                console.error("❌ Full error object:", error);
                console.error("❌ Error name:", error.name);
                console.error("❌ Error message:", error.message);
                console.error("❌ Error response:", error.response?.data);

                setAuthError(error.response?.data?.error || error.message);

                // Handle interaction required error
                if (error.name === "InteractionRequiredAuthError") {
                    console.log("🔄 Interaction required, redirecting...");
                    try {
                        await instance.acquireTokenRedirect(loginRequest);
                    } catch (redirectError) {
                        console.error("❌ Redirect error:", redirectError);
                        setAuthError(`Lỗi chuyển hướng: ${redirectError.message}`);
                    }
                } else {
                    // Hiển thị lỗi cho user
                    const errorMsg = error.response?.data?.error || error.message;
                    alert(`Lỗi xác thực: ${errorMsg}\n\nVui lòng thử đăng xuất và đăng nhập lại.`);
                }
            } finally {
                setIsLoading(false);
            }
        };

        authenticateWithBackend();
    }, [isAuthenticated, accounts, instance, navigate, isLoading]);

    // ✅ Handle login button click
    const handleLogin = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setAuthError(null);

        if (inProgress === "none" && !isAuthenticated) {
            console.log("🚀 Starting Microsoft login");
            console.log("📋 Login request scopes:", loginRequest.scopes);

            instance.loginRedirect(loginRequest)
                .catch(error => {
                    console.error("❌ Login redirect error:", error);
                    setAuthError(`Lỗi đăng nhập: ${error.message}`);
                });
        }
    };

    // ✅ Handle logout button click
    const handleLogout = (e) => {
        e.preventDefault();
        e.stopPropagation();
        localStorage.removeItem('token');
        setAuthError(null);
        setIsLoading(false);
        console.log("👋 Logging out...");
        instance.logoutRedirect();
    };

    return (
        <div className={cx('practice')}>
            <div className={cx('practiceContainer')}>
                <div className={cx('loginForm')}>
                    <h1>Đăng nhập</h1>
                    <p>Đăng nhập vào tài khoản của bạn để tiếp cận với kho bài tập lập trình đồ sộ và bổ ích. Hành trình của bạn bắt đầu từ đây!</p>

                    {/* Hiển thị lỗi nếu có */}
                    {authError && (
                        <div style={{
                            padding: '12px',
                            background: '#fee',
                            border: '1px solid #fcc',
                            borderRadius: '8px',
                            marginBottom: '16px',
                            color: '#c00'
                        }}>
                            <strong>⚠️ Lỗi:</strong> {authError}
                        </div>
                    )}

                    {/* Nút đăng nhập */}
                    <button
                        onClick={handleLogin}
                        className={cx('boxBtn')}
                        disabled={inProgress !== "none" || isAuthenticated || isLoading}
                        style={{
                            opacity: (inProgress !== "none" || isAuthenticated || isLoading) ? 0.6 : 1,
                            cursor: (inProgress !== "none" || isAuthenticated || isLoading) ? 'not-allowed' : 'pointer'
                        }}
                    >
                        <img
                            width={15}
                            height={15}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png"
                            alt="Microsoft logo"
                        />
                        <p style={{ margin: 0 }}>
                            {isLoading
                                ? "Đang xác thực với server..."
                                : inProgress !== "none"
                                    ? "Đang xử lý..."
                                    : isAuthenticated
                                        ? "Đang xác thực..."
                                        : "Đăng nhập bằng Microsoft 365 (VIU)"}
                        </p>
                    </button>

                    {/* Nút đăng xuất (chỉ hiện khi đã authenticated) */}
                    {isAuthenticated && (
                        <button
                            onClick={handleLogout}
                            style={{
                                marginTop: '10px',
                                padding: '10px 20px',
                                background: '#f0f0f0',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                width: '100%'
                            }}
                        >
                            🔄 Đăng xuất và thử lại
                        </button>
                    )}
                </div>

                <div className={cx('image-section')}>
                    <img
                        style={{ width: 500 }}
                        src="https://readymadeui.com/login-image.webp"
                        alt="Hình ảnh minh họa đăng nhập"
                    />
                </div>
            </div>
        </div>
    );
};