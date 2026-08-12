export interface UserProfile {
    id: number;
    full_name: string;
    phone: string;
    email: string | null;
    address: string;
    img_url: string;
    role: string;
    created_at: string;
}

export interface UpdateProfilePayload {
  full_name: string;
  address: string;
  phone: string;
  email: string;
  img_url?: string;
  password?: string;
  password_repeat?: string;
}