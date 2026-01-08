"use client";

import { useEffect, useRef } from "react";
import { useUserFlow } from "../contexts/UserFlowContext";

import CrowningCard from "../components/crowning/CrowningCard";
import FitnessChaserCard from "../components/fitness-chaser/FitnessChaserCard";
import GymVisitCard from "../components/gym-visit/GymVisitCard";
import HeartRateCard from "../components/heart-rates/HeartRateCard";
import InputVitalityCard from "../components/input-vitality/InputVitalityCard";
import IntroCard from "../components/IntroCard";
import SnapSection from "../components/SnapSection";
import StepsCard from "../components/steps/StepsCard";
import VHCStatusCard from "../components/vhc/VHCStatusCard";
import VitalityRankCard from "../components/vitality-rank/VitalityRankCard";
import WeeklyChallengeCard from "../components/weekly-challenges/WeeklyChallengeCard";
import FavoriteRewardCard from "../components/favorite-rewards/FavoriteRewardCard";

const DUMMY_DATA = {
  steps: 3_022_500,
  bpm: 120,
  gymVisit: 0,
  weeklyChallenges: 26,
  totalReward: 1_300_000,
  generalRank: 1450,
  genderRank: 673,
  vhcStatus: "unchecked" as const,
};

export default function Home() {
  const { userData, isDummyUser, flowStep } = useUserFlow();
  const introRef = useRef<HTMLDivElement>(null);

  const data = {
    steps: isDummyUser ? DUMMY_DATA.steps : userData?.steps ?? 0,
    bpm: isDummyUser ? DUMMY_DATA.bpm : userData?.bpm ?? 10,
    gymVisit: isDummyUser ? DUMMY_DATA.gymVisit : userData?.gymVisit ?? 0,
    weeklyChallenges: isDummyUser
      ? DUMMY_DATA.weeklyChallenges
      : userData?.weeklyChallenges ?? 0,
    totalReward: isDummyUser
      ? DUMMY_DATA.totalReward
      : userData?.totalReward ?? 0,
    generalRank: isDummyUser
      ? DUMMY_DATA.generalRank
      : userData?.generalRank ?? 0,
    genderRank: isDummyUser ? DUMMY_DATA.genderRank : userData?.genderRank ?? 0,
    vhcStatus: isDummyUser
      ? DUMMY_DATA.vhcStatus
      : userData?.vhcStatus ?? "unchecked",
  };

  useEffect(() => {
    if (flowStep === "intro") {
      introRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [flowStep]);

  return (
    <main className="h-svh overflow-y-scroll snap-y snap-mandatory">
      <SnapSection>
        <InputVitalityCard />
      </SnapSection>

      <SnapSection>
        <div ref={introRef}>
          <IntroCard />
        </div>
      </SnapSection>

      {data.vhcStatus === "checked" && (
        <SnapSection>
          <VHCStatusCard status={data.vhcStatus} />
        </SnapSection>
      )}

      <SnapSection>
        <StepsCard steps={data.steps} />
      </SnapSection>

      <SnapSection>
        <HeartRateCard bpm={data.bpm} />
      </SnapSection>

      <SnapSection>
        <GymVisitCard counter={data.gymVisit} />
      </SnapSection>

      <SnapSection>
        <FitnessChaserCard totalChallenges={data.weeklyChallenges} />
      </SnapSection>

      <SnapSection>
        <WeeklyChallengeCard totalReward={data.totalReward} />
      </SnapSection>

      <SnapSection>
        <FavoriteRewardCard userName="Toni" />
      </SnapSection>

      {data.vhcStatus === "unchecked" && (
        <SnapSection>
          <VHCStatusCard status={data.vhcStatus} />
        </SnapSection>
      )}

      <SnapSection>
        <VitalityRankCard
          genderRank={data.genderRank}
          generalRank={data.generalRank}
        />
      </SnapSection>

      <SnapSection>
        <CrowningCard type="rajin-gerak" />
      </SnapSection>
    </main>
  );
}
