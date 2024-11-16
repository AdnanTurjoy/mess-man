import MealAddComponent from "@/app/components/meal/MealAddComponent";
import { apiCall } from "@/lib/apiClient";


// app/users/page.tsx
export default async function MealAdd() {
  const allMember = await apiCall("/member", "GET");
  // console.log(allUsers)
  return (
    <div>
      <MealAddComponent allMember={allMember}/>
    </div>
  );
}
