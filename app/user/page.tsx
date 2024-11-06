import NewUserForm from "../components/NewUserForm";
import NewMemberForm from "../components/member/NewMemberForm";

// app/users/page.tsx
export default async function UsersPage() {
  const res = await fetch(`http://localhost:3000/api/users`, {
    cache: "no-store",
  });
  const users = await res.json();

  return (
    <div>
      <NewMemberForm />
    </div>
  );
}
