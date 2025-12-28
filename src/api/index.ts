// api/index.ts
// Explicit barrel exports — avoids TS path resolution bugs

// =========================
// Client
// =========================
export { ApiClient, apiClient } from "./client";
export type { ApiResponse, ApiError } from "./client";

// =========================
// Dashboard
// =========================
export {
  getDashboardOverview,
  getDroneStatuses,
  getDroneTelemetry,
  getRecentMissions,
  getAlerts,
  acknowledgeAlert,
  abortMission,
  emergencyLandDrone,
} from "./dashboard.api";

export type {
  DroneStatus,
  MissionSummary,
  TelemetrySnapshot,
  Alert,
} from "./dashboard.api";

// =========================
// Execution  ✅ FIXED
// =========================
import {
  startMission,
  pauseMission,
  resumeMission,
  abortMission as abortExecutionMission,
  getMissionStatus,
  getActiveMissions,
  takeOffDrone,
  landDrone,
  hoverDrone,
  returnToLaunch,
  redirectDrone,
} from "./execution.api";

export {
  startMission,
  pauseMission,
  resumeMission,
  abortExecutionMission,
  getMissionStatus,
  getActiveMissions,
  takeOffDrone,
  landDrone,
  hoverDrone,
  returnToLaunch,
  redirectDrone,
};

export type {
  MissionType,
  MissionStatus,
  Waypoint,
  MissionConfig,
  MissionExecution,
  ExecutionCommandResult,
} from "./execution.api";

// =========================
// Market
// =========================
export {
  getMarketOverview,
  getMarketOpportunities,
  getClientProfiles,
  getPricingModels,
  upsertPricingModel,
} from "./market.api";

export type {
  MarketOverview,
  MarketOpportunity,
  ClientProfile,
  PricingModel,
} from "./market.api";

// =========================
// News
// =========================
export {
  getLatestNews,
  getNewsById,
  getCriticalNews,
  getNewsBySource,
} from "./news.api";

export type {
  NewsItem,
  NewsCategory,
} from "./news.api";

// =========================
// Portfolio
// =========================
export {
  getFleetSummary,
  getAssets,
  getAssetById,
  updateAssetStatus,
  getMaintenanceRecords,
  addMaintenanceRecord,
  assignAssetToMission,
} from "./portfolio.api";

export type {
  Asset,
  AssetType,
  AssetStatus,
  FleetSummary,
  MaintenanceRecord,
  Assignment,
} from "./portfolio.api";