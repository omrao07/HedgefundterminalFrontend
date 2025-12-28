// types/market.types.ts
// Market, sales, and commercial intelligence domain types
// Types only — safe for import type

/* =========================
   Market Classification
   ========================= */

export type MarketType =
  | "defence"
  | "homeland_security"
  | "emergency_response"
  | "logistics"
  | "commercial"
  | "custom";

/* =========================
   Market Overview
   ========================= */

export interface MarketOverview {
  totalOpportunities: number;
  activeTenders: number;
  activeClients: number;
  regionsCovered: number;
}

/* =========================
   Opportunities / Tenders
   ========================= */

export type MarketOpportunityStatus =
  | "open"
  | "in_progress"
  | "closed"
  | "lost";

export interface MarketOpportunity {
  id: string;
  title: string;
  marketType: MarketType;
  region: string;
  valueEstimate: number; // currency resolved by backend
  status: MarketOpportunityStatus;
  publishedAt: string; // ISO timestamp
  deadline?: string;   // ISO timestamp
}

/* =========================
   Client Profiles
   ========================= */

export interface ClientProfile {
  id: string;
  name: string;
  sector: MarketType;
  country: string;
  activeContracts: number;
  totalValue: number;
}

/* =========================
   Pricing & Commercial Models
   ========================= */

export interface PricingModel {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  recurringPrice?: number;
  currency: string;
}