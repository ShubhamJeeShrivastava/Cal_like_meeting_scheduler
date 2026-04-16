import EventForm from "@/components/forms/EventForm"
import { getEvent } from "@/server/actions/events"

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ eventId: string }>
}) {
  const userId = "admin"
  const { eventId } = await params
  const event = await getEvent(userId, eventId)
  if(!event) return <h1>Event not found</h1>

  return (
        <section className="min-h-screen bg-[#0f0f10] text-[#ededed] p-10 font-sans">
            <div className="flex flex-col gap-6 max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-white tracking-tight">Edit event type</h1>
                    </div>
                </div>

                <div className="border border-[#262626] rounded-xl bg-[#161616] p-6 md:p-10 text-white max-w-3xl">
                  <EventForm
                    event={{ ...event, description: event.description || undefined }}
                  />
                </div>
            </div>
        </section>
  )
}