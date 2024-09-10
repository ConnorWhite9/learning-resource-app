import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Content from "../components/Content";
import CallToAction from "../components/CallToAction";

function LandingPage() {
  return (
    <div className="bg-black">
      <Hero />
      <Features />
      <Content />
      <CallToAction />
    </div>
  );
}

export default LandingPage;
