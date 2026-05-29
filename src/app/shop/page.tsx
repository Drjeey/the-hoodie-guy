import { Container } from "@/components/ui/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";

export const metadata = {
  title: "Shop",
  description:
    "Browse The Hoodie Guy collection — heavyweight hoodies, tees, and custom pieces. Shipping across East Africa.",
  alternates: { canonical: "https://thehoodieguy.co.ke/shop" },
};

export default function ShopPage() {
  return (
    <PageWrapper>
      <Container as="main" className="pt-nav min-h-screen flex items-center">
        <div className="py-32">
          <p className="label text-blue-electric mb-4">The Collection</p>
          <h1 className="font-display text-white" style={{ fontSize: "clamp(3rem,2.5rem + 2.5vw,5rem)" }}>
            The Shop
          </h1>
          <p className="text-grey-light mt-4 max-w-sm" style={{ fontSize: "clamp(0.875rem, 0.8rem + 0.3vw, 1rem)" }}>
            Full product catalogue coming soon. In the meantime, order via WhatsApp or use the Custom Order flow.
          </p>
        </div>
      </Container>
    </PageWrapper>
  );
}
