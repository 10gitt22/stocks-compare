'use client'

// import classNames from "classnames"
import { signIn } from "next-auth/react"
import { type FC } from "react"
import { Button } from "~/ui/Button"
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { cn } from "~/global/utils"

type SignInGithub = {
  className?: string
}

export const SignInGithub: FC<SignInGithub> = ({ className }) => {  
  const handleSignIn = async () => {
    await signIn('github', {callbackUrl: 'http://localhost:3000'})
  }

  return (
    <Button size={'lg'} className={cn("flex gap-2", className)} onClick={handleSignIn}>
      Sign in with GitHub
      <GitHubLogoIcon className="w-[20px] h-[20px]"/>
    </Button>
  )
}