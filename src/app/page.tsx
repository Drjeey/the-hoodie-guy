import { Hero } from "@/components/sections/Hero";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { VideoLookbook } from "@/components/sections/VideoLookbook";
import { SocialProof } from "@/components/sections/SocialProof";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductShowcase />
      <VideoLookbook />
      <SocialProof />
    </>
  );
}
