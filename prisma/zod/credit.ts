import * as z from "zod"
import * as imports from "../zod-utils"
import { CompleteUser, UserModel } from "./index"

export const _CreditModel = z.object({
  userId: z.number().int(),
  activeCredits: z.number().int(),
  expiredCredits: z.number().int(),
  LastPurchaseDate: z.date(),
  UsedCredits: z.number().int(),
  LastUtilisedDate: z.date(),
})

export interface CompleteCredit extends z.infer<typeof _CreditModel> {
  user: CompleteUser
}

/**
 * CreditModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const CreditModel: z.ZodSchema<CompleteCredit> = z.lazy(() => _CreditModel.extend({
  user: UserModel,
}))
