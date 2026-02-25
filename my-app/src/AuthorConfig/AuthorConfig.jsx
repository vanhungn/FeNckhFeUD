// src/authConfig.js

import { LogLevel } from "@azure/msal-browser";

// --- 1. CẤU HÌNH MSAL ---
export const msalConfig = {
    auth: {
        // Đã thay thế bằng ID thực tế của bạn
        clientId: "af6bdf14-30af-4652-91ec-eb6795aaaeb4",
        // Đã thay thế bằng ID Tenant thực tế của bạn
        authority: "https://login.microsoftonline.com/2a2722ed-336b-40de-908f-ff6018831c79",

        // Sửa lại: Dùng window.location.origin để tự động lấy địa chỉ host hiện tại
        redirectUri: window.location.origin
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (level === LogLevel.Error) {
                    console.error(message);
                }
            },
            logLevel: LogLevel.Warning,
            piiLoggingEnabled: false
        }
    }
};

// --- 2. CẤU HÌNH LOGIN/TOKEN REQUEST ---
/**
 * Đối tượng này được dùng khi gọi các phương thức đăng nhập và yêu cầu token (acquireTokenSilent/Popup).
 * Xác định các phạm vi (scopes) mà ứng dụng yêu cầu.
 */
export const loginRequest = {
    // Yêu cầu quyền đọc hồ sơ cơ bản của người dùng
    scopes: ["api://af6bdf14-30af-4652-91ec-eb6795aaaeb4/access_as_user"]
};