import { getPageSession } from "@/app/page";
import { Sidebar } from "../_components/sidebar";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getPageSession();
  if (!session) redirect("/");

  return (
    <div>
      <Sidebar session={session} active="dashboard">
        a
      </Sidebar>
    </div>
  );
}
