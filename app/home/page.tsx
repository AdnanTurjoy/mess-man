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
import MealInfo from "../components/dashboard/MealInfo";

export default async function DashboardPage() {

  const memberList = await apiCall("/member", "GET");

  return (
    <>
      <TitlePage
        title="Home"
        description="Discover a new songs from various muscian"
      />
      <Card className="mt-10 border-dashed">
        <CardContent>
           <MealInfo memberList={memberList}/>
        </CardContent>
      </Card>
    </>
  );
}
