import { ScheduleForm } from "@/components/forms/ScheduleForm"
import { getSchedule } from "@/server/actions/schedule"

// Default export function for the SchedulePage component
export default async function SchedulePage() {
    // Check if the user is authenticated (using Clerk authentication)
    const userId = "admin"

  // Query the database to fetch the user's schedule based on the authenticated user
  const schedule = await getSchedule(userId)

    return (
        <section className="min-h-screen bg-[#0f0f10] text-[#ededed] p-10 font-sans">
            <div className="flex flex-col gap-6 max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-white tracking-tight">Availability</h1>
                        <p className="text-sm text-[#939393] mt-1">Configure times when you are available for bookings.</p>
                    </div>
                </div>

                <div className="border border-[#262626] rounded-xl bg-[#161616] p-6 md:p-10 text-white max-w-3xl">
                    <ScheduleForm schedule={schedule} /> 
                </div>
            </div>
        </section>
    )

}