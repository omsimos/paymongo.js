import type { FetchClient } from "../../utils/fetch-client.js";
import type { PlanResponse } from "./types.js";

export const retrievePlan = async (
  api: FetchClient,
  planId: string
): Promise<PlanResponse> => {
  return api<PlanResponse>({
    method: "GET",
    path: `/v1/subscriptions/plans/${planId}`,
  });
};