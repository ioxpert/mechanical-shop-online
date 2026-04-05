import React, { useState, useEffect, useCallback, FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { NAV_LINKS } from "../constant/constants";
import { useTranslation } from "../localization/useTranslation";
import LanguageSwitcher from "./LanguageSwitcher";

// Constants
const LOGO_SRC = "icons/shop_logo_ga.png";
const LOGO_SIZE_CLASS = "h-12 w-12";
const ICON_SIZE_CLASS = "h-6 w-6";
const CART_BADGE_SIZE = "h-5 w-5";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

interface SVGIconProps {
  className?: string;
}

// Reusable Icon Components
const ShoppingCartIcon: FC<SVGIconProps> = ({
  className = ICON_SIZE_CLASS,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100-4 2 2 0 000 4z"
    />
  </svg>
);

const MenuIcon: FC<SVGIconProps> = ({ className = ICON_SIZE_CLASS }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const XIcon: FC<SVGIconProps> = ({ className = ICON_SIZE_CLASS }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const Header: FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Manage body overflow when mobile menu is open
  useEffect(() => {
    const handleBodyScroll = (): void => {
      document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    };

    handleBodyScroll();

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleMenuToggle = useCallback((): void => {
    setIsMobileMenuOpen((prev: boolean) => !prev);
  }, []);

  const handleMenuClose = useCallback((): void => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleCartClick = useCallback((): void => {
    onCartClick();
  }, [onCartClick]);

  const isMenuOpen = isMobileMenuOpen;

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          {/* Logo Section */}
          <div className="font-serif flex-shrink-0">
            <NavLink
              to="/"
              className="flex items-center gap-2 sm:gap-3 group"
              title={t("navHome")}>
              <img
                src={LOGO_SRC}
                alt={t("logoAlt")}
                className={`${LOGO_SIZE_CLASS} object-cover rounded`}
              />
              <h1 className="font-bold text-primary hidden sm:block">
                <span className="hidden lg:inline text-lg sm:text-xl whitespace-nowrap">
                  {t("companyName")}
                </span>
                <span className="lg:hidden text-base sm:text-lg">
                  {t("companyNameShort")}
                </span>
              </h1>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-4 lg:space-x-8"
            aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.nameKey}
                to={link.path}
                className={({ isActive }: { isActive: boolean }) =>
                  `text-sm lg:text-base text-primary hover:text-secondary transition-colors duration-300 ${
                    isActive ? "font-bold border-b-2 border-secondary" : ""
                  }`
                }>
                {t(link.nameKey)}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions Section */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            <LanguageSwitcher />
            <button
              onClick={handleCartClick}
              className="relative p-2 lg:p-0 text-primary hover:text-secondary transition-colors duration-300"
              aria-label={`Shopping cart with ${cartItemCount} item${cartItemCount !== 1 ? "s" : ""}`}>
              <ShoppingCartIcon />
              {cartItemCount > 0 && (
                <span
                  className={`absolute -top-1 -right-1 lg:-top-2 lg:-right-2 bg-secondary text-white text-xs font-semibold rounded-full ${CART_BADGE_SIZE} flex items-center justify-center`}
                  aria-live="polite">
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={handleMenuToggle}
              className="md:hidden p-2 text-primary hover:text-secondary transition-colors duration-300"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}>
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-50 md:hidden ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title">
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleMenuClose}
          aria-hidden="true"
        />

        {/* Menu Panel */}
        <nav
          className={`absolute inset-y-0 right-0 w-4/5 sm:w-1/2 max-w-sm bg-primary p-4 sm:p-6 shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="Mobile navigation">
          {/* Close Button */}
          <div className="flex justify-end mb-6 sm:mb-8">
            <button
              onClick={handleMenuClose}
              className="p-2 text-light hover:text-secondary transition-colors duration-300"
              aria-label="Close menu">
              <XIcon />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <div className="flex flex-col items-center space-y-4 sm:space-y-6 text-center mt-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.nameKey}
                to={link.path}
                onClick={handleMenuClose}
                className={({ isActive }: { isActive: boolean }) =>
                  `text-lg sm:text-xl text-light hover:text-secondary transition-colors duration-300 py-2 block w-full ${
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
