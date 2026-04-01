export interface ApiResponseType {
  success: boolean;
  message: string;
  errors: string[];
  token: string;
  status: number;
}

export interface ApiResponseTypeG<T> extends ApiResponseType {
  data?: T;
}

// ======== Usuario que espera NextAuth =======
export type UserNextAuth = {
  id: string;
  username: string;
  role: string;
  accessToken: string;
};
// ============================================
