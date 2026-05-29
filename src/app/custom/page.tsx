import { Container } from "@/components/ui/Container";

export const metadata = { title: "Custom Order" };

export default function CustomPage() {
  return (
    <Container as="main" className="pt-nav min-h-screen flex items-center">
      <div className="py-32">
        <p className="label text-blue-electric mb-4">You Imagine, We Create</p>
        <h1 className="font-display text-white" style={{ fontSize: "clamp(3rem,2.5rem + 2.5vw,5rem)" }}>
          Custom Order
        </h1>
        <p className="text-grey-light mt-4">The full order wizard arrives in Phase 7.</p>
      </div>
    </Container>
  );
}
