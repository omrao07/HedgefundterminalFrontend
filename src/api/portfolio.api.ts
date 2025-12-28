// portfolio.api.ts
// Production-ready API layer for fleet, asset, and portfolio management
// Depends only on client.ts

import { apiClient, ApiResponse } from "./client";

/* =========================
   Types
   ========================= */

export type AssetType =
  | "drone"
  | "payload"
  | "ground_station"
  | "docking_station"
  | "sensor"
  | "software";

export type AssetStatus =
  | "active"
  | "inactive"
  | "maintenance"
  | "decommissioned";

export interface Asset {
  id: string;
  name: string;
  assetType: AssetType;
  model: string;
  serialNumber: string;
  status: AssetStatus;
  location?: string;
  lastServiceDate?: string;
}

export interface FleetSummary {
  totalAssets: number;
  activeAssets: number;
  assetsInMaintenance: number;
  utilizationRate: number; // percentage
}

export interface MaintenanceRecord {
  id: string;
  assetId: string;
  description: string;
  performedBy: string;
  performedAt: string;
  nextDueAt?: string;
}

export interface Assignment {
  assetId: string;
  missionId: string;
  assignedAt: string;
}

/* =========================
   API Functions
   ========================= */

/**
 * Fetch portfolio/fleet summary
 */
export function getFleetSummary(): Promise<
  ApiResponse<FleetSummary>
> {
  return apiClient.get("/portfolio/summary");
}

/**
 * Fetch all assets
 */
export function getAssets(
  assetType?: AssetType,
  status?: AssetStatus
): Promise<ApiResponse<Asset[]>> {
  return apiClient.get("/portfolio/assets", {
    query: { assetType, status },
  });
}

/**
 * Fetch asset by ID
 */
export function getAssetById(
  assetId: string
): Promise<ApiResponse<Asset>> {
  return apiClient.get(`/portfolio/assets/${assetId}`);
}

/**
 * Update asset status
 */
export function updateAssetStatus(
  assetId: string,
  status: AssetStatus
): Promise<ApiResponse<{ success: true }>> {
  return apiClient.patch(`/portfolio/assets/${assetId}/status`, {
    status,
  });
}

/**
 * Fetch maintenance records for an asset
 */
export function getMaintenanceRecords(
  assetId: string
): Promise<ApiResponse<MaintenanceRecord[]>> {
  return apiClient.get(
    `/portfolio/assets/${assetId}/maintenance`
  );
}

/**
 * Add maintenance record
 */
export function addMaintenanceRecord(
  record: Omit<MaintenanceRecord, "id">
): Promise<ApiResponse<MaintenanceRecord>> {
  return apiClient.post("/portfolio/maintenance", record);
}

/**
 * Assign asset to a mission
 */
export function assignAssetToMission(
  assetId: string,
  missionId: string
): Promise<ApiResponse<Assignment>> {
  return apiClient.post("/portfolio/assignments", {
    assetId,
    missionId,
  });
}
/** * Fetch assignments for an asset
 */
export function getAssignmentsForAsset(
  assetId: string
): Promise<ApiResponse<Assignment[]>> {
  return apiClient.get(
    `/portfolio/assets/${assetId}/assignments`
  );
}   