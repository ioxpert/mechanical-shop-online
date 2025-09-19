
import React from 'react';
import { useTranslation } from '../localization/useTranslation';
import { CONTACT_INFO } from '../constants';

const FacebookIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
);

const TwitterIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
    </svg>
);

const InstagramIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round"></line>
    </svg>
);


const Footer: React.FC = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-light">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-center md:text-left">&copy; {year} {t('companyName')}. {t('footerRights')}</p>
          <div className="flex mt-4 md:mt-0 space-x-6">
            <span className="opacity-50 cursor-not-allowed" title="Facebook (inactive)">
              <FacebookIcon />
            </span>
            <a href={CONTACT_INFO.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors duration-300" title="Instagram">
              <InstagramIcon />
            </a>
            <span className="opacity-50 cursor-not-allowed" title="Twitter (inactive)">
              <TwitterIcon />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
