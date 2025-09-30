"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

const emailSchema = z.object({
  email: z
    .string()
    .optional()
    .refine((val) => !val || z.string().email().safeParse(val).success, {
      message: "Enter a valid email address",
    }),
});

type EmailFormValues = z.infer<typeof emailSchema>;

type EmailFormProps = {
  onSubmit: (email: string) => Promise<void> | void;
  placeholder?: string;
  buttonText?: string;
  className?: string;
};

export default function EmailForm({
  onSubmit,
  placeholder = "Your email address",
  buttonText = "Subscribe now",
  className = "",
}: EmailFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
    mode: "onChange",
  });

  const [submitted, setSubmitted] = useState(false);

  async function onValid(values: EmailFormValues) {
    setSubmitted(false);
    if (values.email) {
      await onSubmit(values.email);
    }
    reset();
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit(onValid)} className={className} noValidate>
      <div className="flex w-full items-stretch rounded-full border border-[var(--header-border)] bg-white p-1 shadow-sm">
        <input
          type="email"
          aria-label="Email address"
          placeholder={placeholder}
          {...register("email")}
          className="flex-1 rounded-full px-4 py-3 text-sm outline-none placeholder:text-gray-400"
          disabled={isSubmitting}
        />
        <Button
          type="submit"
          className="rounded-full bg-black px-5 py-2 text-white hover:bg-gray-800"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : buttonText}
        </Button>
      </div>

      <div className="mt-2 min-h-[1.25rem]">
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
        {!errors.email && submitted && (
          <p className="text-sm text-green-600">Subscribed! Check your inbox.</p>
        )}
      </div>
    </form>
  );
}


