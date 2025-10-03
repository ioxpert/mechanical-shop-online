import React, { useState } from "react";
import { useTranslation } from "../localization/useTranslation";
import type { Language } from "../localization/LanguageContext";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Language; name: string }[] = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिन्दी" },
    { code: "pa", name: "ਪੰਜਾਬੀ" },
  ];

  const selectedLanguage =
    languages.find((l) => l.code === language) || languages[0];

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 bg-accent rounded-full text-primary font-semibold hover:bg-secondary/20 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}>
        {selectedLanguage.code.toUpperCase()}
      </button>
      {isOpen && (
        <ul
          className="absolute right-0 mt-2 py-1 w-32 bg-white rounded-md shadow-lg z-10"
          role="menu">
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left px-4 py-2 text-sm ${
                  language === lang.code
                    ? "font-bold text-secondary"
                    : "text-primary"
                } hover:bg-light`}
                role="menuitem">
                {lang.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
