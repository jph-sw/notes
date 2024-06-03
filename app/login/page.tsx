import Link from "next/link";

import { db } from "@/lib/db";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { lucia, validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Form } from "@/lib/form";

import type { DatabaseUser } from "@/lib/db";
import type { ActionResult } from "@/lib/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const { user } = await validateRequest();
  if (user) {
    return redirect("/");
  }
  return (
    <div className="flex justify-center pt-24">
      <Card>
        <CardHeader>
          <h1 className="text-2xl">Sign in</h1>
        </CardHeader>
        <CardContent>
          <Form action={login}>
            <label htmlFor="username">Username</label>
            <Input name="username" id="username" />
            <br />
            <label htmlFor="password">Password</label>
            <Input type="password" name="password" id="password" />
            <br />
            <Button>Continue</Button>
          </Form>
        </CardContent>
        <Button asChild variant={"link"}>
          <Link href="/signup">Create an account</Link>
        </Button>
      </Card>
    </div>
  );
}

async function login(_: any, formData: FormData): Promise<ActionResult> {
  "use server";
  const username = formData.get("username");
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "Invalid username",
    };
  }
  const password = formData.get("password");
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: "Invalid password",
    };
  }

  const existingUser = db
    .prepare("SELECT * FROM user WHERE username = ?")
    .get(username) as DatabaseUser | undefined;
  if (!existingUser) {
    return {
      error: "Incorrect username or password",
    };
  }

  const validPassword = await new Argon2id().verify(
    existingUser.password,
    password
  );
  if (!validPassword) {
    return {
      error: "Incorrect username or password",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}
