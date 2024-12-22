import * as z from "zod";

export const UserValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 characters." }),
  username: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 characters." }),
  bio: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(1000, { message: "Maximum 1000 characters." }),

  // New GitHub URL field, optional but must be a valid URL if filled
  github: z.string().url({ message: "Invalid URL" }).optional(),

  // New Codeforces rating, must be a number (optional)
  codeforcesRating: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[0-9]+$/.test(val), 
      { message: "Codeforces rating must be a number." }
    ),

  // New CodeChef rating, must be a number (optional)
  codechefRating: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[0-9]+$/.test(val), 
      { message: "CodeChef rating must be a number." }
    ),
});
