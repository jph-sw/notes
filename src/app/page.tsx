import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";

import Form from "@/components/form";
import { cache } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const getPageSession = cache(() => {
  const authRequest = auth.handleRequest("GET", context);
  return authRequest.validate();
});

const Page = async () => {
  const session = await getPageSession();

  // if (!session) redirect("/login");
  return (
    <div>
      <div className="w-full h-[5vh] border-b flex justify-between items-center px-8">
        <span>notes 📝</span>
        {session && (
          <Form action="/api/logout">
            <Button type="submit" variant={"outline"} size={"sm"}>
              Sign out
            </Button>
          </Form>
        )}
      </div>
      <div className="text-5xl h-[95vh] flex justify-center pt-48">
        <div className="text-center flex flex-col gap-4">
          <h1>notes 📝</h1>
          <h2 className="text-2xl font-serif">made by jan philipps</h2>
          <Button asChild>
            <Link href={"/app"}>Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
