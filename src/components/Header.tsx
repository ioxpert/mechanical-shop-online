import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 S0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
  const { t } = useTranslation();
  const logoSrc = "../public/icons/shop_logo_ga.png"; // Replace with your logo path

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="font-serif">
          <NavLink
            to="/"
            className="flex items-center gap-3 group"
            title={t("navHome")}
          >
            <img
              src={logoSrc}
              alt={t("logoAlt")}
              className="h-8 w-8 object-cover rounded-lg"
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
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.nameKey}
              to={link.path}
              className={({ isActive }) =>
                `text-primary hover:text-secondary transition-colors duration-300 ${
                  isActive ? "font-bold border-b-2 border-secondary" : ""
                }`
              }
            >
              {t(link.nameKey)}
            </NavLink>
          ))}
        </nav>
        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="text-primary hover:text-secondary focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <button
            onClick={onCartClick}
            className="relative text-primary hover:text-secondary transition-colors duration-300"
          >
            <ShoppingCartIcon />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full z-40 animate-slide-down">
          <div className="flex flex-col items-center py-4 space-y-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.nameKey}
                to={link.path}
                className={({ isActive }) =>
                  `text-primary hover:text-secondary text-lg transition-colors duration-300 ${
                    isActive ? "font-bold border-b-2 border-secondary" : ""
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(link.nameKey)}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
