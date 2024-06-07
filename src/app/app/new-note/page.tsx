import { getPageSession } from "@/app/page";
import { Sidebar } from "../_components/sidebar";
import { redirect } from "next/navigation";
import Form from "@/components/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const session = await getPageSession();
  if (!session) redirect("/");

  return (
    <div>
      <Sidebar session={session} active="new-note">
        <Form action="/api/signup">
          <div className="mb-4">
            <Label htmlFor="username">Username</Label>
            <Input name="username" id="username" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" id="password" />
          </div>
          <Button type="submit" className="w-full my-4">
            Sign up
          </Button>
        </Form>
      </Sidebar>
    </div>
  );
}
