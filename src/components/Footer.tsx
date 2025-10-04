import React from "react";
import { useTranslation } from "../localization/useTranslation";
import { CONTACT_INFO, NAV_LINKS } from "../constant/constants";

const LocationIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="inline h-5 w-5 mr-2 text-secondary align-middle"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
  </svg>
);
const EmailIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="inline h-5 w-5 mr-2 text-secondary align-middle"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zm0 12H4V8l8 5 8-5v10z" />
  </svg>
);
const PhoneIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="inline h-5 w-5 mr-2 text-secondary align-middle"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z" />
  </svg>
);

const FacebookIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
    />
  </svg>
);

const TwitterIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
    />
  </svg>
);

const InstagramIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round"></line>
  </svg>
);

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-light mt-8">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row gap-10 justify-between items-start">
          {/* Company Name, Tagline, and Contact Us link */}
          <div className="flex-1 flex flex-col items-center md:items-start">
            <h2 className="font-bold text-2xl mb-2">{t("companyName")}</h2>
            <span className="text-base italic text-light/90 mb-2 block">
              {t("We provide best product quality")}
            </span>
            <a
              href="/contact"
              className="text-secondary font-semibold hover:underline text-base mb-4 block"
            >
              {t("navContact") || "Contact Us"}
            </a>
          </div>
          {/* Centered Menu Bar */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.nameKey}
                  href={link.path}
                  className="text-light hover:text-secondary font-medium transition-colors duration-300 text-lg"
                >
                  {t(link.nameKey)}
                </a>
              ))}
            </nav>
          </div>
          {/* Address & Contact Info on Right */}
          <div className="flex-1 text-right">
            <h2 className="font-bold text-lg mb-4">
              {t("Contact Us") || "Contact & Address"}
            </h2>
            <div className="space-y-4">
              <p className="text-sm font-medium flex items-center justify-end">
                <LocationIcon />
                <span>{CONTACT_INFO.address}</span>
              </p>
              <p className="text-sm flex items-center justify-end">
                <PhoneIcon />
                <span>WhatsApp: </span>
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g,"")}`}
                  className="hover:text-secondary ml-1"
                >
                  {CONTACT_INFO.whatsapp}
                </a>
              </p>
              <p className="text-sm flex items-center justify-end">
                <EmailIcon />
                <span>Email: </span>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:text-secondary ml-1"
                >
                  {CONTACT_INFO.email}
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-light/30 mt-8 pt-4 grid grid-cols-1 md:grid-cols-3 items-center text-xs opacity-80">
          <div className="flex justify-center md:justify-start mb-2 md:mb-0">
            <span>&copy; {year} {t("companyName")}. {t("footerRights")}</span>
          </div>
          <div className="flex justify-center space-x-4 mb-2 md:mb-0">
            <a
              href="https://www.facebook.com/ioware.solutions/"
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
              className="hover:text-secondary"
            >
              <FacebookIcon />
            </a>
            <a
              href={CONTACT_INFO.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              className="hover:text-secondary"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://twitter.com/ioxpert"
              target="_blank"
              rel="noopener noreferrer"
              title="Twitter"
              className="hover:text-secondary"
            >
              <TwitterIcon />
            </a>
          </div>
          <div className="flex justify-center md:justify-end">
            <span>Developed by IOXPERT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
