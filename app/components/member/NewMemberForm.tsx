// app/members/NewMemberForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
// import { Input, Button, Label, Textarea } from '@/components/ui';
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MemberFormValues, memberSchema } from "@/lib/schema/NewMemberReg";
import { apiCall } from "@/lib/apiClient";

export default function NewMemberForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
  });

  const onSubmit = async (data: MemberFormValues) => {
    setLoading(true);

    try {
      await apiCall("/member", "POST", data); // Call the API function
      reset(); // Clear the form
      router.refresh();
      router.push("/home"); // Redirect to the home page
    } catch (err: any) {
      console.error(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 bg-white shadow rounded-md max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold text-center">New Member Info</h2>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" {...register("name")} />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input id="phoneNumber" type="text" {...register("phoneNumber")} />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="fbAccount">Facebook Account (optional)</Label>
        <Input id="fbAccount" type="text" {...register("fbAccount")} />
        {errors.fbAccount && (
          <p className="text-red-500 text-sm">{errors.fbAccount.message}</p>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="nidNumber">NID Number</Label>
        <Input id="nidNumber" type="text" {...register("nidNumber")} />
        {errors.nidNumber && (
          <p className="text-red-500 text-sm">{errors.nidNumber.message}</p>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="permanentAddress">Permanent Address</Label>
        <Textarea id="permanentAddress" {...register("permanentAddress")} />
        {errors.permanentAddress && (
          <p className="text-red-500 text-sm">
            {errors.permanentAddress.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Add Member Info"}
      </Button>
    </form>
  );
}
