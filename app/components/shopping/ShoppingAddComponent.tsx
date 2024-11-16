'use client'

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast"; // Optional: for better error messages

interface ShoppingFormProps {
  memberList: Array<{
    id: string;
    name: string;
  }>;
}

const shoppingFormSchema = z.object({
  date: z.string().min(1, "Date is required"),
  cost: z.string()
    .min(1, "Cost is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Cost must be a positive number"
    ),
  shoppingDetails: z.string().optional(),
  memberName: z.string().min(1, "Member name is required"),
});

type ShoppingFormValues = z.infer<typeof shoppingFormSchema>

export function ShoppingForm({ memberList }: ShoppingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast(); // Optional: for better error messages

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    setError
  } = useForm<ShoppingFormValues>({
    resolver: zodResolver(shoppingFormSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      shoppingDetails: '',
    }
  });

  // Check date availability before submitting
  const checkDateAvailability = async (date: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/shopping?date=${date}`);
      const data = await response.json();
      return data.isAvailable;
    } catch (error) {
      console.error('Error checking date availability:', error);
      return false;
    }
  };

  const onSubmit = async (data: ShoppingFormValues) => {
    try {
      setIsSubmitting(true);

      // Check date availability first
      const isDateAvailable = await checkDateAvailability(data.date);
      if (!isDateAvailable) {
        setError('date', {
          type: 'manual',
          message: 'A shopping entry already exists for this date'
        });
        toast({
          variant: "destructive",
          title: "Error",
          description: "A shopping entry already exists for this date."
        });
        return;
      }

      const formattedData = {
        ...data,
        cost: Number(data.cost),
        date: new Date(data.date)
      };

      const response = await fetch('/api/shopping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit shopping entry');
      }

      toast({
        title: "Success",
        description: "Shopping entry submitted successfully"
      });
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to submit shopping entry'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMemberSelect = (value: string) => {
    setValue('memberName', value, {
      shouldValidate: true
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-4xl p-6">
      {/* First Row - Date and Cost */}
      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            {...register('date')}
          />
          {errors.date && (
            <p className="text-sm text-red-500">{errors.date.message}</p>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <Label htmlFor="cost">Cost</Label>
          <Input
            id="cost"
            type="number"
            step="0.01"
            placeholder="Enter cost"
            {...register('cost')}
          />
          {errors.cost && (
            <p className="text-sm text-red-500">{errors.cost.message}</p>
          )}
        </div>
      </div>

      {/* Second Row - Shopping Details */}
      <div className="space-y-2">
        <Label htmlFor="shoppingDetails">Shopping Details (Optional)</Label>
        <Textarea
          id="shoppingDetails"
          placeholder="Enter shopping details"
          className="min-h-[50px] resize-vertical"
          {...register('shoppingDetails')}
        />
        {errors.shoppingDetails && (
          <p className="text-sm text-red-500">{errors.shoppingDetails.message}</p>
        )}
      </div>

      {/* Third Row - Member Name Select */}
      <div className="space-y-2">
        <Label htmlFor="memberName">Member Name</Label>
        <Select 
          onValueChange={handleMemberSelect}
          defaultValue={watch('memberName')}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a member" />
          </SelectTrigger>
          <SelectContent>
            {memberList.map((member) => (
              <SelectItem 
                key={member.id} 
                value={member.name}
              >
                {member.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.memberName && (
          <p className="text-sm text-red-500">{errors.memberName.message}</p>
        )}
      </div>

      {/* Fourth Row - Buttons */}
      <div className="flex gap-4 pt-4">
        <Button 
          type="submit" 
          className="flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => reset()} 
          className="flex-1"
          disabled={isSubmitting}
        >
          Reset
        </Button>
      </div>
    </form>
  );
}

export default ShoppingForm;