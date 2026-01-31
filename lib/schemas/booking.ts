import { z } from "zod";

export const bookingFormSchema = z.object({
  guestEmail: z.string().email("Invalid email"),
  guestName: z.string().min(2, "Name is required"),
  notes: z.string().optional(),
});

export type BookingFormSchema = z.infer<typeof bookingFormSchema>;
