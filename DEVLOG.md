# THE HOODIE GUY - Development Log

## Project Overview
- **Brand**: The Hoodie Guy
- **Tagline**: You Imagine, We Create
- **Instagram**: @_the_hoodie_guy_1
- **Stack**: Next.js 14 App Router · Tailwind CSS v3 · Framer Motion · GSAP · Lenis · Lucide React · React Hook Form · Zod · Zustand
- **Started**: May 25, 2026
- **Repository**: [GitHub URL - to be added]
- **Live URL**: [Netlify URL - to be added]
- **Built with**: Next.js Â· Tailwind CSS Â· Framer Motion Â· GSAP Â· Lenis

---

## Research Findings

### MetaMask Website Analysis

Sources reviewed:
- https://metamask.io/
- https://www.danishsohail.com/gsap-vs-framer-motion

MetaMask's current site uses scroll-driven storytelling by sequencing product capabilities as the visitor moves down the page. The page starts with a large hero promise, "Your home onchain", then moves into feature moments such as buying, swapping, earning, connecting to dapps, NFTs, privacy, and security. The pattern is useful for The Hoodie Guy because it can translate into "choose base", "send design", "we make it", "you wear it" instead of dumping everything into a generic product grid.

Animation feel:
- The motion language is polished, not playful. It relies on smooth entrances, layered product UI mockups, card-like interface elements, and scroll-timed reveals.
- The timing feels cinematic but controlled: content enters with confidence, then the next feature takes over.
- For The Hoodie Guy, this suggests Framer Motion for component-level reveals and GSAP ScrollTrigger for bigger pinned or parallax moments.

Hero treatment:
- MetaMask places a short, direct value proposition in oversized type, then surrounds it with product visuals and UI artifacts.
- The hero has immediate brand signal: strong name, product promise, call to action, and recognizable visual language.
- For The Hoodie Guy, the hero should make the hoodie/shirt product visible immediately, not just show abstract streetwear mood.

Use of blue and dark backgrounds:
- MetaMask uses dark surfaces with saturated blue and other high-energy accents to make interaction points feel digital and Web3-native.
- The lesson is to keep black as the dominant space and reserve electric blue for CTAs, focus states, active states, progress indicators, and key interaction moments.
- Blue should not become generic decoration. It should mean "act here" or "this is alive".

Glass, grain, and texture:
- The live page uses layered product imagery and glossy UI composition more than heavy decorative glassmorphism.
- Premium Web3 polish comes from depth, motion, contrast, and precision rather than random blur panels.
- For The Hoodie Guy, subtle grain can add tactile fabric/editorial texture, but glass effects should be rare and purposeful.

Typography:
- MetaMask uses large, plain-language headings with short phrases, strong hierarchy, and product-led copy.
- The key hierarchy is: oversized hero statement, short section headlines, concise feature copy, repeated action labels.
- For The Hoodie Guy, display typography should carry attitude in headlines only; body copy should stay clean and readable.

What makes it premium and Web3-native:
- It feels premium because each section has one clear job, the visuals are product-specific, and motion is tied to storytelling.
- It feels Web3-native because the interface elements, dark surface, vivid accents, and scroll choreography communicate digital ownership and control.
- The Hoodie Guy can borrow the pacing and energy without copying crypto UI patterns too literally.

### Print-on-Demand Storefront Analysis

Sources reviewed:
- https://ecomm.design/how-to-design-a-print-on-demand-site/
- https://help.printful.com/hc/en-us/articles/360014067779-How-does-the-Design-Maker-work
- https://help.printful.com/hc/en-us/articles/20196978480028-How-can-I-set-up-a-personalized-product-on-my-Shopify-store
- https://www.tapstitch.com/blog/post/best-print-on-demand-websites-for-fashion-brands-in-2025
- https://ecommerce-platforms.com/articles/print-on-demand-design-trends

Product presentation patterns:
- Premium POD storefronts lead with high-resolution product photography, curated home sections, and clear product detail pages rather than showing a huge marketplace-style grid first.
- Full-bleed editorial imagery works well for brand-building, while clean product grids work best once the user is browsing.
- For The Hoodie Guy, the homepage should feel like a drop/lookbook, then lead into the shop and custom order flow.

Premium vs generic:
- Premium comes from consistent brand identity, strong photography/mockups, product details, transparent process, and a checkout/order flow that feels considered.
- Generic POD stores usually expose template seams: inconsistent mockups, weak product descriptions, unclear sizing, and third-party customization widgets that feel bolted on.
- Since this brand is print-on-demand but locally relationship-driven, transparency and WhatsApp follow-up can become a strength rather than a limitation.

