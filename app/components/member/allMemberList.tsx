import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
  } from "@/components/ui/table"
import { Member } from "./member"
  

  export function AllMemberList({memberList}: any) {
	console.log(memberList)
	return (
	  <Table>
		<TableCaption>A list of all member - {memberList?.length}</TableCaption>
		<TableHeader>
		  <TableRow>
			<TableHead className="w-[100px]">Name</TableHead>
			<TableHead>Phone Number</TableHead>
			<TableHead>Permanent Address</TableHead>
		  </TableRow>
		</TableHeader>
		<TableBody>
		  {memberList?.map((member: Member) => (
			<TableRow key={member._id}>
			  <TableCell className="font-medium">{member?.name}</TableCell>
			  <TableCell>{member?.phoneNumber}</TableCell>
			  <TableCell>{member?.permanentAddress}</TableCell>
			</TableRow>
		  ))}
		</TableBody>
		
	  </Table>
	)
  }
  