"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AccountType = "consumer" | "business";
type BusinessType = "Cafe" | "Roaster";

export function SignupForm() {
  const [accountType, setAccountType] = useState<AccountType>("consumer");
  const [businessType, setBusinessType] = useState<BusinessType>("Cafe");
  const [gender, setGender] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);

    const displayName = formData.get("displayName")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirmPassword")?.toString();
    const location = formData.get("location")?.toString().trim();

    // check that passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const registrationData = {
      accountType,
      businessType,
      displayName,
      email,
      password,
      location,
      gender: gender || null,
    };

    console.log("Registration data:", registrationData);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Account created successfully!");
    }, 2000);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>Join the Caffeinated community.</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel>Account type</FieldLabel>

              <div className="grid grid-cols-2 rounded-xl border border-border bg-muted p-1">
                <button
                  type="button"
                  onClick={() => setAccountType("consumer")}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    accountType === "consumer"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Coffee enthusiast
                </button>

                <button
                  type="button"
                  onClick={() => setAccountType("business")}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    accountType === "business"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Cafe / Roaster
                </button>
              </div>
            </Field>

            <Field>
              <FieldLabel htmlFor="displayName">Display Name</FieldLabel>
              <Input
                id="displayName"
                name="displayName"
                placeholder="Jane Smith"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email address</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="At least 8 characters"
                autoComplete="new-password"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirm password
              </FieldLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Enter your password again"
                autoComplete="new-password"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <Input
                id="location"
                name="location"
                placeholder="Location (Optional)"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="gender">Gender</FieldLabel>

              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger id="gender" className="w-full">
                  <SelectValue placeholder="Select a gender" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Gender</SelectLabel>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="prefer-not-to-say">
                      Prefer not to say
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            {/* Business-specific fields */}
            {accountType === "business" && (
              <Field>
                <FieldLabel htmlFor="businessType">Business type</FieldLabel>

                <select
                  id="businessType"
                  name="businessType"
                  value={businessType}
                  onChange={(event) =>
                    setBusinessType(event.target.value as BusinessType)
                  }
                  className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  <option value="Cafe">Cafe</option>
                  <option value="Roaster">Coffee roaster</option>
                </select>
              </Field>
            )}

            <Field>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creating account..." : "Create account"}
              </Button>

              <FieldDescription className="text-center">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-primary hover:underline"
                >
                  Log in
                </Link>
              </FieldDescription>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
