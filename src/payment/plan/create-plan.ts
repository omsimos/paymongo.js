import type { FetchClient } from "../../utils/fetch-client.js";
import type { CreatePlanProps, PlanResponse } from "./types.js";

export const createPlan = async (
  api: FetchClient,
  props: CreatePlanProps
): Promise<PlanResponse> => {
  return api<PlanResponse>({
    method: "POST",
    path: "/v1/subscriptions/plans",
    body: { data: { attributes: props } },
  });
};