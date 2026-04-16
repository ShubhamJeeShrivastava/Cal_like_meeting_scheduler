import EventForm from "@/components/forms/EventForm";

export default function NewEventPage(){
    return (
        <section className="min-h-screen bg-[#0f0f10] text-[#ededed] p-10 font-sans">
            <div className="flex flex-col gap-6 max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-white tracking-tight">New event type</h1>
                    </div>
                </div>

                <div className="border border-[#262626] rounded-xl bg-[#161616] p-6 md:p-10 text-white max-w-3xl">
                    <EventForm />
                </div>
            </div>
        </section>
      )
}
