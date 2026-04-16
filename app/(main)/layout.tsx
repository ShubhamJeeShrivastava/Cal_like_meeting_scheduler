import PrivateNavBar from "@/components/PrivateNavBar"

export default function MainLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    return (
        <main className="relative flex min-h-screen bg-[#0f0f10]">
            <PrivateNavBar />
            <section className="flex-1 overflow-y-auto">
                {children}
            </section>
        </main>
    )
}