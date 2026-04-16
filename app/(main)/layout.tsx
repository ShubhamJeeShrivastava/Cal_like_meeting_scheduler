import PrivateNavBar from "@/components/PrivateNavBar"

export default function MainLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    return (
        <main className="relative flex">
            {/* Sidebar for private routes, we should actually move this later if we want public pages to be full screen */}
            <PrivateNavBar />

            <section className="flex-1 overflow-y-auto">
                {children}
            </section>
        </main>
    )
}