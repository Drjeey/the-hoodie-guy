import { Container } from "@/components/ui/Container";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { CustomOrderWizard } from "@/components/sections/CustomOrderWizard";

export const metadata = { title: "Custom Order" };

export default function CustomPage() {
  return (
    <PageWrapper>
    <Container as="main" className="pt-nav min-h-screen">
      <div className="py-20 md:py-28">
        <p className="label text-blue-electric mb-4">You Imagine, We Create</p>
        <h1
          className="font-display text-white uppercase leading-none mb-4"
          style={{ fontSize: "clamp(3rem, 2.5rem + 2.5vw, 5rem)" }}
        >
          Custom Order
        </h1>
        <p className="text-grey-light mb-16" style={{ fontSize: "clamp(0.875rem, 0.8rem + 0.3vw, 1rem)", maxWidth: "50ch" }}>
          One piece minimum. 7-day turnaround. We confirm price on WhatsApp before any payment.
        </p>
        <CustomOrderWizard />
      </div>
    </Container>
    </PageWrapper>
  );
}
