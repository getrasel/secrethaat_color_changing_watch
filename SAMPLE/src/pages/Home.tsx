import React from "react";
import { OfferSection } from "../components/OfferSection";
import { Benefits } from "../components/Benefits";
import { Gallery } from "../components/Gallery";
import { Features } from "../components/Features";
import { OrderSection } from "../components/OrderSection";
import { FinalCTA } from "../components/FinalCTA";
import { FAQ } from "../components/FAQ";
// import { Footer } from "../components/Footer";
import { MobileStickyOrderBar } from "../components/MobileStickyOrderBar";

export const Home: React.FC = () => {
  return (
    <>
      {/* 1. Hero & Top Value Offer Showcase */}
      <OfferSection />

      {/* 2. Key Product Benefits */}
      <Benefits />

      {/* 3. High-Resolution Product Gallery */}
      <Gallery />

      {/* 4. Technical Features & Specs */}
      <Features />

      {/* 5. Color Selection & Live Checkout Form */}
      <OrderSection />

      {/* 6. Final Urgency CTA */}
      <FinalCTA />

      {/* 7. Frequently Asked Questions */}
      <FAQ />

      {/* 8. Footer Information */}
      {/* <Footer /> */}

      {/* 9. Mobile Sticky Order Bar */}
      <MobileStickyOrderBar />
    </>
  );
};

export default Home;
