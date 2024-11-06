import { apiFetch } from "@/lib/apiClient";
import NewUserForm from "../components/NewUserForm";
import NewMemberForm from "../components/member/NewMemberForm";

// app/users/page.tsx
export default async function UsersPage() {
  return (
    <div>
      <NewMemberForm />
    </div>
  );
}
