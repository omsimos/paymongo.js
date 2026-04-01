import type { MetaData } from "../types.js";

export interface ProductImage {
  id: string;
  type: string;
}

export interface CreateProductProps {
  name: string;
  description?: string;
  price?: number;
  currency?: string;
  images?: ProductImage[];
  metadata?: MetaData;
}

export interface ProductAttributes {
  id: string;
  name: string;
  description?: string;
  price?: number;
  currency?: string;
  images?: ProductImage[];
  metadata?: MetaData;
  created_at: number;
  updated_at: number;
}

export interface ProductData {
  id: string;
  type: string;
  attributes: ProductAttributes;
}

export interface ProductResponse {
  data: ProductData;
}

export interface ListProductProps {
  limit?: number;
  page?: number;
}

export interface ListProductResponse {
  has_more: boolean;
  limit: number;
  page: number;
  data: ProductData[];
}

export interface UpdateProductProps {
  name?: string;
  description?: string;
  price?: number;
  currency?: string;
  images?: ProductImage[];
  metadata?: MetaData;
}