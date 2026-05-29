"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { WHATSAPP_NUMBER, EASE_OUT_EXPO } from "@/lib/constants";

/* ── SCHEMA ── */
const schema = z.object({
  productType: z.enum(["hoodie", "shirt"]),
  size:        z.enum(["XS", "S", "M", "L", "XL", "2XL"]),
  color:       z.string().min(1, "Enter a color or colorway"),
  quantity:    z.number().min(1, "Minimum 1 piece").max(100, "Max 100 per order"),
  design:      z.string().min(10, "Please describe your design (min 10 characters)").max(600, "Max 600 characters"),
  name:        z.string().min(2, "Enter your name"),
  phone:       z.string().min(9, "Enter your WhatsApp number"),
  city:        z.string().min(2, "Enter your city"),
  country:     z.enum(["Kenya", "Uganda", "Tanzania", "Rwanda", "Ethiopia", "Other"]),
});

type FormData = z.infer<typeof schema>;

const STEPS = ["Product", "Specs", "Design", "Details", "Review"] as const;
const SIZES = ["XS", "S", "M", "L", "XL", "2XL"] as const;
const COUNTRIES = ["Kenya", "Uganda", "Tanzania", "Rwanda", "Ethiopia", "Other"] as const;

const PRODUCT_CARDS = [
  {
    value: "hoodie" as const,
    label: "Hoodie",
    detail: "380gsm French terry · Oversized fit · Dropped shoulders",
    price: "From KES 4,500",
  },
  {
    value: "shirt" as const,
    label: "T-Shirt",
    detail: "230gsm combed cotton · Relaxed fit · Crew neck",
    price: "From KES 1,900",
  },
];

/* Slide transition — new step slides in from the right, old slides out left */
const stepVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

const transition = { duration: 0.3, ease: EASE_OUT_EXPO };

/* ── FIELD COMPONENTS ── */

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="label mt-1.5"
      style={{ fontSize: "0.6rem", color: "#ff4444" }}
    >
      {message}
    </motion.p>
  );
}

function StyledInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn("w-full bg-transparent font-body text-white outline-none", className)}
      style={{
        border: "none",
        borderBottom: "1px solid var(--color-grey-dark)",
        paddingBottom: "0.625rem",
        fontSize: "clamp(0.9rem, 0.8rem + 0.3vw, 1rem)",
        ...props.style,
      }}
    />
  );
}

function StyledTextarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn("w-full bg-transparent font-body text-white outline-none resize-none", className)}
      style={{
        border: "1px solid var(--color-grey-dark)",
        padding: "1rem",
        fontSize: "clamp(0.9rem, 0.8rem + 0.3vw, 1rem)",
        lineHeight: 1.6,
        ...props.style,
      }}
    />
  );
}

