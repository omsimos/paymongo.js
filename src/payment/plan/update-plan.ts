import type { FetchClient } from "../../utils/fetch-client.js";
import type { UpdatePlanProps, PlanResponse } from "./types.js";

export const updatePlan = async (
  api: FetchClient,
  planId: string,
  { name, amount, description, metadata }: UpdatePlanProps
): Promise<PlanResponse> => {
  const data: Record<string, unknown> = {
    attributes: {
      ...(name && { name }),
      ...(amount && { amount }),
      ...(description && { description }),
      ...(metadata && { metadata }),
    },
  };

  return api<PlanResponse>({
    method: "PUT",
    path: `/v1/subscriptions/plans/${planId}`,
    body: { data },
  });
};