import { api } from './api';

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInResponse {
  access_token: string;
}

export function signIn(payload: SignInPayload) {
  return api
    .post<SignInResponse>('/auth/signin/', payload)
    .then((res) => res.data.access_token);
}