Pricing display:
- Product grids usually show price early for standard items.
- Custom work often uses "from" pricing, then final quote after design review.
- For The Hoodie Guy, standard products can show visible KES prices; custom orders should say "From KES..." and explain that the final quote is confirmed on WhatsApp.

Custom order flow patterns:
- Printful's own design tools center the flow around choosing a product, adding artwork/text, previewing, and publishing or ordering.
- Printful personalization guidance uses placeholders such as "Custom Name" and real-time preview where possible.
- For MVP, a guided custom order wizard is more realistic than a full design editor: choose base, size, describe idea, upload reference, submit contact details.

Trust-building:
- Important trust signals include reviews, quality guarantees, sizing clarity, delivery estimates, real product photos, social proof, and process transparency.
- For Kenya/Uganda, WhatsApp response time, M-PESA readiness, Instagram proof, and delivery clarity are especially important.

### Streetwear E-commerce UX Patterns

Sources reviewed:
- https://orionconcepts.com/project/utf-website/
- https://a-fresh.website/blog/inspiring-ecommerce-website-designs-2025
- https://ecomm.design/how-to-design-a-print-on-demand-site/

Editorial layout patterns:
- Streetwear and techwear sites often use full-bleed heroes, oversized type, split image/text layouts, collage-like image placement, and minimal chrome.
- Under Two Flags is described as combining English tailoring and American streetwear through a curated montage approach, which is relevant for a hoodie brand that wants editorial energy.
- The key is to create attitude without clutter: one strong visual idea per section.

Typography scale:
- Oversized headlines are common because fashion websites sell identity first and specifications second.
- Large type creates a campaign feeling, gives short phrases authority, and lets the brand voice become part of the visual system.
- For The Hoodie Guy, "YOU IMAGINE / WE CREATE" should be treated as the emotional thesis of the site.

Product photography:
- Fashion e-commerce relies on consistent aspect ratios, strong cropping, hover states, and in-context/lifestyle imagery.
- Product cards should use a stable aspect ratio, preferably 2:3 for apparel, so the grid feels deliberate.
- Hover should reveal action without shifting layout.

CTA placement:
- Primary CTA belongs above the fold, near the hero statement.
- Secondary CTAs can sit at the end of each story section: shop the drop, start a custom order, view Instagram, or WhatsApp the team.
- For mobile, CTAs need to appear early and repeat after high-intent sections.

Mobile vs desktop:
- Desktop can carry split layouts, pinned sections, and editorial whitespace.
- Mobile should reduce to strong vertical sequencing: product first, short copy, clear CTA, no hidden essential actions.
- Custom ordering must be mobile-first because much of the East African audience will likely arrive through Instagram or WhatsApp on phones.

### Scroll Animation Library Comparison

Sources reviewed:
- https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- https://www.danishsohail.com/gsap-vs-framer-motion
- https://www.pkgpulse.com/compare/framer-motion-vs-gsap
- https://devdreaming.com/blogs/nextjs-smooth-scrolling-with-lenis-gsap
- https://bridger.to/lenis-nextjs
- https://www.framer.com/help/articles/how-animations-and-effects-work-in-framer/

GSAP ScrollTrigger:
- Strengths: best-in-class scroll storytelling, timelines, pinning, scrubbed animations, complex choreography, framework independence.
- Weaknesses: more imperative than React-native animation; must be cleaned up carefully in React; overuse can hurt performance.
- Bundle/use case: GSAP core is roughly in the same practical range as Framer Motion depending on imports, with plugins added as needed.
- Best use here: hero parallax, pinned lookbook headline, scroll progress moments, and cinematic section transitions.

Framer Motion:
- Strengths: React-friendly component animation, hover/tap states, route transitions, AnimatePresence, while-in-view reveals, layout transitions.
- Weaknesses: less ideal for highly choreographed scroll timelines and pinning.
- Bundle/use case: excellent for reusable UI components and page-level transitions.
- Best use here: buttons, nav menu, product hover overlays, form step transitions, text reveals, success/error states.

Lenis:
- Lenis smooths native scrolling with easing and lerp-like interpolation, making wheel movement feel more fluid.
- It does not replace GSAP; it improves scroll feel while GSAP handles scroll-linked animation math.
- Research caveat: current articles in 2026 increasingly reference the `lenis` package rather than the older `@studio-freight/lenis` naming. The requested Phase 1 stack specifies `@studio-freight/lenis`, so this should be checked during setup.

