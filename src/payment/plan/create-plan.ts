import type { FetchClient } from "../../utils/fetch-client.js";
import type { CreatePlanProps, PlanResponse } from "./types.js";

export const createPlan = async (
  api: FetchClient,
  {
    name,
    amount,
    currency = "PHP",
    description,
    interval,
    intervalCount,
    type = "scheduled",
    cycleCount,
    metadata,
  }: CreatePlanProps
): Promise<PlanResponse> => {
  const data: Record<string, unknown> = {
    attributes: {
      name,
      amount,
      currency,
      description,
      interval,
      interval_count: intervalCount,
      type,
      ...(cycleCount && { cycle_count: cycleCount }),
      ...(metadata && { metadata }),
    },
  };

  return api<PlanResponse>({
    method: "POST",
    path: "/v1/subscriptions/plans",
    body: { data },
  });
};