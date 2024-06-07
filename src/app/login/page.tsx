import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import Form from "@/components/form";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Page = async () => {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();
  if (session) redirect("/app");

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="shadow-lg rounded-lg h-[50vh] md:h-[45vh] w-[65vw] md:w-[35vw] lg:w-[20vw] p-4">
        <h1 className="text-2xl">Login</h1>
        <Form action="/api/login">
          <div className="mb-4">
            <Label htmlFor="username">Username</Label>
            <Input name="username" id="username" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" id="password" />
          </div>
          <Button type="submit" className="my-4 w-full">
            Login
          </Button>
        </Form>
        <div>
          <p className="text-sm">Don't have an account?</p>
          <Button asChild variant={"link"} className="px-0">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
