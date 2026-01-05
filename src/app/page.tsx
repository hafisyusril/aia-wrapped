"use client";

import { useRef, useEffect } from "react";
import { useUserFlow } from "../contexts/UserFlowContext";

import SnapSection from "../components/SnapSection";
import InputVitalityCard from "../components/input-vitality/InputVitalityCard";
import IntroCard from "../components/IntroCard";
import VHCStatusCard from "../components/vhc/VHCStatusCard";
import StepsCard from "../components/steps/StepsCard";
import HeartRateCard from "../components/heart-rates/HeartRateCard";
import GymVisitCard from "../components/GymVisitCard";
import FitnessChaserCard from "../components/FitnessChaserCard";
import WeeklyChallengeCard from "../components/weekly-challenges/WeeklyChallengeCard";
import FavoriteRewardCard from "../components/favorite-rewards/FavoriteRewardCard";
import VitalityRankCard from "../components/vitality-rank/VitalityRankCard";
import CrowningCard from "../components/crowning/CrowningCard";

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
    genderRank: isDummyUser
      ? DUMMY_DATA.genderRank
      : userData?.genderRank ?? 0,
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

      <SnapSection>
        <VHCStatusCard status={data.vhcStatus} />
      </SnapSection>

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
