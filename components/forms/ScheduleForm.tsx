'use client'

import { DAYS_OF_WEEK_IN_ORDER } from "@/constants"
import { timeToFloat } from "@/lib/utils"
import { scheduleFormSchema } from "@/schema/schedule"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { formatTimezoneOffset } from "@/lib/formatters"
import { Fragment } from "react"
import { Button } from "../ui/button"
import { Plus, X } from "lucide-react"
import { Input } from "../ui/input"
import { toast } from "sonner"
import { saveSchedule } from "@/server/actions/schedule"

type Availability = {
  startTime: string
  endTime: string
  dayOfWeek: (typeof DAYS_OF_WEEK_IN_ORDER)[number]
}

const WEEKDAYS = ["monday", "tuesday", "wednesday", "thursday", "friday"] as const
const WEEKEND = ["saturday", "sunday"] as const

const DEFAULT_AVAILABILITIES: Availability[] = WEEKDAYS.map(day => ({
  dayOfWeek: day,
  startTime: "9:00",
  endTime: "17:00",
}))

export function ScheduleForm({
  schedule,
}: {
  schedule?: {
    timezone: string
    availabilities: Availability[]
  }
}) {
  const form = useForm<z.infer<typeof scheduleFormSchema>>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      timezone:
        schedule?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
      availabilities:
        schedule?.availabilities && schedule.availabilities.length > 0
          ? schedule.availabilities.toSorted((a, b) =>
              timeToFloat(a.startTime) - timeToFloat(b.startTime)
            )
          : DEFAULT_AVAILABILITIES,
    },
  })

  const {
    append: addAvailability,
    remove: removeAvailability,
    fields: availabilityFields,
  } = useFieldArray({ name: "availabilities", control: form.control })

  const groupedAvailabilityFields = Object.groupBy(
    availabilityFields.map((field, index) => ({ ...field, index })),
    availability => availability.dayOfWeek
  )

  async function onSubmit(values: z.infer<typeof scheduleFormSchema>) {
    try {
      await saveSchedule(values)
      toast("Schedule saved successfully.", {
        duration: 4000,
        className: '!rounded-xl !py-4 !px-5 !text-green-400 !font-semibold',
      })
    } catch (error: any) {
      form.setError("root", {
        message: `There was an error saving your schedule: ${error.message}`,
      })
    }
  }

  return (
    <Form {...form}>
      <form className="flex gap-8 flex-col" onSubmit={form.handleSubmit(onSubmit)}>

        {form.formState.errors.root && (
          <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-lg">
            {form.formState.errors.root.message}
          </div>
        )}

        {/* Timezone */}
        <FormField
          control={form.control}
          name="timezone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#939393] text-sm font-medium">Timezone</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full bg-[#0f0f10] border-[#333] text-white rounded-md">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Intl.supportedValuesOf("timeZone").map(timezone => (
                    <SelectItem key={timezone} value={timezone}>
                      {timezone}
                      {` (${formatTimezoneOffset(timezone)})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Day rows */}
        <div className="flex flex-col divide-y divide-[#1e1e1e]">
          {DAYS_OF_WEEK_IN_ORDER.map(dayOfWeek => {
            const dayFields = groupedAvailabilityFields[dayOfWeek] ?? []
            const isWeekend = (WEEKEND as readonly string[]).includes(dayOfWeek)
            const hasSlots = dayFields.length > 0

            return (
              <div
                key={dayOfWeek}
                className="flex flex-col sm:flex-row sm:items-start gap-3 py-4"
              >
                {/* Day label + toggle */}
                <div className="flex items-center gap-3 w-28 shrink-0 pt-1">
                  <span className={`capitalize text-sm font-semibold w-9 ${hasSlots ? 'text-white' : 'text-[#444]'}`}>
                    {dayOfWeek.substring(0, 3)}
                  </span>
                  {/* Availability indicator dot */}
                  <span className={`w-2 h-2 rounded-full shrink-0 ${
                    hasSlots ? 'bg-green-500' : 'bg-[#333]'
                  }`} />
                </div>

                {/* Slots + Add button */}
                <div className="flex flex-col gap-2 flex-1">
                  {/* Existing slots */}
                  {dayFields.length === 0 && (
                    <span className="text-[#444] text-sm py-1 select-none">Unavailable</span>
                  )}

                  {dayFields.map((field, labelIndex) => (
                    <div className="flex flex-col gap-1" key={field.id}>
                      <div className="flex gap-2 items-center flex-wrap">
                        {/* Start */}
                        <FormField
                          control={form.control}
                          name={`availabilities.${field.index}.startTime`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  className="w-24 bg-[#0f0f10] border-[#333] text-white focus-visible:ring-1 focus-visible:ring-[#555] rounded-md text-sm"
                                  aria-label={`${dayOfWeek} Start Time ${labelIndex + 1}`}
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <span className="text-[#555] text-sm">—</span>
                        {/* End */}
                        <FormField
                          control={form.control}
                          name={`availabilities.${field.index}.endTime`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  className="w-24 bg-[#0f0f10] border-[#333] text-white focus-visible:ring-1 focus-visible:ring-[#555] rounded-md text-sm"
                                  aria-label={`${dayOfWeek} End Time ${labelIndex + 1}`}
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removeAvailability(field.index)}
                          className="p-1 rounded text-[#555] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          aria-label="Remove slot"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      {/* Validation messages */}
                      <FormMessage>
                        {form.formState.errors.availabilities?.at?.(field.index)?.root?.message}
                      </FormMessage>
                      <FormMessage>
                        {form.formState.errors.availabilities?.at?.(field.index)?.startTime?.message}
                      </FormMessage>
                      <FormMessage>
                        {form.formState.errors.availabilities?.at?.(field.index)?.endTime?.message}
                      </FormMessage>
                    </div>
                  ))}

                  {/* Add slot button */}
                  <button
                    type="button"
                    onClick={() =>
                      addAvailability({
                        dayOfWeek,
                        startTime: "9:00",
                        endTime: "17:00",
                      })
                    }
                    className="flex items-center gap-1.5 text-xs text-[#555] hover:text-white transition-colors w-fit mt-1 group"
                  >
                    <span className="w-5 h-5 rounded border border-[#333] group-hover:border-[#666] flex items-center justify-center transition-colors">
                      <Plus className="w-3 h-3" />
                    </span>
                    Add time slot
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Save */}
        <div className="flex justify-end pt-4 border-t border-[#262626]">
          <Button
            className="bg-white hover:bg-gray-200 text-black px-8 py-2 rounded-md font-medium transition-colors cursor-pointer"
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            {form.formState.isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

