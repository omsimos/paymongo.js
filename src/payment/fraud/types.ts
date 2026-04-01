export interface FraudReviewAttributes {
  id: string;
  amount: number;
  currency: string;
  payment_id: string;
  status: string;
  reason: string;
  created_at: number;
}

export interface FraudReviewData {
  id: string;
  type: string;
  attributes: FraudReviewAttributes;
}

export interface ListFraudReviewProps {
  limit?: number;
  after?: string;
  before?: string;
}

export interface ListFraudReviewResponse {
  has_more: boolean;
  data: FraudReviewData[];
}