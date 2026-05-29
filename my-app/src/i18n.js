import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"; // Import plugin

import vi from "../locales/vi/translation.json";
import en from "../locales/en/translation.json";

i18n
  .use(LanguageDetector) // Khai báo dùng plugin dò ngôn ngữ
  .use(initReactI18next)
  .init({
    resources: {
      vi: { translation: vi },
      en: { translation: en },
    },

    // ⚠️ XÓA dòng `lng: "vi"` đi. Để LanguageDetector tự quyết định ngôn ngữ
    fallbackLng: "vi",

    // Cấu hình plugin tự động lưu
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag'], // Ưu tiên tìm trong localStorage trước
      caches: ['localStorage'], // Tự động lưu ngôn ngữ vào localStorage khi user thay đổi
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;