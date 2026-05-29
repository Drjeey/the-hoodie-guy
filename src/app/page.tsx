import { Hero } from "@/components/sections/Hero";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { VideoLookbook } from "@/components/sections/VideoLookbook";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductShowcase />
      <VideoLookbook />
      {/* Phase 8: SocialProof goes here */}
    </>
  );
}
