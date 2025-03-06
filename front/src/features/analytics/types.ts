export interface AnalyticsTypes {
  status: string;
  data: AnalyticsTypesData;
}

export interface AnalyticsTypesData {
  company_id: string;
  taxi: number;
  chat: number;
  route: number;
  call: number;
  share: number;
  applications: number;
  social_media: number;
  website: number;
  working_hours: number;
  web_app: number;
  menu: number;
  updated_at: string;
}
