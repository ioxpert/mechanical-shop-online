import React, { createContext, useState, ReactNode } from 'react';
import { translations } from './translations';

export type Language = 'en' | 'hi' | 'pa';
// FIX: Export TranslationKey to be used in other files.
export type TranslationKey = keyof typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, options?: { [key: string]: string }) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: TranslationKey, options?: { [key: string]: string }): string => {
    let text = translations[language][key] || translations.en[key] || key;
    if (options) {
      Object.keys(options).forEach(optionKey => {
        text = text.replace(`{{${optionKey}}}`, options[optionKey]);
      });
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
