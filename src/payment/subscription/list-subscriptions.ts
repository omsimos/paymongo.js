import type { FetchClient } from "../../utils/fetch-client.js";
import type { ListSubscriptionProps, ListSubscriptionResponse } from "./types.js";

export const listSubscriptions = async (
  api: FetchClient,
  props: ListSubscriptionProps = {}
): Promise<ListSubscriptionResponse> => {
  const query: Record<string, unknown> = { limit: props.limit ?? 10 };
  if (props.after) query.after = props.after;
  if (props.before) query.before = props.before;
  if (props.customer_id) query.customer_id = props.customer_id;
  if (props.plan_id) query.plan_id = props.plan_id;
  if (props.sort_by) query.sort_by = props.sort_by;
  if (props.order) query.order = props.order;

  return api<ListSubscriptionResponse>({
    method: "GET",
    path: "/v1/subscriptions",
    query,
  });
};