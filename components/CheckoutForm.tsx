"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(10, "Phone number is required"),
  country: z.string().min(1, "Please select a country"),
  city: z.string().min(2, "City is required"),
  address: z.string().min(5, "Street address is required"),
  zipCode: z.string().min(3, "ZIP code is required"),
  additionalInfo: z.string().optional(),
  createAccount: z.boolean().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  onSubmit?: (values: CheckoutFormValues) => Promise<void> | void;
  className?: string;
}

export default function CheckoutForm({ onSubmit, className = "" }: CheckoutFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      address: "",
      zipCode: "",
      additionalInfo: "",
      createAccount: false,
    },
    mode: "onChange",
  });

  async function onValid(values: CheckoutFormValues) {
    try {
      if (onSubmit) await onSubmit(values);
      else console.log("checkout form: ", values);
      reset();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onValid)} className={className} noValidate>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900" style={{fontFamily: 'var(--header-font-family)'}}>
          Billing Details
        </h2>

        {/* Login/Coupon Links */}
        <div className="space-y-2">
          <a href="#" className="text-sm text-blue-600 hover:text-blue-800 underline">
            Returning customer? Click here to login
          </a>
          <br />
          <a 
            href="#coupon-section" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('coupon-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Have a coupon? Click here to enter your code
          </a>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-normal text-gray-700 mb-2">
              First name <span className="text-red-500 text-xs align-super">*</span>
            </label>
            <input
              type="text"
              {...register("firstName")}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
              disabled={isSubmitting}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-normal text-gray-700 mb-2">
              Last name <span className="text-red-500 text-xs align-super">*</span>
            </label>
            <input
              type="text"
              {...register("lastName")}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
              disabled={isSubmitting}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-normal text-gray-700 mb-2">
              Email address <span className="text-red-500 text-xs align-super">*</span>
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-normal text-gray-700 mb-2">
              Phone <span className="text-red-500 text-xs align-super">*</span>
            </label>
            <input
              type="tel"
              {...register("phone")}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-normal text-gray-700 mb-2">
            Country/Region <span className="text-red-500 text-xs align-super">*</span>
          </label>
          <select
            {...register("country")}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
            disabled={isSubmitting}
          >
            <option value="">Select a country</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
          </select>
          {errors.country && (
            <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
          )}
        </div>

        {/* City and Address */}
        <div>
          <label className="block text-sm font-normal text-gray-700 mb-2">
            Town / City <span className="text-red-500 text-xs align-super">*</span>
          </label>
          <input
            type="text"
            {...register("city")}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
            disabled={isSubmitting}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-normal text-gray-700 mb-2">
            Street address <span className="text-red-500 text-xs align-super">*</span>
          </label>
          <input
            type="text"
            {...register("address")}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
            disabled={isSubmitting}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-normal text-gray-700 mb-2">
            ZIP Code <span className="text-red-500 text-xs align-super">*</span>
          </label>
          <input
            type="text"
            {...register("zipCode")}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
            disabled={isSubmitting}
          />
          {errors.zipCode && (
            <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
          )}
        </div>

        {/* Additional Information */}
        <div>
          <label className="block text-sm font-normal text-gray-700 mb-2">
            Additional information (optional)
          </label>
          <textarea
            {...register("additionalInfo")}
            rows={4}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
            disabled={isSubmitting}
          />
          {errors.additionalInfo && (
            <p className="mt-1 text-sm text-red-600">{errors.additionalInfo.message}</p>
          )}
        </div>

        {/* Create Account Checkbox */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            {...register("createAccount")}
            className="rounded border-gray-300 text-black focus:ring-gray-400 h-4 w-4"
            disabled={isSubmitting}
          />
          <label className="text-sm font-normal text-gray-700">
            Create an account?
          </label>
        </div>
      </div>
    </form>
  );
}
