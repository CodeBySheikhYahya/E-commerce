"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email address"),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

type ContactFormProps = {
  onSubmit?: (values: ContactFormValues) => Promise<void> | void;
  className?: string;
};

export default function ContactForm({ onSubmit, className = "" }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
    mode: "onChange",
  });

  async function onValid(values: ContactFormValues) {
    try {
      if (onSubmit) await onSubmit(values);
      else console.log("contact: ", values);
      reset();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onValid)} className={className} noValidate>
      <div className="space-y-4">
        <h2 className="section-heading mb-4">Contact Us</h2>

        {/* Name & Email - side by side on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              aria-label="Name"
              {...register("name")}
              className="w-full rounded-lg border border-gray-500 bg-white px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              aria-label="Email"
              {...register("email")}
              className="w-full rounded-lg border border-gray-500 bg-white px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Message - optional */}
        <div>
          <label className="block text-sm mb-1">Message</label>
          <textarea
            aria-label="Message"
            rows={6}
            {...register("message")}
            className="w-full rounded-lg border border-gray-500 bg-white px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            disabled={isSubmitting}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="rounded-full bg-black px-6 py-2 text-white hover:bg-gray-800 w-max"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}