Recommended combination:
- Use Framer Motion for component-level interaction and state-driven animation.
- Use GSAP ScrollTrigger for scroll storytelling, pinning, parallax, and progress-linked animation.
- Use Lenis lightly for smoother scroll feel, with reduced-motion support and careful mobile testing.
- Avoid aggressive scroll hijacking.

New or notable libraries:
- Motion, formerly Framer Motion, is the modern branding/package direction around Framer's animation ecosystem.
- Lenis remains a common smooth-scroll pairing with GSAP.
- Native CSS scroll-driven animations are worth watching, but GSAP is still more practical for complex production choreography today.

### Virtual Threads App Output

Sources reviewed:
- https://www.mrtechking.com/virtual-threads/
- https://sur.ly/i/virtualthreads.io/
- https://www.vniteach.com/2025/02/14/virtualthreads-cong-cu-tao-mockup-3d-cho-quan-ao-mien-phi/
- https://snapwear.net/
- https://video.a2e.ai/image-generator/virtual-try-on
- https://www.segmind.com/models/video-tryon

Virtual Threads appears to be positioned as a free animated 3D t-shirt mockup generator that can create 3D renders, mockups, and animated shirt visuals. Secondary coverage describes image and video download behavior, background customization, animation speed control, realistic fabric textures, and animated folds/movement.

Expected formats:
- Exact export documentation for VirtualThreads was limited in public search results.
- Based on the available coverage and nearby AI/virtual try-on tools, plan for MP4 video, PNG/JPG/WebP still renders, and possibly GIF or image sequences if the tool exposes animation export settings.
- Other virtual try-on tools commonly accept or generate JPG, PNG, WebP, MP4, and MOV inputs/outputs with file limits around 10-20MB. Segmind recommends short MP4s under 50 seconds for video try-on workflows.

Typical resolution and size expectations:
- AI try-on and mockup tools commonly advertise HD to 4K still output.
- For the website, source files can be higher resolution, but delivered assets should be compressed for web.
- Practical targets: MP4/WebM under 5-10MB for homepage loops, 1080p or 720p for mobile-heavy sections, still images exported as WebP/AVIF where possible.

Best practices for storefront display:
- Use short, muted, looping MP4/WebM videos for lookbook moments.
- Provide poster images so the layout is stable before video loads.
- Autoplay only when muted and in viewport.
- Keep videos product-specific: show the actual hoodie/shirt design, not vague fashion atmosphere.
- Include fallback still images for poor networks and reduced-motion users.

Compression recommendations:
- Use H.264 MP4 for compatibility and WebM where possible for smaller file sizes.
- Keep loops short, ideally 4-8 seconds for hero/lookbook clips.
- Compress with ffmpeg using CRF around 28 for a reasonable quality/size balance, then test on mobile.

---

## Suggested Addons

1. **WhatsApp Direct Order Bar**
   - What it does: Persistent mobile-first CTA that opens WhatsApp with a prefilled order message.
   - Why it fits: WhatsApp is central to Kenya/Uganda commerce and reduces friction for custom work.
   - Complexity: Low
   - Build: MVP

2. **Custom Order Wizard**
   - What it does: Guides users through product type, size, design description, reference upload, and contact details.
   - Why it fits: Turns "You Imagine, We Create" into a clear buying flow without needing a full design editor at launch.
   - Complexity: High
   - Build: MVP

3. **M-PESA Ready Payment Notice**
   - What it does: Shows that M-PESA payment is supported or coming soon, with quote confirmation over WhatsApp.
   - Why it fits: It matches local payment behavior and builds trust before full payment integration exists.
   - Complexity: Low
   - Build: MVP

4. **Instagram UGC Strip**
   - What it does: Displays selected posts/reels from @_the_hoodie_guy_1 or manually curated images.
   - Why it fits: Social proof matters heavily for apparel brands discovered through Instagram.
   - Complexity: Medium
   - Build: MVP with manual curation, Phase 2 for API automation

5. **How It Is Made Scroll Story**
   - What it does: A scroll-driven sequence showing idea, mockup, print, finishing, delivery.
   - Why it fits: Makes the custom production process feel premium and transparent.
   - Complexity: Medium
   - Build: MVP

6. **Size Guide With Measurement Helper**
   - What it does: Helps users choose size from chest, length, and sleeve measurements in CM.
   - Why it fits: Reduces WhatsApp back-and-forth and lowers wrong-size anxiety.
   - Complexity: Medium
   - Build: MVP

7. **360 Product Viewer**
   - What it does: Lets users rotate hoodie/shirt mockups or view several angles.
   - Why it fits: Premium product inspection can compensate for remote buying.
   - Complexity: High
   - Build: Phase 2

