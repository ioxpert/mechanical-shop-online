import React from "react";

// Color Constants
export const PRIMARY_COLOR = "#0d3d56";
export const SECONDARY_COLOR = "#c7a36e";
export const ACCENT_COLOR = "#f2e8dc";
export const LIGHT_COLOR = "#f5f5f5";

// Hero Section Styles
export const heroSectionStyle: React.CSSProperties = {
  position: "relative",
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "60vh",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage: "url(workshop_img/shope_inside.jpg)",
};

export const heroOverlayStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundColor: PRIMARY_COLOR,
  opacity: 0.6,
};

export const heroContentStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 10,
  textAlign: "center",
  padding: "24px",
};

export const heroTitleStyle: React.CSSProperties = {
  fontSize: "clamp(32px, 5vw, 64px)",
  fontWeight: "bold",
  fontFamily: '"Playfair Display", serif',
  marginBottom: "16px",
  textShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
  margin: "0 0 16px 0",
};

export const heroSubtitleStyle: React.CSSProperties = {
  fontSize: "clamp(16px, 2vw, 20px)",
  marginBottom: "32px",
  maxWidth: "42rem",
  marginLeft: "auto",
  marginRight: "auto",
  textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
};

export const heroPrimaryButtonStyle: React.CSSProperties = {
  backgroundColor: SECONDARY_COLOR,
  color: PRIMARY_COLOR,
  fontWeight: "bold",
  padding: "12px 32px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  transition: "opacity 0.3s ease-in-out",
  fontSize: "18px",
  textDecoration: "none",
  display: "inline-block",
};

export const heroPrimaryButtonHoverStyle: React.CSSProperties = {
  ...heroPrimaryButtonStyle,
  opacity: 0.9,
};

// Featured Products Section Styles
export const featuredProductsSectionStyle: React.CSSProperties = {
  paddingTop: "80px",
  paddingBottom: "80px",
  backgroundColor: ACCENT_COLOR,
};

export const containerStyle: React.CSSProperties = {
  maxWidth: "1200px",
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: "24px",
  paddingRight: "24px",
};

export const sectionHeadingStyle: React.CSSProperties = {
  fontSize: "36px",
  fontWeight: "bold",
  fontFamily: '"Playfair Display", serif',
  textAlign: "center",
  color: PRIMARY_COLOR,
  marginBottom: "48px",
  margin: "0 0 48px 0",
};

export const productGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "40px",
  marginBottom: "0",
};

// Note: For responsive grid, consider adding media queries in a CSS file
// or using window resize hook with component state

export const sectionCtaContainerStyle: React.CSSProperties = {
  textAlign: "center",
  marginTop: "48px",
};

export const sectionPrimaryButtonStyle: React.CSSProperties = {
  backgroundColor: PRIMARY_COLOR,
  color: "white",
  fontWeight: "bold",
  padding: "12px 32px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.3s ease-in-out",
  fontSize: "16px",
  textDecoration: "none",
  display: "inline-block",
};

export const sectionPrimaryButtonHoverStyle: React.CSSProperties = {
  ...sectionPrimaryButtonStyle,
  opacity: 0.9,
};
