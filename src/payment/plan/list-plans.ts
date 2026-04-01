import type { FetchClient } from "../../utils/fetch-client.js";
import type { ListPlanProps, ListPlanResponse } from "./types.js";

export const listPlans = async (
  api: FetchClient,
  { limit = 10, page = 1 }: ListPlanProps = {}
): Promise<ListPlanResponse> => {
  return api<ListPlanResponse>({
    method: "GET",
    path: "/v1/subscriptions/plans",
    query: { limit, page },
  });
};