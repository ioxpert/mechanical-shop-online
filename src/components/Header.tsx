import React, { useState, useEffect, useCallback, FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Layout, Button, Badge, Drawer, Space } from "antd";
import {
  ShoppingCartOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { NAV_LINKS } from "../constant/constants";
import { useTranslation } from "../localization/useTranslation";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  LIGHT_COLOR,
  getHeaderStyle,
  getHeaderPaddingStyle,
  containerStyle,
  getLogoStyle,
  logoImgStyle,
  getLogoTextStyle,
  getNavStyle,
  navLinkStyle,
  navLinkHoverStyle,
  getActionsStyle,
  cartButtonStyle,
  mobileMenuStyle,
  getMobileMenuContentStyle,
  getMobileLinkStyle,
  getMobileLinkActiveStyle,
  getCartBadgeStyle,
  getMenuButtonStyle,
} from "../styles/headerStyle";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const Header: FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Handle window resize
  useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Manage body overflow when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
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

  const LOGO_SRC = "icons/shop_logo_ga.png";

  // Combined header style
  const headerStyle: React.CSSProperties = {
    ...getHeaderStyle(),
    ...getHeaderPaddingStyle(isMobile),
  };

  const logoStyle = getLogoStyle(isMobile);
  const logoTextStyle = getLogoTextStyle(isMobile);
  const navStyle = getNavStyle(isMobile);
  const actionsStyle = getActionsStyle(isMobile);
  const mobileMenuContentStyle = getMobileMenuContentStyle(isMobile);
  const mobileLinkStyle = getMobileLinkStyle(isMobile);
  const cartBadgeStyle = getCartBadgeStyle(cartItemCount);
  const menuButtonStyle = getMenuButtonStyle();

  return (
    <>
      <header style={headerStyle}>
        <div style={containerStyle}>
          {/* Logo Section */}
          <NavLink to="/" style={logoStyle} title={t("navHome")}>
            <img src={LOGO_SRC} alt={t("logoAlt")} style={logoImgStyle} />
            <h1 style={logoTextStyle}>{t("companyName")}</h1>
          </NavLink>

          {/* Desktop Navigation */}
          <nav style={navStyle} aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.nameKey}
                to={link.path}
                style={({ isActive }: { isActive: boolean }) =>
                  isActive ? navLinkHoverStyle : navLinkStyle
                }
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    SECONDARY_COLOR;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = PRIMARY_COLOR;
                }}>
                {t(link.nameKey)}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions Section */}
          <div style={actionsStyle}>
            <LanguageSwitcher />

            {/* Cart Button */}
            <Badge
              count={cartItemCount > 99 ? "99+" : cartItemCount}
              style={cartBadgeStyle}>
              <Button
                type="text"
                icon={<ShoppingCartOutlined style={{ fontSize: "20px" }} />}
                onClick={handleCartClick}
                style={cartButtonStyle}
                aria-label={`Shopping cart with ${cartItemCount} item${
                  cartItemCount !== 1 ? "s" : ""
                }`}
              />
            </Badge>

            {/* Mobile Menu Toggle */}
            {isMobile && (
              <Button
                type="text"
                icon={
                  isMobileMenuOpen ? (
                    <CloseOutlined style={{ fontSize: "20px" }} />
                  ) : (
                    <MenuOutlined style={{ fontSize: "20px" }} />
                  )
                }
                onClick={handleMenuToggle}
                style={menuButtonStyle}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              />
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <Drawer
        id="mobile-menu"
        title={null}
        placement="right"
        onClose={handleMenuClose}
        open={isMobileMenuOpen && isMobile}
        closeIcon={false}
        bodyStyle={mobileMenuStyle}
        headerStyle={{ display: "none" }}
        width="80%"
        style={{ maxWidth: "400px" }}>
        <div style={mobileMenuContentStyle}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.nameKey}
              to={link.path}
              onClick={handleMenuClose}
              style={({ isActive }: { isActive: boolean }) =>
                isActive ? getMobileLinkActiveStyle() : mobileLinkStyle
              }
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = SECONDARY_COLOR;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = LIGHT_COLOR;
              }}>
              {t(link.nameKey)}
            </NavLink>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default Header;
