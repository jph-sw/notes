import { redirect } from "next/navigation";
import { getPageSession } from "../page";

export default async function Page() {
  const session = await getPageSession();

  if (!session) redirect("/login");
  return <>{redirect("/app/dashboard")}</>;
}
