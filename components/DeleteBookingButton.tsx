'use client'

import { cancelMeeting } from "@/server/actions/meetings"
import { Trash2 } from "lucide-react"
import { useState, useTransition } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function DeleteBookingButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleDelete = () => {
        startTransition(async () => {
            try {
                await cancelMeeting(id)
                toast.success("Booking cancelled successfully")
                router.refresh()
            } catch (error) {
                toast.error("Failed to cancel booking")
            }
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button 
                    className="p-2 text-[#666] hover:text-red-500 hover:bg-red-500/10 rounded-md transition-all"
                    title="Cancel Booking"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#161616] border-[#262626] text-white">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold">Cancel Booking?</AlertDialogTitle>
                    <AlertDialogDescription className="text-[#939393]">
                        Are you sure you want to cancel this booking? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-[#262626] text-white border-none hover:bg-[#333]">
                        No, keep it
                    </AlertDialogCancel>
                    <AlertDialogAction 
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700 text-white border-none"
                        disabled={isPending}
                    >
                        {isPending ? "Cancelling..." : "Yes, cancel booking"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
