import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import Form from "@/components/form";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Page = async () => {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();
  if (session) redirect("/");
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="shadow-lg rounded-lg h-[50vh] md:h-[45vh] w-[65vw] md:w-[35vw] lg:w-[20vw] p-4">
        <h1 className="text-2xl">Sign Up</h1>
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
        <div>
          <p className="text-sm">Already have an account?</p>
          <Button asChild variant={"link"} className="px-0">
            <Link href="/login">Log In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
