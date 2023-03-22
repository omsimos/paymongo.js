import { z } from "zod";

// TODO: Finsih this
export const linkOutputSchema = z.object({
  data: z.object({
    id: z.string(),
    type: z.enum(["link"]),
    attributes: z.object({
      amount: z.number().min(10000),
      archived: z.boolean(),
      currency: z.enum(["PHP"]),
      description: z.string(),
      livemode: z.boolean(),
      fee: z.number(),
      remarks: z.string().nullable(),
      status: z.enum(["unpaid"]),
    }),
  }),
});

export type LinkOutput = z.infer<typeof linkOutputSchema>;

// {
//   "data": {
//     "id": "link_gTHxfFE5uRkiYgUjBcFbZF1g",
//     "type": "link",
//     "attributes": {
//       "amount": 10000,
//       "archived": false,
//       "currency": "PHP",
//       "description": "vitest - link create",
//       "livemode": false,
//       "fee": 0,
//       "remarks": null,
//       "status": "unpaid",
//       "tax_amount": null,
//       "taxes": [],
//       "checkout_url": "https://pm.link/joogie/test/1EeoT5R",
//       "reference_number": "1EeoT5R",
//       "created_at": 1679488512,
//       "updated_at": 1679488512,
//       "payments": []
//     }
//   }
// }
