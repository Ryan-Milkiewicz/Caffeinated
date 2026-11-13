"use server";
import { redirect } from "next/navigation";

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

  // Check if user is a business or consumer and redirect accordingly
  if (result.businesses?.length > 0) {
    redirect("/dashboard");
  }

  redirect("/feed");
}
