"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SetCookieParser from "set-cookie-parser";

type SignupState = {
  success: boolean;
  message: string;
  values?: {
    displayName?: string;
    email?: string;
    location?: string;
    accountType?: string;
    businessType?: string;
    gender?: string;
  };
} | null;

type LoginState = {
  success: boolean;
  message: string;
} | null;

export async function SignupUser(
  prevState: SignupState,
  formData: FormData,
): Promise<SignupState> {
  // Get the form values from the FormData object
  const displayName = formData.get("displayName")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();
  const location = formData.get("location")?.toString().trim();
  const accountType = formData.get("accountType")?.toString();
  const businessType = formData.get("businessType")?.toString();
  const gender = formData.get("gender")?.toString();

  // Never send passwords back if there are any errors with with form
  const values = {
    displayName,
    email,
    location,
    accountType,
    businessType,
    gender,
  };

  // check that the passwords match
  if (password !== confirmPassword) {
    return {
      success: false,
      message: "Passwords do not match.",
      values,
    };
  }

  // Create the form registration object to send to the api
  const registrationData = {
    displayName,
    email,
    password,
    location: location || null,
    //accountType,
    //businessType: accountType === "business" ? businessType : null,
    //gender: gender || null,
  };

  // Create the request to the api to register the user
  let res: Response;
  try {
    res = await fetch(`${process.env.API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registrationData),
    });
  } catch (error) {
    console.error("Signup fetch failed:", error);
    return {
      success: false,
      message: "Could not reach the server. Please try again.",
      values,
    };
  }

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    return {
      success: false,
      message: body?.title ?? body?.message ?? "Registration failed.",
      values,
    };
  }

  redirect("/login");
}

export async function LoginUser(
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  // Get the form values from the FormData object
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  // Create the form registration object to send to the api
  const loginData = {
    email,
    password,
  };

  // Create the request to the api to login the user
  const response = await fetch(`${process.env.API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: result.message ?? "Invalid email or password.",
    };
  }

  // Froward the cookie to the browser
  const setCookieHeaders = response.headers.getSetCookie();
  const parsedCookies = SetCookieParser.parse(setCookieHeaders);
  const cookieStore = await cookies();

  for (const cookie of parsedCookies) {
    cookieStore.set({
      name: cookie.name,
      value: cookie.value,
      httpOnly: cookie.httpOnly,
      //secure: cookie.secure,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: cookie.path,
      expires: cookie.expires,
      maxAge: cookie.maxAge,
    });
  }

  // Check if user is a business or consumer and redirect accordingly
  if (result.roles?.includes("Business")) {
    redirect("/dashboard");
  }

  redirect("/feed");
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();

    const response = await fetch(`${process.env.API_URL}/api/auth/me`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch {
    return null;
  }
}

export async function LogoutUser() {
  const cookieStore = await cookies();

  try {
    await fetch(`${process.env.API_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });
  } finally {
    // Clear the authentication cookie in the browser
    cookieStore.delete(".AspNetCore.Identity.Application");
  }

  redirect("/login");
}
