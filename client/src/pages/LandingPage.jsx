import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Content from "../components/Content";

function LandingPage() {
  return (
    <div className="bg-black">
      <Hero />
      <Features />
      <Content />
    </div>
  );
}

export default LandingPage;
