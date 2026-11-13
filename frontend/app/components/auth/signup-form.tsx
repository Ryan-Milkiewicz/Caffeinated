"use client";

import { useState, useActionState } from "react";
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

import { SignupUser } from "@/lib/auth/action";

type AccountType = "consumer" | "business";
type BusinessType = "Cafe" | "Roaster";

export function SignupForm() {
  const [accountType, setAccountType] = useState<AccountType>("consumer");
  const [businessType, setBusinessType] = useState<BusinessType>("Cafe");
  const [state, action, pending] = useActionState(SignupUser, null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>Join the Caffeinated community.</CardDescription>
      </CardHeader>

      <CardContent>
        <form action={action} className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel>Account type</FieldLabel>

              <div className="grid grid-cols-2 rounded-xl border border-border bg-muted p-1">
                {(
                  [
                    { value: "consumer", label: "Coffee enthusiast" },
                    { value: "business", label: "Cafe / Roaster" },
                  ] as const
                ).map((opt) => (
                  <label
                    key={opt.value}
                    className={`cursor-pointer rounded-lg px-3 py-2 text-center text-sm font-medium transition ${
                      accountType === opt.value
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <input
                      type="radio"
                      name="accountType"
                      value={opt.value}
                      checked={accountType === opt.value}
                      onChange={() => setAccountType(opt.value)}
                      className="sr-only"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </Field>

            <Field>
              <FieldLabel htmlFor="displayName">Display Name</FieldLabel>
              <Input
                id="displayName"
                name="displayName"
                type="text"
                defaultValue={state?.values?.displayName}
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
                defaultValue={state?.values?.email}
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
                type="text"
                defaultValue={state?.values?.location}
                placeholder="Location (Optional)"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="gender">Gender</FieldLabel>

              <Select name="gender">
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
                  defaultValue={state?.values?.businessType}
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

            {state?.message && (
              <p
                className={
                  state.success
                    ? "text-sm text-green-600"
                    : "text-sm text-destructive"
                }
              >
                {state.message}
              </p>
            )}
            <Field>
              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? "Creating account..." : "Create account"}
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
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
