'use client';

import React, { useEffect, useState } from 'react';

interface MessMember {
  _id: string;
  name: string;
  mealCount: number;
  date: string;
}

const MealInfoTable: React.FC = ({ memberList }: any) => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [members, setMembers] = useState<MessMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch members for the current month on load
  useEffect(() => {
    fetchMembers(year, month);
  }, []);

  // Fetch members grouped by date
  const fetchMembers = async (year: number, month: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/messMember/getByMonth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year, month }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch members.');
      }

      const data = await response.json();
      setMembers(data.data);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // Group members by date
  const groupedByDate = members.reduce((acc: Record<string, MessMember[]>, member) => {
    const date = new Date(member.date).toLocaleDateString(); // Format date
    if (!acc[date]) acc[date] = [];
    acc[date].push(member);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Meal Information for {year}-{month.toString().padStart(2, '0')}</h1>

      {/* Month & Year Selector */}
      <div className="flex space-x-2">
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          placeholder="Year"
          className="border rounded p-1 text-sm"
        />
        <input
          type="number"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          placeholder="Month"
          className="border rounded p-1 text-sm"
        />
        <button
          onClick={() => fetchMembers(year, month)}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
        >
          Meal Search
        </button>
      </div>

      {/* Loading & Error */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Table */}
      <div className="overflow-x-auto max-w-screen-sm">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-1">Date</th>
              <th className="border p-1">Names</th>
              <th className="border p-1">Meals</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedByDate).map(([date, members]) => (
              <tr key={date}>
                <td className="border p-1">{date}</td>
                <td className="border p-1">
                  {members.map((member) => (
                    <p key={member._id}>{member.name}</p>
                  ))}
                </td>
                <td className="border p-1">
                  {members.map((member) => (
                    <p key={member._id}>{member.mealCount}</p>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MealInfoTable;
