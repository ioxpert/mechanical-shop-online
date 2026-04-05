import React from "react";

// Color Constants
export const PRIMARY_COLOR = "#0d3d56";
export const SECONDARY_COLOR = "#c7a36e";
export const LIGHT_COLOR = "#f5f5f5";

// Style Props Interface
export interface HeaderStyleProps {
  isMobile: boolean;
  isMobileMenuOpen: boolean;
}

// Header Container Styles
export const getHeaderStyle = (): React.CSSProperties => ({
  backgroundColor: `rgba(255, 255, 255, 0.8)`,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  position: "sticky",
  top: 0,
  zIndex: 40,
  backdropFilter: "blur(10px)",
});

export const getHeaderPaddingStyle = (
  isMobile: boolean
): React.CSSProperties => ({
  padding: isMobile ? "12px 16px" : "16px 24px",
});

// Container Styles
export const containerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: "1200px",
  margin: "0 auto",
  width: "100%",
};

// Logo Styles
export const getLogoStyle = (isMobile: boolean): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  gap: isMobile ? "8px" : "12px",
  textDecoration: "none",
  flexShrink: 0,
});

export const logoImgStyle: React.CSSProperties = {
  height: "48px",
  width: "48px",
  objectFit: "cover",
  borderRadius: "4px",
};

export const getLogoTextStyle = (isMobile: boolean): React.CSSProperties => ({
  fontFamily: '"Playfair Display", serif',
  fontWeight: 700,
  color: PRIMARY_COLOR,
  margin: 0,
  display: isMobile ? "none" : "block",
  fontSize: isMobile ? "16px" : "20px",
  whiteSpace: "nowrap",
});

// Navigation Styles
export const getNavStyle = (isMobile: boolean): React.CSSProperties => ({
  display: isMobile ? "none" : "flex",
  gap: "32px",
  alignItems: "center",
});

export const navLinkStyle: React.CSSProperties = {
  color: PRIMARY_COLOR,
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: 500,
  transition: "color 0.3s ease",
  cursor: "pointer",
};

export const navLinkHoverStyle: React.CSSProperties = {
  ...navLinkStyle,
  color: SECONDARY_COLOR,
  borderBottom: `2px solid ${SECONDARY_COLOR}`,
};

// Actions Section Styles
export const getActionsStyle = (isMobile: boolean): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  gap: isMobile ? "8px" : "16px",
  flexShrink: 0,
});

export const cartButtonStyle: React.CSSProperties = {
  border: "none",
  background: "transparent",
  color: PRIMARY_COLOR,
  fontSize: "20px",
  cursor: "pointer",
  padding: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "color 0.3s ease",
};

// Mobile Menu Styles
export const mobileMenuStyle: React.CSSProperties = {
  backgroundColor: PRIMARY_COLOR,
};

export const getMobileMenuContentStyle = (
  isMobile: boolean
): React.CSSProperties => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "24px",
  padding: isMobile ? "24px" : "32px",
  marginTop: "32px",
});

export const getMobileLinkStyle = (isMobile: boolean): React.CSSProperties => ({
  color: LIGHT_COLOR,
  textDecoration: "none",
  fontSize: isMobile ? "18px" : "20px",
  fontWeight: 500,
  transition: "color 0.3s ease",
  display: "block",
  width: "100%",
  textAlign: "center",
  padding: "8px 0",
});

export const mobileLinkStyle: React.CSSProperties = {
  color: LIGHT_COLOR,
  textDecoration: "none",
  fontSize: "18px",
  fontWeight: 500,
  transition: "color 0.3s ease",
  display: "block",
  width: "100%",
  textAlign: "center",
  padding: "8px 0",
};

export const getMobileLinkActiveStyle = (): React.CSSProperties => ({
  ...mobileLinkStyle,
  color: SECONDARY_COLOR,
  borderBottom: `2px solid ${SECONDARY_COLOR}`,
});

// Cart Badge Style
export const getCartBadgeStyle = (
  cartItemCount: number
): React.CSSProperties => ({
  backgroundColor: cartItemCount > 0 ? SECONDARY_COLOR : "transparent",
});

// Menu Button Style
export const getMenuButtonStyle = (): React.CSSProperties => ({
  color: PRIMARY_COLOR,
  padding: "8px",
});
