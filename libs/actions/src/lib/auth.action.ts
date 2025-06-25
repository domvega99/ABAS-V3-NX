"use server"

import axios from "axios"
import { cookies } from "next/headers"

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  // Basic validation
  if (!username || !password) {
    return {
      error: "Username and password are required",
    }
  }

  try {
    // Make API call to login endpoint
    const response = await axios.post(
      "https://api.avegabros.org/api/auth-login",
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    console.log("Login response:", response)

    // If login successful, handle the response
    const { token } = response.data

      // Set authentication cookie
      const cookieStore = await cookies()
      cookieStore.set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      // Redirect to dashboard or home page
      return { success: true, redirectUrl: "/" }
  } catch (error) {
    // Handle different types of errors
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return {
          error: "Invalid email or password",
        }
      } else if (error.response?.status === 429) {
        return {
          error: "Too many login attempts. Please try again later.",
        }
      } else {
        return {
          error: "Login failed. Please try again.",
        }
      }
    }

    return {
      error: "An unexpected error occurred",
    }
  }
}
