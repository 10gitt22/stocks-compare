
import { redirect } from "next/navigation";
import { Header } from "~/components/Header"
import { getServerAuthSession } from "~/server/auth";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect('/sign-in')
  }

  return (
    <>
      <Header />
      {children}
    </>
  )
}