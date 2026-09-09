// Google Analytics 4 measurement ID.
//
// Hardcoded on purpose rather than read from the environment, so the tag
// works identically in every deployment without configuration. The tag is
// injected in app/layout.tsx.
//
// Note this is a real tracker: GA4 sets first-party cookies (_ga and
// _ga_<stream>) and sends data to Google. That is a different privacy
// posture from the cookie-less Vercel Analytics the site also runs, and both
// are described in lib/legal.ts (Privacy, Analytics). Keep that page in step
// with anything changed here.
export const GA_MEASUREMENT_ID = "G-K05HX7EKRP";
