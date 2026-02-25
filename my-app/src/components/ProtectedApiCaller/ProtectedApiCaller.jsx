import React, { useEffect, useState } from 'react';
import { useMsal } from "@azure/msal-react";

const ProtectedApiCaller = () => {
    const { instance, accounts } = useMsal();
    const [statusMessage, setStatusMessage] = useState("Đang chờ đăng nhập...");
    const [accessToken, setAccessToken] = useState(null);
    const [tokenInfo, setTokenInfo] = useState(null);

    useEffect(() => {
        if (accounts.length > 0) {
            setStatusMessage("Đã đăng nhập. Đang lấy Access Token...");

            // ✅ Dùng scope đúng
            instance.acquireTokenSilent({
                scopes: ["api://af6bdf14-30af-4652-91ec-eb6795aaaeb4/access_as_user"],
                account: accounts[0]
            })
                .then((response) => {
                    const token = response.accessToken;
                    setAccessToken(token);

                    // Decode token để kiểm tra
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    setTokenInfo(payload);

                    console.log("-----------------------------------------");
                    console.log("✅ TOKEN CHO API CỦA BẠN:");
                    console.log(token);
                    console.log("\n📋 Token Claims:");
                    console.log("   aud:", payload.aud);
                    console.log("   iss:", payload.iss);
                    console.log("   scp:", payload.scp);
                    console.log("   exp:", new Date(payload.exp * 1000).toISOString());
                    console.log("-----------------------------------------");

                    // Kiểm tra audience
                    if (payload.aud === "af6bdf14-30af-4652-91ec-eb6795aaaeb4") {
                        setStatusMessage("✅ Token hợp lệ! Backend sẽ accept token này.");
                    } else {
                        setStatusMessage(`⚠️ Token có audience: ${payload.aud}`);
                    }
                })
                .catch((error) => {
                    console.error("❌ Lỗi lấy token:", error);

                    // Nếu cần interaction (lần đầu sau khi config)
                    if (error.name === "InteractionRequiredAuthError") {
                        console.log("⚠️ Cần consent lại, showing popup...");
                        instance.acquireTokenPopup({
                            scopes: ["api://af6bdf14-30af-4652-91ec-eb6795aaaeb4/access_as_user"],
                            account: accounts[0]
                        })
                            .then((response) => {
                                setAccessToken(response.accessToken);
                                setStatusMessage("✅ Token lấy thành công!");
                            })
                            .catch((popupError) => {
                                console.error("❌ Popup error:", popupError);
                                setStatusMessage(`❌ Lỗi: ${popupError.message}`);
                            });
                    } else {
                        setStatusMessage(`❌ Lỗi: ${error.message}`);
                    }
                });
        } else {
            setAccessToken(null);
            setStatusMessage("Chưa đăng nhập.");
        }
    }, [instance, accounts]);

    return (
        <div style={{
            marginTop: '15px',
            border: '1px solid #ccc',
            padding: '15px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px'
        }}>
            <h4>🔐 Trạng thái Token:</h4>
            <p><strong>{statusMessage}</strong></p>

            {accessToken && tokenInfo && (
                <div style={{ marginTop: '15px' }}>
                    <div style={{
                        padding: '10px',
                        backgroundColor: '#e8f5e9',
                        borderRadius: '4px',
                        marginBottom: '10px'
                    }}>
                        <strong>✅ Audience (aud):</strong><br />
                        <code style={{ fontSize: '0.9em' }}>{tokenInfo.aud}</code>
                        {tokenInfo.aud === "af6bdf14-30af-4652-91ec-eb6795aaaeb4" &&
                            <span style={{ color: 'green', marginLeft: '10px' }}>✓ Đúng!</span>
                        }
                    </div>

                    <div style={{
                        padding: '10px',
                        backgroundColor: '#fff3e0',
                        borderRadius: '4px',
                        marginBottom: '10px'
                    }}>
                        <strong>🔑 Scope (scp):</strong><br />
                        <code style={{ fontSize: '0.9em' }}>{tokenInfo.scp}</code>
                    </div>

                    <details>
                        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                            📄 Xem token (click để mở)
                        </summary>
                        <pre style={{
                            fontSize: '0.7em',
                            wordBreak: 'break-all',
                            backgroundColor: '#fff',
                            padding: '10px',
                            marginTop: '10px',
                            overflowX: 'auto'
                        }}>
                            {accessToken}
                        </pre>
                    </details>
                </div>
            )}
        </div>
    );
};

export default ProtectedApiCaller;