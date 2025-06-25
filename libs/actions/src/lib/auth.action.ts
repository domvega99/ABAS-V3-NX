"use server";

import { API } from '@abasv3/shared-lib';
import { cookies } from 'next/headers';

export async function loginAction(formData: FormData): Promise<{
  token?: string;
  error: string | null;
}> {
  const cookieStore = await cookies()
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {

    const response = await API.post(
      "/auth-login",
      { username, password },
    );

    const { token } = response.data;

    cookieStore.set({
      name: 'Access-Token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'strict',
    })

    return { token, error: null };

  } catch (error: any) {
    console.error("Login error:", error.response);
    return { error: "Login failed. Please try again." };
  }
}
