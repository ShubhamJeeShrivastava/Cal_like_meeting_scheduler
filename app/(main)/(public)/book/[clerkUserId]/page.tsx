import PublicProfile from "@/components/PublicProfile"



export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ clerkUserId: string }>
}) {
  const { clerkUserId } = await params
  const fullName = "Admin User"

  // Render PublicProfile component
  return <PublicProfile userId={clerkUserId} fullName={fullName} />
}
