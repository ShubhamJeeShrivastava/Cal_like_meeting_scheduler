import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function PublicPage() {
    const user = await currentUser()

    if (!user) {
        return redirect('/login')
    }

    // Once user is available, redirect to the booking page [Public Profile Page]
    return redirect(`/book/${user.id}`)
}