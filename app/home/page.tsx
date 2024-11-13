import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

import TitlePage from "../components/TitlePage";
import { apiCall } from "@/lib/apiClient";
import { AllMemberList } from "../components/member/allMemberList";

export default async function DashboardPage() {
  //   const allMember = await apiFetch("/member");

  const member = await apiCall("/member/672b182234ca7d2c711cb3e1", "GET");
  const memberList = await apiCall("/member", "GET");
  // console.log(memberList)

  return (
    <>
      <TitlePage
        title="Home"
        description="Discover a new songs from various muscian"
      />
      <Card className="mt-10 border-dashed">
        <CardContent>
          <center>
            <Image
              className="m-10"
              width={300}
              height={300}
              priority
              src={"/team_engineering_white.svg"}
              alt="illustration.svg"
            />
            <CardHeader>
              <CardTitle className="font-bold">{`That's It`}</CardTitle>
              {/* <CardDescription className="text-slate-300">
                Replace this with your content
              </CardDescription> */}
            </CardHeader>

            {/* <Button asChild>
              <a href="https://ui.shadcn.com/">Shadcn UI</a>
            </Button> */}
          </center>
          <AllMemberList memberList= {memberList}/>
          <div key={member._id}>
            <b>
              {" "}
              <p>{member.name}</p>
            </b>
            <p>{member.phoneNumber}</p>
            <p>{member.fbAccount}</p>
            <p>{member.nidNumber}</p>
            <p>{member.permanentAddress}</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
