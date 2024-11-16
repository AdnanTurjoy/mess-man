import MealAddComponent from "@/app/components/meal/MealAddComponent";
import AddShoppingForm from "@/app/components/shopping/ShoppingAddComponent";
import { apiCall } from "@/lib/apiClient";


// app/users/page.tsx
export default async function ShoppingAdd() {
  const allMember = await apiCall("/member", "GET");
  return (
    <div>
      <AddShoppingForm memberList={allMember}/>
    </div>
  );
}
