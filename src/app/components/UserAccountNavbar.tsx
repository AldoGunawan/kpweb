'use client'

import { signOut } from "next-auth/react"
import { Button } from "./ui/button"

const UserAccountNavbar = () => {
    return (
        <Button onClick={() => signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/api/auth/sign-in`
        })} variant="destructive">Sign Out
          </Button>
    )
}

export default UserAccountNavbar