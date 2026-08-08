export type PricingMode = "monthly" | "sessions";

export type Location = {
  id: string;
  name: string;
  address: string | null;
  contact_name: string | null;
  class_day: string | null;
  active: boolean;
  display_order: number;
  pricing_mode: PricingMode;
  monthly_price_cents: number | null;
  stripe_price_id: string | null;
  full_year_price_cents: number | null;
  full_year_stripe_price_id: string | null;
  created_at: string;
};

export type Session = {
  id: string;
  location_id: string;
  name: string;
  start_date: string;
  end_date: string;
  class_count: number;
  price_cents: number;
  stripe_price_id: string | null;
  display_order: number;
  active: boolean;
  created_at: string;
};

export type ClassGroup = {
  id: string;
  location_id: string;
  label: string;
  age_range: string | null;
  time_range: string | null;
  display_order: number;
  active: boolean;
  created_at: string;
};

export type Enrollment = {
  id: string;
  location_id: string;
  session_id: string | null;
  is_full_year: boolean;
  class_group_id: string | null;
  child_name: string;
  child_dob: string;
  child_address: string | null;
  child_city: string | null;
  child_state: string | null;
  child_zip: string | null;
  notes: string | null;
  parent_name: string;
  parent_email: string;
  parent_phone: string | null;
  parent2_name: string | null;
  parent2_phone: string | null;
  emergency1_name: string;
  emergency1_phone: string;
  emergency2_name: string | null;
  emergency2_phone: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  status: "pending" | "active" | "canceled" | "past_due";
  created_at: string;
};

export type InquiryType = "contact" | "birthday";

export type Inquiry = {
  id: string;
  type: InquiryType;
  name: string;
  email: string;
  phone: string | null;
  event_date: string | null;
  message: string | null;
  created_at: string;
};
