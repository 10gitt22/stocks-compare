import { getServerAuthSession } from "~/server/auth"
import { UserMenu } from "./UserMenu"
import Link from "next/link"

export const Header = async () => {
  const session = await getServerAuthSession()

  return (
    <header className="flex justify-between items-center p-10">
      <Link href={'/'}>
        <div className="flex flex-col leading-none text-3xl font-bold">
          <div>stocks</div>
          <div>compare</div>
        </div>
      </Link>

      {session?.user && (
        <UserMenu
          userName={session.user.name ?? session.user.email}
          userImage={session.user.image}
        />
      )}
    </header>
  )
}
