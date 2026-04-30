export type MetaEventName =
  | "PageView"
  | "ViewContent"
  | "Lead"
  | "Contact"
  | "CompleteRegistration"
  | "Subscribe"
  | "StartTrial"
  | "Schedule"
  | "Purchase";

export interface MetaUserData {
  em?: string;
  ph?: string;
  fn?: string;
  ln?: string;
  ct?: string;
  st?: string;
  zp?: string;
  country?: string;
  external_id?: string;
  // Os campos abaixo NÃO são hasheados.
  fbp?: string;
  fbc?: string;
  client_ip_address?: string;
  client_user_agent?: string;
}

export interface MetaCustomData {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  [key: string]: unknown;
}

export interface MetaConversionEvent {
  event_name: MetaEventName;
  event_time: number; // Unix timestamp em SEGUNDOS (nunca ms).
  event_id: string; // STRING, nunca número.
  event_source_url?: string;
  action_source:
    | "website"
    | "app"
    | "phone_call"
    | "chat"
    | "email"
    | "physical_store"
    | "system_generated"
    | "other";
  user_data: MetaUserData;
  custom_data?: MetaCustomData;
}

export interface ClientLeadData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  eventName: MetaEventName;
  eventId: string;
  value?: number;
  currency?: string;
  contentName?: string;
  contentCategory?: string;
}
