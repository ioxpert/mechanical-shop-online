
import React from 'react';
import { useTranslation } from '../localization/useTranslation';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-light">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-center md:text-left">&copy; {year} {t('companyName')}. {t('footerRights')}</p>
          <div className="flex mt-4 md:mt-0 space-x-6">
            <a href="#" className="hover:text-secondary transition-colors duration-300">Facebook</a>
            <a href="#" className="hover:text-secondary transition-colors duration-300">Instagram</a>
            <a href="#" className="hover:text-secondary transition-colors duration-300">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
