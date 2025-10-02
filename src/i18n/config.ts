export type Locale = (typeof locales)[number];

export const locales = ["en", "pt", "es"] as const;
export const defaultLocale: Locale = "en";

export const COOKIE_NAME = "NEXT_LOCALE";

const nextConfig = {
  images: {
    domains: ["img.clerk.com"],
  },
};

export default nextConfig;
