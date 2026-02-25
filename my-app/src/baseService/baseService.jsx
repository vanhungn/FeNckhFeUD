import axios from "axios";

const api = axios.create({
    baseURL: "https://cnkh.onrender.com",
    timeout: 100000,
    withCredentials: true,
});

const apiRefresh = axios.create({
    baseURL: "https://cnkh.onrender.com",
    timeout: 100000,
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

// ======================== REQUEST INTERCEPTOR ========================
api.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem("token"));
        if (token) config.headers.authorization = token;
        return config;
    },
    (error) => Promise.reject(error)
);

// ======================== RESPONSE INTERCEPTOR ========================
api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        // Không refresh cho các endpoint này
        const noRefreshUrls = ["/login_microsoft", "/login_google", "/refreshToken"];
        if (noRefreshUrls.some(url => originalRequest.url?.includes(url))) {
            return Promise.reject(error);
        }

        // 400 → Redirect
        if (error.response?.status === 400) {
            window.location.href = "/code_lap_practice";
            return Promise.reject(error); // ✅ Thêm return
        }

        // =============== Xử lý 401 — Token hết hạn ==================
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Đưa request vào queue
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers["authorization"] = token;
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Gọi API refresh token
                const res = await apiRefresh.post("/refreshToken", {});
                const newAccessToken = res.data.accessToken;

                // Lưu token mới
                localStorage.setItem("token", JSON.stringify(newAccessToken));
                api.defaults.headers["authorization"] = newAccessToken;

                // Giải phóng queue
                processQueue(null, newAccessToken);

                // Retry request gốc
                originalRequest.headers['authorization'] = newAccessToken; // ✅ Fix: bỏ backtick
                return api(originalRequest);

            } catch (err) {
                processQueue(err, null);
                console.error("Refresh token failed:", err.response?.data);

                // ✅ Logout khi refresh token hết hạn
                if (err.response?.status === 403) {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                }

                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

// ======================== EXPORT ========================
export const Get = (url, config = {}) => api.get(url, config);
export const Post = (url, body = {}, config = {}) => api.post(url, body, config);
export const Put = (url, body = {}) => api.put(url, body);
export const Delete = (url) => api.delete(url);

export default api;