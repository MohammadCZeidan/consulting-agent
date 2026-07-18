import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  capital: z.number().positive(),
  minInvestment: z.number().positive(),
  maxInvestment: z.number().positive(),
  country: z.string().min(2),
  locations: z.string().min(2),
  industries: z.array(z.string()).min(1),
  legalConfirmation: z.literal(true)
});
