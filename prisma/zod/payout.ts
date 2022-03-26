import * as z from "zod";
import * as imports from "../zod-utils";
import { CompleteUser, UserModel } from "./index";

export const _PayoutModel = z.object({
  id: z.number().int(),
  providerReferenceId: z.string(),
  userId: z.number().int(),
  amount: z.number(),
});

export interface CompletePayout extends z.infer<typeof _PayoutModel> {
  user: CompleteUser;
}

/**
 * PayoutModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const PayoutModel: z.ZodSchema<CompletePayout> = z.lazy(() =>
  _PayoutModel.extend({
    user: UserModel,
  })
);
