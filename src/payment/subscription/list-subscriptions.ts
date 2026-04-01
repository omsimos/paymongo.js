import type { FetchClient } from "../../utils/fetch-client.js";
import type { ListSubscriptionProps, ListSubscriptionResponse } from "./types.js";

export const listSubscriptions = async (
  api: FetchClient,
  {
    limit = 10,
    after,
    before,
    customerId,
    planId,
    sortBy,
    order,
  }: ListSubscriptionProps = {}
): Promise<ListSubscriptionResponse> => {
  const query: Record<string, unknown> = { limit };
  if (after) query.after = after;
  if (before) query.before = before;
  if (customerId) query.customer_id = customerId;
  if (planId) query.plan_id = planId;
  if (sortBy) query.sort_by = sortBy;
  if (order) query.order = order;

  return api<ListSubscriptionResponse>({
    method: "GET",
    path: "/v1/subscriptions",
    query,
  });
};