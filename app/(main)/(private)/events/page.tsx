import { getEvents } from "@/server/actions/events";
import EventsClient from "@/components/EventsClient";

export default async function EventsPage() {
    const userId = "admin";
    const events = await getEvents(userId);
    return <EventsClient events={events} />;
}