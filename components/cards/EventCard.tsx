import { cn } from "@/lib/utils"
import { formatEventDescription } from "@/lib/formatters"
import { Button } from "../ui/button"
import Link from "next/link"
import { CopyEventButton } from "../CopyEventButton"

type EventCardProps = {
    id: string
    isActive: boolean
    name: string
    description: string | null
    durationInMinutes: number
    clerkUserId: string
  }
  
  export default function EventCard ({
    id,
    isActive,
    name,
    description,
    durationInMinutes,
    clerkUserId,
  }: EventCardProps) {

    return (
        <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-[#161616] hover:bg-[#1a1a1a] transition-colors", !isActive && "opacity-50 grayscale")}>
            <div className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-white text-lg tracking-tight">{name}</h3>
                <p className="text-[#939393] text-sm">
                    {formatEventDescription(durationInMinutes)}
                </p>
                {description != null && (
                    <p className="text-[#666] text-sm mt-1 line-clamp-2 max-w-lg">{description}</p>
                )}
            </div>
            
            <div className="flex items-center gap-3 mt-5 md:mt-0">
                {isActive && (
                    <CopyEventButton
                        variant="outline"
                        eventId={id}
                        clerkUserId={clerkUserId}
                        className="bg-transparent border border-[#333] text-white hover:bg-[#262626] hover:text-white transition-colors"
                    />
                )}
                <Button 
                    className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-md font-medium text-sm transition-colors cursor-pointer shadow-sm"
                    asChild>
                    <Link href={`/events/${id}/edit`}>Edit</Link>
                </Button>
            </div>
        </div>
      )

  }