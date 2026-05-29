/* Shared animation variants for Framer Motion.
   Define once here — import wherever needed.
   Changing a value here updates every component that uses it. */

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

/* Fade up — used for most section entrances */
export const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

/* Stagger container — applies staggerChildren so each child animates after the previous */
export const staggerContainer = (stagger = 0.1, delayStart = 0) => ({
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren: delayStart },
  },
});

/* Fade in only — for elements that shouldn't move */
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

/* Scale in — for buttons and cards */
export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
};

/* Slide in from right — for hero image */
export const slideInRight = {
  hidden:  { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
};

export const WHATSAPP_NUMBER = "+254700000000";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`;
export const INSTAGRAM_HANDLE = "@_the_hoodie_guy_1";
export const INSTAGRAM_URL = "https://instagram.com/_the_hoodie_guy_1";
