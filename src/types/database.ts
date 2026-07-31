export type Location = {
  id: string;
  name: string;
  address: string | null;
  contact_name: string | null;
  class_day: string | null;
  active: boolean;
  display_order: number;
  monthly_price_cents: number;
  stripe_price_id: string | null;
  created_at: string;
};

export type Enrollment = {
  id: string;
  location_id: string;
  child_name: string;
  child_dob: string;
  notes: string | null;
  parent_name: string;
  parent_email: string;
  parent_phone: string | null;
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
