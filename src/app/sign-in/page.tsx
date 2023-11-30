
import { redirect } from "next/navigation";
import { SignInGithub } from "~/components/SignInGithub";
import { getServerAuthSession } from "~/server/auth";

export default async function SignIn() {
  const session = await getServerAuthSession();

  if (session?.user) {
    redirect('/')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      <h1 className="text-7xl font-bold text-center">Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-700">stocks-compare</span> app </h1>
      <p className="text-lg text-muted-foreground/50 font-light p-5">in order to continue you need to authorize</p>
      <div className="w-[0.2px] h-[50px] bg-muted"></div>
      <SignInGithub className="mt-5" />
    </main>
  );
}

