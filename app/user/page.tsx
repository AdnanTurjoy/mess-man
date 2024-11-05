import NewUserForm from "../components/NewUserForm";
import NewMemberForm from "../components/member/NewMemberForm";

// app/users/page.tsx
export default async function UsersPage() {
	const res = await fetch(`http://localhost:3000/api/users`, {cache: "no-store"});
	const users = await res.json();
    
	return (
	  <div>
		<h1>Users</h1>
		<NewUserForm/>
		<NewMemberForm/>
		<ul>
		  {users.map((user: { _id: string; name: string; email: string }) => (
			<li key={user._id}>
			  {user.name} - {user.email}
			</li>
		  ))}
		</ul>
	  </div>
	);
  }
  