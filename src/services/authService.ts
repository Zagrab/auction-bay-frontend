import { api } from './api';

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInResponse {
  access_token: string;
}

export interface SignUpPayload {
  firstName: string;
  lastName:  string;
  email:     string;
  password:  string;
}

export interface SignUpResponse {
  access_token: string;
}

export function signIn(payload: SignInPayload) {
  return api
    .post<SignInResponse>('/auth/signin/', payload)
    .then((res) => res.data.access_token);
}

export function signUp(payload: SignUpPayload) {
  return api
    .post<SignUpResponse>('/auth/signup/', payload)
    .then(res => res.data.access_token);
}

export const updateUser = async (payload: {
  firstName: string
  lastName: string
  email: string
}): Promise<void> => {
  await api.patch('/auth/me/update-user', payload)
}

export const updatePassword = async (payload: {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}): Promise<void> => {
  await api.post('/auth/me/update-password', payload)
}

export const forgotPassword = async (email: string): Promise<void> => {
  await api.post('/auth/forgot-password', { email })
}

export const resetPassword = async (payload: {
  token: string
  newPassword: string
  confirmPassword: string
}): Promise<void> => {
  await api.post('/auth/reset-password', payload)
}
