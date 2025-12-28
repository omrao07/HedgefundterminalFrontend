// market.api.ts
// Production-ready API layer for market data, pricing, and analytics
// Depends only on client.ts

import { apiClient, ApiResponse } from "./client";

/* =========================
   Types
   ========================= */

export type MarketType =
  | "defence"
  | "homeland_security"
  | "emergency_response"
  | "logistics"
  | "commercial"
  | "custom";

export interface MarketOverview {
  totalOpportunities: number;
  activeTenders: number;
  activeClients: number;
  regionsCovered: number;
}

export interface MarketOpportunity {
  id: string;
  title: string;
  marketType: MarketType;
  region: string;
  valueEstimate: number; // INR or USD based on backend
  status: "open" | "in_progress" | "closed" | "lost";
  publishedAt: string;
  deadline?: string;
}

export interface ClientProfile {
  id: string;
  name: string;
  sector: MarketType;
  country: string;
  activeContracts: number;
  totalValue: number;
}

export interface PricingModel {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  recurringPrice?: number;
  currency: string;
}

/* =========================
   API Functions
   ========================= */

/**
 * Fetch high-level market overview
 */
export function getMarketOverview(): Promise<
  ApiResponse<MarketOverview>
> {
  return apiClient.get("/market/overview");
}

/**
 * Fetch all market opportunities
 */
export function getMarketOpportunities(
  status?: MarketOpportunity["status"]
): Promise<ApiResponse<MarketOpportunity[]>> {
  return apiClient.get("/market/opportunities", {
    query: { status },
  });
}

/**
 * Fetch a specific market opportunity
 */
export function getMarketOpportunityById(
  opportunityId: string
): Promise<ApiResponse<MarketOpportunity>> {
  return apiClient.get(`/market/opportunities/${opportunityId}`);
}

/**
 * Fetch key client profiles
 */
export function getClientProfiles(): Promise<
  ApiResponse<ClientProfile[]>
> {
  return apiClient.get("/market/clients");
}

/**
 * Fetch pricing models
 */
export function getPricingModels(): Promise<
  ApiResponse<PricingModel[]>
> {
  return apiClient.get("/market/pricing");
}

/**
 * Create or update a pricing model
 */
export function upsertPricingModel(
  model: PricingModel
): Promise<ApiResponse<{ success: true }>> {
  return apiClient.post("/market/pricing", model);
}