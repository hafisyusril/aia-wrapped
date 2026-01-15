"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { HeartRateLevel } from "../components/heart-rates/heartRateUtils";

type FlowStep = "input" | "intro" | "content";

interface UserData {
  vhcStatus: "checked" | "unchecked";
  steps: number;
  level: HeartRateLevel;
  gymVisit: number;
  weeklyChallenges: number;
  totalReward: number;
  generalRank: number;
  genderRank: number;
}

interface UserFlowContextProps {
  isDummyUser: boolean;
  userData: UserData | null;
  flowStep: FlowStep;
  setVitalityId: (id: string) => Promise<void>;
  vitalityId: string | null;
  isLoading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
}

const UserFlowContext = createContext<UserFlowContextProps | undefined>(
  undefined
);

export function UserFlowProvider({ children }: { children: ReactNode }) {
  const [isDummyUser, setIsDummyUser] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [flowStep, setFlowStep] = useState<FlowStep>("input");
  const [vitalityId, setVitalityIdState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("aia-vitality-id");
    if (storedId) {
      setVitalityId(storedId);
    }
  }, []);

  async function setVitalityId(id: string) {
    console.log("Fetching API for ID:", id);
    setVitalityIdState(id);
    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
      const response = await fetch(`${baseUrl}/api/v1/vitality/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Vitality ID not found. Please check your ID and try again.");
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API Error: ${response.statusText}`);
      }

      const jsonResponse = await response.json();
      const apiData = jsonResponse.data;

      // Map API response to UserData
      const userData: UserData = {
        vhcStatus: apiData.vhc === "Yes" ? "checked" : "unchecked",
        steps: Number(apiData.steps || 0),
        level: (apiData.heart_rate ? apiData.heart_rate.toLowerCase() : "light") as HeartRateLevel,
        gymVisit: Number(apiData.gym_visit || 0),
        weeklyChallenges: Number(apiData.weekly_challenge_completion || 0),
        totalReward: Number(apiData.total_rewards_earned || 0),
        generalRank: Number(apiData.rank || 0),
        genderRank: Number(apiData.rank_by_gender || 0),
      };

      setUserData(userData);
      setIsDummyUser(false);
      setFlowStep("intro");
      localStorage.setItem("aia-vitality-id", id);
    } catch (err: any) {
      console.error("Failed to fetch vitality data:", err);
      // Use the specific error message if available, otherwise a generic fallback
      setError(err.message || "Unable to retrieve data. Please try again later.");
      setUserData(null);
      setIsDummyUser(false);
      localStorage.removeItem("aia-vitality-id");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <UserFlowContext.Provider
      value={{ isDummyUser, userData, flowStep, setVitalityId, vitalityId, isLoading, error, setError }}
    >
      {children}
    </UserFlowContext.Provider>
  );
}

export function useUserFlow() {
  const context = useContext(UserFlowContext);
  if (!context) {
    throw new Error("useUserFlow must be used within a UserFlowProvider");
  }
  return context;
}
