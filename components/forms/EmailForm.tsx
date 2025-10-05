"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CtaPillButton } from "../ui/cta-pill-button";

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
      <div className="flex w-full items-center rounded-full border border-[#e9e9e9] bg-white p-1.5 pr-2 shadow-[0_0_0_1px_rgba(0,0,0,0.04)]">
        <input
          type="email"
          aria-label="Email address"
          placeholder={placeholder}
          {...register("email")}
          className="flex-1 rounded-full px-6 py-3 text-base outline-none placeholder:text-gray-500"
          disabled={isSubmitting}
        />
        <CtaPillButton
          type="submit"
          className="px-7 py-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : buttonText}
        </CtaPillButton>
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


