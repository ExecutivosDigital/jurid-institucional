export const analyticsConfig = {
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  linkedinPartnerId: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID,
  tiktokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID,
} as const;

export type AnalyticsConfig = typeof analyticsConfig;
