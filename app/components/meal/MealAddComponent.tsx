'use client';

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input'; // Replace with your shadCN Input path
import { Button } from '@/components/ui/button'; // Replace with your shadCN Button path
import { Label } from '@/components/ui/label'; // Replace with your shadCN Label path

// Zod schema for validation
const messMemberSchema = z.object({
  members: z.array(
    z.object({
      name: z.string().min(1, 'Name is required'),
      mealCount: z.number().min(0, 'Meal count must be at least 0'),
      date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date'),
    })
  ),
});

// TypeScript type from Zod schema
type MessMemberFormValues = z.infer<typeof messMemberSchema>;

// Props definition
interface MessMemberFormProps {
  allMember: { id: string; name: string }[]; // Adjust the type to fit your `allMember` structure
}

const MessMemberForm: React.FC<MessMemberFormProps> = ({ allMember }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MessMemberFormValues>({
    resolver: zodResolver(messMemberSchema),
    defaultValues: {
      members: allMember.map((member) => ({
        name: member.name,
        mealCount: 0,
        date: new Date().toISOString().slice(0, 10), // Default to today's date
      })),
    },
  });

  const { fields } = useFieldArray({
    control,
    name: 'members',
  });

  const onSubmit = async (data: MessMemberFormValues) => {
    try {
      const response = await fetch('/api/messMember', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ members: data.members }), // Send members array
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert(`Failed to add members: ${errorData.message || 'Unknown error'}`);
        return;
      }
  
      const responseData = await response.json();
      console.log('Submitted Data:', responseData);
      alert('Members added successfully!');
  
      // Optional: Reset the form or perform other actions
    } catch (error) {
      console.error('Submission failed:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h1 className="text-xl font-semibold">Meal Info Add</h1>

      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center space-x-4">
          {/* Name */}
          <div className="flex flex-col">
            <Label htmlFor={`members.${index}.name`}>Name</Label>
            <Input
              id={`members.${index}.name`}
              readOnly={true}
              value={field.name} // Display the name
              className="bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Meal Count */}
          <div className="flex flex-col">
            <Label htmlFor={`members.${index}.mealCount`}>Meal Count</Label>
            <Input
              id={`members.${index}.mealCount`}
              type="number"
              {...register(`members.${index}.mealCount`, { valueAsNumber: true })}
              className={errors.members?.[index]?.mealCount ? 'border-red-500' : ''}
            />
            {errors.members?.[index]?.mealCount && (
              <p className="text-red-500 text-sm">
                {errors.members[index].mealCount?.message}
              </p>
            )}
          </div>

          {/* Date */}
          <div className="flex flex-col">
            <Label htmlFor={`members.${index}.date`}>Date</Label>
            <Input
              id={`members.${index}.date`}
              type="date"
              {...register(`members.${index}.date`)}
              className={errors.members?.[index]?.date ? 'border-red-500' : ''}
            />
            {errors.members?.[index]?.date && (
              <p className="text-red-500 text-sm">{errors.members[index].date?.message}</p>
            )}
          </div>
        </div>
      ))}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
};

export default MessMemberForm;
