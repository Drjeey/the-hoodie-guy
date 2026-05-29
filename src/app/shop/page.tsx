import { Container } from "@/components/ui/Container";

export const metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <Container as="main" className="pt-nav min-h-screen flex items-center">
      <div className="py-32">
        <p className="label text-blue-electric mb-4">Coming Soon</p>
        <h1 className="font-display text-white" style={{ fontSize: "clamp(3rem,2.5rem + 2.5vw,5rem)" }}>
          The Shop
        </h1>
        <p className="text-grey-light mt-4">Product catalogue arriving in Phase 5.</p>
      </div>
    </Container>
  );
}
