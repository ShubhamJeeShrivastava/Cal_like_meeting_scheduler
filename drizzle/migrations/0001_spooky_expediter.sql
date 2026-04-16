CREATE TABLE "meetings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"eventId" uuid NOT NULL,
	"clerkUserId" text NOT NULL,
	"guestName" text NOT NULL,
	"guestEmail" text NOT NULL,
	"guestNotes" text,
	"startTime" timestamp NOT NULL,
	"durationInMinutes" integer NOT NULL,
	"timezone" text NOT NULL,
	"eventName" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "meetings" ADD CONSTRAINT "meetings_eventId_events_id_fk" FOREIGN KEY ("eventId") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "meetingUserIdIndex" ON "meetings" USING btree ("clerkUserId");--> statement-breakpoint
CREATE INDEX "meetingEventIdIndex" ON "meetings" USING btree ("eventId");