import { apiCall } from "@/lib/apiClient";
import NewUserForm from "../components/NewUserForm";
import NewMemberForm from "../components/member/NewMemberForm";

// app/users/page.tsx
export default async function UsersPage() {
  const allUsers = await apiCall("/users", "GET");
  // console.log(allUsers)
  return (
    <div>
      <NewMemberForm />
    </div>
  );
}
