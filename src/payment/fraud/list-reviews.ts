import type { FetchClient } from "../../utils/fetch-client.js";
import type { ListFraudReviewProps, ListFraudReviewResponse } from "./types.js";

export const listFraudReviews = async (
  api: FetchClient,
  { limit = 10, after, before }: ListFraudReviewProps = {}
): Promise<ListFraudReviewResponse> => {
  const query: Record<string, unknown> = { limit };
  if (after) query.after = after;
  if (before) query.before = before;

  return api<ListFraudReviewResponse>({
    method: "GET",
    path: "/v1/fraud/reviews",
    query,
  });
};