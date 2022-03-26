import { _EventTypeModel } from "prisma/zod";

const createEventTypeBaseInput = _EventTypeModel
  .pick({
    title: true,
    slug: true,
    description: true,
    length: true,
    teamId: true,
    schedulingType: true,
    locations: true,
  })
  .refine((data) => (data.teamId ? data.teamId && data.schedulingType : true), {
    path: ["schedulingType"],
    message: "You must select a scheduling type for team events",
  });

export const createEventTypeInput = createEventTypeBaseInput;
