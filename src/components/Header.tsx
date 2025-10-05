import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { NAV_LINKS } from "../constant/constants";
import { useTranslation } from "../localization/useTranslation";
import LanguageSwitcher from "./LanguageSwitcher";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const ShoppingCartIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 S0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const MenuIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const XIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const logoSrc = "icons/shop_logo_ga.png"; // Replace with your logo path

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      // Cleanup function
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-serif">
            <NavLink
              to="/"
              className="flex items-center gap-3 group"
              title={t("navHome")}>
              <img
                src={logoSrc}
                alt={t("logoAlt")}
                className="h-12 w-12 object-cover"
              />
              <h1 className="font-bold text-primary">
                <span className="hidden sm:inline text-xl whitespace-nowrap">
                  {t("companyName")}
                </span>
                <span className="sm:hidden text-2xl">
                  {t("companyNameShort")}
                </span>
              </h1>
            </NavLink>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.nameKey}
                to={link.path}
                className={({ isActive }) =>
                  `text-primary hover:text-secondary transition-colors duration-300 ${
                    isActive ? "font-bold border-b-2 border-secondary" : ""
                  }`
                }>
                {t(link.nameKey)}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              onClick={onCartClick}
              className="relative text-primary hover:text-secondary transition-colors duration-300"
              aria-label="Open shopping cart">
              <ShoppingCartIcon />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-primary hover:text-secondary transition-colors duration-300"
              aria-label="Open menu"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}>
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-50 md:hidden ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true">
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-60 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"></div>

        {/* Menu Panel */}
        <nav
          className={`absolute top-0 right-0 w-4/5 max-w-sm h-full bg-primary p-6 shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="Mobile navigation">
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-light hover:text-secondary"
              aria-label="Close menu">
              <XIcon />
            </button>
          </div>
          <div className="flex flex-col items-center space-y-8 text-center mt-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.nameKey}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-2xl text-light hover:text-secondary transition-colors duration-300 py-2 ${
                    isActive ? "font-bold border-b-2 border-secondary" : ""
                  }`
                }>
                {t(link.nameKey)}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