8. **Drop Notification Waitlist**
   - What it does: Collects emails/WhatsApp numbers for new drops and limited designs.
   - Why it fits: Streetwear thrives on drops, scarcity, and anticipation.
   - Complexity: Medium
   - Build: MVP

9. **Social Proof Ticker**
   - What it does: Shows lightweight proof such as "12 custom orders this week" or "Shipped to Nairobi, Kampala, Mombasa".
   - Why it fits: Builds confidence for first-time buyers without overwhelming the page.
   - Complexity: Low
   - Build: Phase 2 unless real numbers are ready

10. **Animated Logo Reveal**
    - What it does: Brief first-load wordmark/seal animation before revealing the hero.
    - Why it fits: Supports the Web3/editorial energy and makes the brand feel more intentional.
    - Complexity: Medium
    - Build: Phase 2, because MVP speed matters more than intro animation

---

## Architecture Decisions
| Decision | Why | Date |
|----------|-----|------|
| Research-first workflow before application code | The project requires a premium fashion/Web3 direction, and Phase 0 explicitly blocks code until research is documented. | May 25, 2026 |
| Pin scaffold to Next.js 14 and Tailwind CSS v3 | The generated latest scaffold used Next 16/Tailwind 4, but the project brief requires Next 14 and Tailwind 3 for the learning path and later config steps. | May 25, 2026 |
| Use placeholder route/page modules in Phase 1 | Next.js requires valid modules for routes and pages; placeholders keep the architecture buildable until real features are implemented in later phases. | May 25, 2026 |
| Use GitHub Actions plus Netlify config | CI catches lint/type errors before deployment, while Netlify handles production and branch preview builds after the GitHub repo is connected. | May 25, 2026 |
| Use dark editorial surface with blue reserved for interaction | Research showed premium Web3/fashion sites use dark surfaces and precise accent color; this keeps blue meaningful instead of decorative. | May 25, 2026 |
| Prioritize WhatsApp and quote-based custom ordering for MVP | Kenya/Uganda buying behavior and print-on-demand uncertainty make direct WhatsApp confirmation more useful than full checkout on day one. | May 25, 2026 |
| Treat Virtual Threads output as compressed video/still assets, not live 3D in MVP | Public export details are limited, and compressed media is faster, safer, and easier to deploy than a full 3D pipeline. | May 25, 2026 |

---

## Phase Progress
- [x] Phase 0 - Research & Planning
- [x] Phase 1 - Project Setup & Architecture
- [ ] Phase 2 - Design System & Tokens
- [ ] Phase 3 - Navigation & Layout Shell
- [ ] Phase 4 - Hero Section
- [ ] Phase 5 - Product Showcase Section
- [ ] Phase 6 - Video / Lookbook Section
- [ ] Phase 7 - Custom Order Flow
- [ ] Phase 8 - Social Proof & Footer
- [ ] Phase 9 - Animations & Polish Pass
- [ ] Phase 10 - Performance & SEO
- [ ] Phase 11 - Deployment & CI/CD

---

## Bug Log
| Date | Bug Description | Root Cause | Fix Applied | Status |
|------|----------------|------------|-------------|--------|
| May 25, 2026 | No implementation bugs yet | Phase 0 was research/documentation only | Not applicable | Closed |
| May 25, 2026 | Type check failed after downgrading from generated latest scaffold | Stale build cache referenced Next 16 types, and generated Geist font imports were not compatible with Next 14 | Removed the build cache and replaced the temporary font import with Inter until Phase 2 font setup | Closed |
| May 25, 2026 | Lint failed with unsupported next.config.ts and interactive ESLint setup | Generated scaffold used Next 16 config shape and ESLint 9 flat config | Converted to next.config.mjs, aligned ESLint packages to Next 14, and added .eslintrc.json | Closed |
| May 25, 2026 | Production build failed because API route placeholders were empty | Next.js route files must be modules with exports | Added temporary 501 Not Implemented POST handlers | Closed |

---

## Update Log
| Date | Phase | What Changed | Why |
|------|-------|-------------|-----|
| May 25, 2026 | Phase 0 | Completed research across MetaMask, POD storefronts, streetwear e-commerce, animation libraries, and Virtual Threads output assumptions. | Establish design and technical direction before writing application code. |
| May 25, 2026 | Phase 1 | Set up Next.js project architecture, pinned requested dependencies, added env templates, Netlify config, GitHub Actions CI, and valid placeholder routes/pages. | Establish a buildable foundation before design-system and feature work. |