/* ── MAIN WIZARD ── */
export function CustomOrderWizard() {
  const [step, setStep]         = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      productType: undefined,
      size:        undefined,
      color:       "",
      quantity:    1,
      design:      "",
      name:        "",
      phone:       "",
      city:        "",
      country:     "Kenya",
    },
  });

  const values = watch();

  /* Validate only the fields relevant to the current step before advancing */
  const stepFields: (keyof FormData)[][] = [
    ["productType"],
    ["size", "color", "quantity"],
    ["design"],
    ["name", "phone", "city", "country"],
    [],
  ];

  async function goNext() {
    const valid = await trigger(stepFields[step]);
    if (!valid) return;
    setDirection(1);
    setStep((s) => s + 1);
  }

  function goBack() {
    setDirection(-1);
    setStep((s) => s - 1);
  }

  function buildWhatsAppMessage(data: FormData): string {
    return encodeURIComponent(
      `*Custom Order — The Hoodie Guy*\n\n` +
      `Product: ${data.productType === "hoodie" ? "Hoodie" : "T-Shirt"}\n` +
      `Size: ${data.size}\n` +
      `Color/Colorway: ${data.color}\n` +
      `Quantity: ${data.quantity} piece${data.quantity > 1 ? "s" : ""}\n\n` +
      `*Design Brief:*\n${data.design}\n\n` +
      `*My Details:*\n` +
      `Name: ${data.name}\n` +
      `WhatsApp: ${data.phone}\n` +
      `City: ${data.city}, ${data.country}\n\n` +
      `Please confirm availability and estimated turnaround time.`
    );
  }

  function handleSubmit() {
    const data = getValues();
    const msg  = buildWhatsAppMessage(data);
    const num  = WHATSAPP_NUMBER.replace(/\D/g, "");
    window.open(`https://wa.me/${num}?text=${msg}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  /* ── STEP PANELS ── */
  function renderStep() {
    switch (step) {
      /* Step 0: Product type */
      case 0:
        return (
          <div>
            <h2 className="font-display text-white uppercase mb-2" style={{ fontSize: "clamp(1.5rem, 1rem + 2vw, 2.5rem)" }}>
              What are you creating?
            </h2>
            <p className="text-grey-light mb-10" style={{ fontSize: "clamp(0.85rem, 0.8rem + 0.2vw, 0.95rem)" }}>
              Choose your product type to get started.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PRODUCT_CARDS.map((card) => {
                const selected = values.productType === card.value;
                return (
                  <button
                    key={card.value}
                    type="button"
                    onClick={() => setValue("productType", card.value, { shouldValidate: true })}
                    className="text-left p-6 md:p-8 transition-all duration-200"
                    style={{
                      border:          `1px solid ${selected ? "var(--color-blue-electric)" : "var(--color-grey-dark)"}`,
                      backgroundColor: selected ? "rgba(0,82,255,0.06)" : "transparent",
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="font-display text-white uppercase" style={{ fontSize: "clamp(1.5rem, 1rem + 1.5vw, 2rem)" }}>
                        {card.label}
                      </span>
                      <div
                        className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-colors duration-150"
                        style={{
                          borderColor:     selected ? "var(--color-blue-electric)" : "var(--color-grey-mid)",
                          backgroundColor: selected ? "var(--color-blue-electric)" : "transparent",
                        }}
                      >
                        {selected && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                    <p className="text-grey-light mb-3" style={{ fontSize: "0.8rem" }}>{card.detail}</p>
                    <p className="font-accent text-blue-electric uppercase tracking-widest" style={{ fontSize: "0.7rem" }}>
                      {card.price}
                    </p>
                  </button>
                );
              })}
            </div>
            <FieldError message={errors.productType?.message} />
          </div>
        );

      /* Step 1: Specs */
      case 1:
        return (
          <div>
            <h2 className="font-display text-white uppercase mb-2" style={{ fontSize: "clamp(1.5rem, 1rem + 2vw, 2.5rem)" }}>
              Specs
            </h2>
            <p className="text-grey-light mb-10" style={{ fontSize: "clamp(0.85rem, 0.8rem + 0.2vw, 0.95rem)" }}>
              {values.productType === "hoodie" ? "Hoodie" : "T-Shirt"} specs. You can order from 1 piece.
            </p>

            {/* Size */}
            <div className="mb-8">
              <p className="label text-grey-light mb-4" style={{ fontSize: "0.65rem" }}>Size</p>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => {
                  const selected = values.size === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setValue("size", s, { shouldValidate: true })}
                      className="font-accent uppercase tracking-widest transition-all duration-150"
                      style={{
                        padding:         "0.5rem 1rem",
                        fontSize:        "0.75rem",
                        border:          `1px solid ${selected ? "var(--color-blue-electric)" : "var(--color-grey-dark)"}`,
                        color:           selected ? "var(--color-blue-electric)" : "var(--color-grey-light)",
                        backgroundColor: selected ? "rgba(0,82,255,0.06)" : "transparent",
                      }}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
              <FieldError message={errors.size?.message} />
            </div>

            {/* Color */}
            <div className="mb-8">
              <label className="label text-grey-light block mb-4" style={{ fontSize: "0.65rem" }}>
                Color / Colorway
              </label>
              <StyledInput
                {...register("color")}
                placeholder="e.g. Black, Off-white, Electric Blue, Camo..."
              />
              <FieldError message={errors.color?.message} />
            </div>

            {/* Quantity */}
            <div>
              <p className="label text-grey-light mb-4" style={{ fontSize: "0.65rem" }}>Quantity</p>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setValue("quantity", Math.max(1, (values.quantity || 1) - 1))}
                  className="w-10 h-10 flex items-center justify-center transition-colors duration-150"
                  style={{ border: "1px solid var(--color-grey-dark)", color: "var(--color-grey-light)" }}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-display text-white w-8 text-center" style={{ fontSize: "1.5rem" }}>
                  {values.quantity || 1}
                </span>
                <button
                  type="button"
                  onClick={() => setValue("quantity", Math.min(100, (values.quantity || 1) + 1))}
                  className="w-10 h-10 flex items-center justify-center transition-colors duration-150"
                  style={{ border: "1px solid var(--color-grey-dark)", color: "var(--color-grey-light)" }}
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="label text-grey-mid" style={{ fontSize: "0.6rem" }}>
                  {(values.quantity || 1) === 1 ? "1 piece minimum" : `${values.quantity} pieces`}
                </span>
              </div>
              <FieldError message={errors.quantity?.message} />
            </div>
          </div>
        );

      /* Step 2: Design */
      case 2:
        return (
          <div>
            <h2 className="font-display text-white uppercase mb-2" style={{ fontSize: "clamp(1.5rem, 1rem + 2vw, 2.5rem)" }}>
              Describe Your Design
            </h2>
            <p className="text-grey-light mb-10" style={{ fontSize: "clamp(0.85rem, 0.8rem + 0.2vw, 0.95rem)" }}>
              Tell us what you want. Logo placement, text, graphics, references — the more detail, the better the result.
            </p>
            <StyledTextarea
              {...register("design")}
              rows={7}
              placeholder="e.g. Front chest: our crew logo (I'll send the file). Back: 'EAST SIDE' in bold gothic letters, centered. Left sleeve: small star graphic. Black on white hoodie..."
            />
            <div className="flex items-center justify-between mt-2">
              <FieldError message={errors.design?.message} />
              <span
                className="label text-grey-mid ml-auto"
                style={{ fontSize: "0.55rem", color: (values.design?.length || 0) > 550 ? "#ff4444" : undefined }}
              >
                {values.design?.length || 0} / 600
              </span>
            </div>
          </div>
        );

      /* Step 3: Details */
      case 3:
        return (
          <div>
            <h2 className="font-display text-white uppercase mb-2" style={{ fontSize: "clamp(1.5rem, 1rem + 2vw, 2.5rem)" }}>
              Your Details
            </h2>
            <p className="text-grey-light mb-10" style={{ fontSize: "clamp(0.85rem, 0.8rem + 0.2vw, 0.95rem)" }}>
              We'll reach out on WhatsApp to confirm your order.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
              <div>
                <label className="label text-grey-light block mb-3" style={{ fontSize: "0.65rem" }}>Full Name</label>
                <StyledInput {...register("name")} placeholder="Your name" />
                <FieldError message={errors.name?.message} />
              </div>

              <div>
                <label className="label text-grey-light block mb-3" style={{ fontSize: "0.65rem" }}>WhatsApp Number</label>
                <StyledInput {...register("phone")} type="tel" placeholder="+254 7XX XXX XXX" />
                <FieldError message={errors.phone?.message} />
              </div>

              <div>
                <label className="label text-grey-light block mb-3" style={{ fontSize: "0.65rem" }}>City</label>
                <StyledInput {...register("city")} placeholder="Nairobi, Kampala..." />
                <FieldError message={errors.city?.message} />
              </div>

              <div>
                <label className="label text-grey-light block mb-3" style={{ fontSize: "0.65rem" }}>Country</label>
                <div style={{ borderBottom: "1px solid var(--color-grey-dark)" }}>
                  <select
                    {...register("country")}
                    className="w-full bg-transparent text-white outline-none cursor-pointer pb-2.5 appearance-none"
                    style={{ fontSize: "clamp(0.9rem, 0.8rem + 0.3vw, 1rem)" }}
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c} style={{ backgroundColor: "#111" }}>{c}</option>
                    ))}
                  </select>
                </div>
                <FieldError message={errors.country?.message} />
              </div>
            </div>
          </div>
        );

      /* Step 4: Review */
      case 4:
        return (
          <div>
            <h2 className="font-display text-white uppercase mb-2" style={{ fontSize: "clamp(1.5rem, 1rem + 2vw, 2.5rem)" }}>
              Review Your Order
            </h2>
            <p className="text-grey-light mb-8" style={{ fontSize: "clamp(0.85rem, 0.8rem + 0.2vw, 0.95rem)" }}>
              Everything look right? Tapping Send opens WhatsApp with your order pre-filled.
            </p>

            <div style={{ border: "1px solid var(--color-grey-dark)" }}>
              {[
                { label: "Product",       value: values.productType === "hoodie" ? "Hoodie" : "T-Shirt" },
                { label: "Size",          value: values.size },
                { label: "Color",         value: values.color },
                { label: "Quantity",      value: `${values.quantity} piece${values.quantity > 1 ? "s" : ""}` },
                { label: "Design Brief",  value: values.design },
                { label: "Name",          value: values.name },
                { label: "WhatsApp",      value: values.phone },
                { label: "Location",      value: `${values.city}, ${values.country}` },
              ].map((row, i, arr) => (
                <div
                  key={row.label}
                  className="flex gap-6 px-6 py-4"
                  style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--color-grey-dark)" : undefined }}
                >
                  <span className="label text-grey-mid shrink-0 w-24" style={{ fontSize: "0.6rem", paddingTop: "0.15rem" }}>
                    {row.label}
                  </span>
                  <span className="text-white leading-snug" style={{ fontSize: "clamp(0.85rem, 0.8rem + 0.2vw, 0.95rem)" }}>
                    {row.value || <span style={{ color: "var(--color-grey-mid)" }}>—</span>}
                  </span>
                </div>
              ))}
            </div>

            <p className="label text-grey-mid mt-5" style={{ fontSize: "0.6rem" }}>
              Sending opens WhatsApp. Our team confirms within 24 hours and gives you a final price before any payment.
            </p>
          </div>
        );

      default:
        return null;
    }
  }

  /* ── SUBMITTED STATE ── */
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        className="text-center py-20"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: "rgba(0,82,255,0.1)", border: "1px solid var(--color-blue-electric)" }}
        >
          <Check className="w-8 h-8 text-blue-electric" />
        </div>
        <h2 className="font-display text-white uppercase mb-3" style={{ fontSize: "clamp(1.5rem, 1rem + 2vw, 2.5rem)" }}>
          Order Sent
        </h2>
        <p className="text-grey-light mb-8" style={{ fontSize: "clamp(0.85rem, 0.8rem + 0.2vw, 0.95rem)", maxWidth: "40ch", margin: "0 auto 2rem" }}>
          Your order details were sent to WhatsApp. Our team will confirm within 24 hours.
        </p>
        <button
          onClick={() => { setStep(0); setSubmitted(false); }}
          className="label text-blue-electric hover:text-white transition-colors duration-150"
          style={{ fontSize: "0.7rem" }}
        >
          Start Another Order
        </button>
      </motion.div>
    );
  }

  /* ── MAIN RENDER ── */
  return (
    <div className="w-full max-w-2xl">
      {/* Progress bar */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className="flex items-center justify-center w-6 h-6 transition-all duration-300"
                style={{
                  borderRadius:    "50%",
                  border:          `1px solid ${i <= step ? "var(--color-blue-electric)" : "var(--color-grey-dark)"}`,
                  backgroundColor: i < step ? "var(--color-blue-electric)" : "transparent",
                  color:           i <= step ? "var(--color-blue-electric)" : "var(--color-grey-mid)",
                }}
              >
                {i < step
                  ? <Check className="w-3 h-3 text-white" />
                  : <span className="font-accent" style={{ fontSize: "0.6rem" }}>{i + 1}</span>
                }
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className="h-px transition-all duration-500"
                  style={{
                    width:           "2rem",
                    backgroundColor: i < step ? "var(--color-blue-electric)" : "var(--color-grey-dark)",
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <p className="label text-grey-mid" style={{ fontSize: "0.6rem" }}>
          Step {step + 1} of {STEPS.length} — {STEPS[step]}
        </p>
      </div>

      {/* Step content */}
      <div className="relative overflow-hidden" style={{ minHeight: "24rem" }}>
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-10 pt-8" style={{ borderTop: "1px solid var(--color-grey-dark)" }}>
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className="flex items-center gap-2 font-accent uppercase tracking-widest transition-colors duration-150"
          style={{
            fontSize: "0.75rem",
            color:    step === 0 ? "var(--color-grey-mid)" : "var(--color-grey-light)",
            cursor:   step === 0 ? "not-allowed" : "pointer",
          }}
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="flex items-center gap-2 font-accent uppercase tracking-widest px-8 py-3 transition-colors duration-150"
            style={{
              border:          "1px solid var(--color-blue-electric)",
              color:           "var(--color-white)",
              backgroundColor: "var(--color-blue-electric)",
              fontSize:        "0.8rem",
            }}
          >
            Continue <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-2 font-accent uppercase tracking-widest px-8 py-3 transition-colors duration-150"
            style={{
              border:          "1px solid var(--color-blue-electric)",
              color:           "var(--color-white)",
              backgroundColor: "var(--color-blue-electric)",
              fontSize:        "0.8rem",
            }}
          >
            Send via WhatsApp <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
