'use client'

import { type FC } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from "next-auth/react"

import { Avatar, AvatarFallback, AvatarImage } from "~/ui/Avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/ui/DropdownMenu"
import { Skeleton } from '~/ui/Skeleton'
import { ExitIcon, ReaderIcon } from '@radix-ui/react-icons'

type UserMenuProps = {
  userName?: string | null
  userImage?: string | null
}

export const UserMenu: FC<UserMenuProps> = ({ userName, userImage }) => {
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex text-lg font-semibold items-center gap-2 outline-none">
        <Avatar className="bg-mute">
          {userImage && <AvatarImage src={userImage} alt="profile picture" />}
          <AvatarFallback>
            <Skeleton className='h-full w-full' />
          </AvatarFallback>
        </Avatar>
        {userName ?? 'user'}
      </DropdownMenuTrigger>
      <DropdownMenuContent side='top' className="mt-2">
        <DropdownMenuItem className='flex gap-2 items-center text-md hover:cursor-pointer' onClick={() => {
          router.push('/profile')
        }}>
          <ReaderIcon className="w-[20px] h-[20px]" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-2 items-center text-md hover:cursor-pointer" onClick={handleSignOut}>
          <ExitIcon className="w-[20px] h-[20px]" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
