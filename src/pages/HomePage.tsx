import React, { useState } from "react";
import { Link } from "react-router-dom";
// FIX: Import AddToCartProduct type.
import type { Product, AddToCartProduct } from "../../types";
import { PRODUCTS } from "../constant/constants";
import ProductCard from "../components/ProductCard";
import AddToCartModal from "../components/AddToCartModal";
import { useTranslation } from "../localization/useTranslation";
import {
  heroSectionStyle,
  heroOverlayStyle,
  heroContentStyle,
  heroTitleStyle,
  heroSubtitleStyle,
  heroPrimaryButtonStyle,
  heroPrimaryButtonHoverStyle,
  featuredProductsSectionStyle,
  containerStyle,
  sectionHeadingStyle,
  productGridStyle,
  sectionCtaContainerStyle,
  sectionPrimaryButtonStyle,
  sectionPrimaryButtonHoverStyle,
} from "../styles/homePageStyle";

interface HomePageProps {
  // FIX: Use the AddToCartProduct type for the onAddToCart prop.
  onAddToCart: (product: AddToCartProduct) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onAddToCart }) => {
  const { t } = useTranslation();
  const featuredProducts = PRODUCTS.slice(0, 3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [heroButtonHovered, setHeroButtonHovered] = useState(false);
  const [ctaButtonHovered, setCtaButtonHovered] = useState(false);

  const handleAddToCartClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={heroSectionStyle}>
        <div style={heroOverlayStyle}></div>
        <div style={heroContentStyle}>
          <h1 style={heroTitleStyle}>{t("heroTitle")}</h1>
          <p style={heroSubtitleStyle}>{t("heroSubtitle")}</p>
          <Link
            to="/products"
            style={
              heroButtonHovered
                ? heroPrimaryButtonHoverStyle
                : heroPrimaryButtonStyle
            }
            onMouseEnter={() => setHeroButtonHovered(true)}
            onMouseLeave={() => setHeroButtonHovered(false)}>
            {t("exploreProducts")}
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section style={featuredProductsSectionStyle}>
        <div style={containerStyle}>
          <h2 style={sectionHeadingStyle}>{t("featuredProducts")}</h2>
          <div style={productGridStyle}>
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCartClick={handleAddToCartClick}
              />
            ))}
          </div>
          <div style={sectionCtaContainerStyle}>
            <Link
              to="/products"
              style={
                ctaButtonHovered
                  ? sectionPrimaryButtonHoverStyle
                  : sectionPrimaryButtonStyle
              }
              onMouseEnter={() => setCtaButtonHovered(true)}
              onMouseLeave={() => setCtaButtonHovered(false)}>
              {t("viewAllProducts")}
            </Link>
          </div>
        </div>
      </section>

      <AddToCartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />
    </div>
  );
};

export default HomePage;
