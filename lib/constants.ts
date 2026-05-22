export const SITE_NAME = "Angolo Della Pizza";
export const SITE_NAME_DE = "Angolo Della Pizza";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const RESTAURANT_PHONE = "00491777215318";
export const RESTAURANT_WHATSAPP = "https://wa.me/491777215318";
export const RESTAURANT_LOCATION_URL =
  "https://maps.google.com/?q=Burgkunstadt+Lichtenfelser+Str+49";
export const RESTAURANT_ADDRESS = {
  ar: "Burgkunstadt Lichtenfelser Str 49",
  de: "Burgkunstadt Lichtenfelser Str 49",
};
export const RESTAURANT_FACEBOOK = "https://facebook.com";
export const RESTAURANT_VIDEO = "https://www.youtube.com";
export const RESTAURANT_BG =
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&h=2000&fit=crop&q=80";

export const EASING = [0.6, 0.05, 0.01, 0.9] as const;

export const ADMIN_COOKIE = "admin_session";
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  linkedin: "https://linkedin.com",
  youtube: "https://youtube.com",
} as const;
