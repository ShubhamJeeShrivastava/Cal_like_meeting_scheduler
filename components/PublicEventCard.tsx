import { formatEventDescription } from "@/lib/formatters"
import Link from "next/link"
import { Button } from "./ui/button"
import { Clock } from "lucide-react"

type PublicEventCardProps = {
    id: string
    name: string
    clerkUserId: string
    description: string | null
    durationInMinutes: number
  }

export default function PublicEventCard({
    id,
    name,
    description,
    clerkUserId,
    durationInMinutes,
    }: PublicEventCardProps) {
        return (
            <div className="flex flex-col border border-[#262626] rounded-xl bg-[#161616] hover:bg-[#1a1a1a] transition-all duration-200 overflow-hidden text-left cursor-default shadow-sm hover:border-[#444]">
              <div className="p-6 pb-4">
                <h2 className="text-xl font-semibold text-white tracking-tight mb-2">{name}</h2>
                <div className="flex items-center text-[#939393] text-sm mb-4 font-medium">
                  <Clock className="w-4 h-4 mr-1.5 opacity-80" />
                  {formatEventDescription(durationInMinutes)}
                </div>
                {description && (
                    <p className="text-[#666] text-sm line-clamp-3 mb-6 bg-[#0f0f10] p-3 rounded-md border border-[#262626]">
                        {description}
                    </p>
                )}
              </div>
              <div className="mt-auto border-t border-[#262626] p-4 flex justify-end bg-[#0f0f10]">
                <Button
                  className="bg-white text-black hover:bg-gray-200 transition-colors font-medium cursor-pointer shadow-sm px-6"
                 asChild>
                  <Link href={`/book/${clerkUserId}/${id}`}>Select</Link>
                </Button>
              </div>
            </div>
          )
    }