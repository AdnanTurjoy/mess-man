// app/members/NewMemberForm.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// import { Input, Button, Label, Textarea } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const memberSchema = z.object({
  name: z.string().nonempty('Name is required'),
  phoneNumber: z.string().nonempty('Phone Number is required'),
  fbAccount: z.string().optional(),
  nidNumber: z.string().nonempty('NID Number is required'),
  permanentAddress: z.string().nonempty('Permanent Address is required'),
});

type MemberFormValues = z.infer<typeof memberSchema>;

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
      const res = await fetch('/api/member', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create member');
      }

      alert('Member created successfully!');
      reset(); // Clear the form
      router.refresh(); // Refresh the page to reflect the new data
    } catch (err: any) {
      console.error(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          {...register('name')}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          type="text"
          {...register('phoneNumber')}
        />
        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="fbAccount">Facebook Account (optional)</Label>
        <Input
          id="fbAccount"
          type="text"
          {...register('fbAccount')}
        />
        {errors.fbAccount && <p className="text-red-500 text-sm">{errors.fbAccount.message}</p>}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="nidNumber">NID Number</Label>
        <Input
          id="nidNumber"
          type="text"
          {...register('nidNumber')}
        />
        {errors.nidNumber && <p className="text-red-500 text-sm">{errors.nidNumber.message}</p>}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="permanentAddress">Permanent Address</Label>
        <Textarea
          id="permanentAddress"
          {...register('permanentAddress')}
        />
        {errors.permanentAddress && <p className="text-red-500 text-sm">{errors.permanentAddress.message}</p>}
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Add Member'}
      </Button>
    </form>
  );
}
