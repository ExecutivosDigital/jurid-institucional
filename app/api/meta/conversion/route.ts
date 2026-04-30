import { NextRequest, NextResponse } from "next/server";
import {
  hashUserData,
  normalizePhone,
  getFbp,
  getFbc,
} from "lib/meta-capi";
import type { MetaConversionEvent, ClientLeadData } from "types/meta";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const TEST_EVENT_CODE = process.env.META_CAPI_TEST_EVENT_CODE;
const API_VERSION = process.env.META_CAPI_API_VERSION || "v21.0";

export async function POST(request: NextRequest) {
  // Sem Pixel ID ou Access Token a CAPI não roda. Respondemos 200 para não
  // quebrar o fluxo do cliente — o Pixel continua disparando normalmente.
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return NextResponse.json(
      {
        success: false,
        skipped: true,
        reason: "META_CAPI_ACCESS_TOKEN ou NEXT_PUBLIC_META_PIXEL_ID ausente",
      },
      { status: 200 },
    );
  }

  try {
    const body: ClientLeadData = await request.json();

    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      undefined;

    const userAgent = request.headers.get("user-agent") || undefined;
    const cookies = request.headers.get("cookie");
    const fbp = getFbp(cookies);
    const fbc = getFbc(cookies);
    const referer = request.headers.get("referer") || undefined;

    const event: MetaConversionEvent = {
      event_name: body.eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: body.eventId,
      event_source_url: referer,
      action_source: "website",
      user_data: {
        em: hashUserData(body.email),
        ph: hashUserData(normalizePhone(body.phone)),
        fn: hashUserData(body.firstName),
        ln: hashUserData(body.lastName),
        ct: hashUserData(body.city),
        st: hashUserData(body.state),
        country: hashUserData("br"),
        fbp,
        fbc,
        client_ip_address: clientIp ?? undefined,
        client_user_agent: userAgent,
      },
      custom_data: {
        value: body.value,
        currency: body.currency || "BRL",
        content_name: body.contentName,
        content_category: body.contentCategory,
      },
    };

    event.user_data = Object.fromEntries(
      Object.entries(event.user_data).filter(([, v]) => v !== undefined),
    ) as MetaConversionEvent["user_data"];

    if (event.custom_data) {
      event.custom_data = Object.fromEntries(
        Object.entries(event.custom_data).filter(([, v]) => v !== undefined),
      );
    }

    const payload: {
      data: MetaConversionEvent[];
      access_token: string;
      test_event_code?: string;
    } = {
      data: [event],
      access_token: ACCESS_TOKEN,
    };

    if (TEST_EVENT_CODE && process.env.NODE_ENV !== "production") {
      payload.test_event_code = TEST_EVENT_CODE;
    }

    const endpoint = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`;
    const metaResponse = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const metaData = await metaResponse.json();

    if (!metaResponse.ok) {
      console.error("[Meta CAPI] Erro:", metaData);
      return NextResponse.json(
        { success: false, error: metaData },
        { status: metaResponse.status },
      );
    }

    return NextResponse.json({ success: true, meta: metaData });
  } catch (error) {
    console.error("[Meta CAPI] Falha inesperada:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
