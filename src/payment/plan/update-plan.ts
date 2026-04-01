import type { FetchClient } from "../../utils/fetch-client.js";
import type { UpdatePlanProps, PlanResponse } from "./types.js";

export const updatePlan = async (
  api: FetchClient,
  planId: string,
  props: UpdatePlanProps
): Promise<PlanResponse> => {
  return api<PlanResponse>({
    method: "PUT",
    path: `/v1/subscriptions/plans/${planId}`,
    body: { data: { attributes: props } },
  });
};