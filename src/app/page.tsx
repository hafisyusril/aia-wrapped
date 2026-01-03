"use client";

import { useUserFlow } from "../contexts/UserFlowContext";

import VHCStatusCard from "../components/vhc/VHCStatusCard";
import FitnessChaserCard from "../components/FitnessChaserCard";
import GymVisitCard from "../components/GymVisitCard";
import HeartRateCard from "../components/heart-rates/HeartRateCard";
import IntroCard from "../components/IntroCard";
import CrowningCard from "../components/crowning/CrowningCard";
import VitalityRankCard from "../components/vitality-rank/VitalityRankCard";
import WeeklyChallengeCard from "../components/weekly-challenges/WeeklyChallengeCard";
import StepsCard from "../components/steps/StepsCard";
import InputVitalityCard from "../components/input-vitality/InputVitalityCard";
import FavoriteRewardCard from "../components/favorite-rewards/FavoriteRewardCard";
import SnapSection from "../components/SnapSection";

export default function Home() {
  const { userData, isDummyUser } = useUserFlow();

  const steps = isDummyUser ? 3_022_500 : userData?.steps ?? 0;
  const bpm = isDummyUser ? 120 : userData?.bpm ?? 10;
  const gymVisit = isDummyUser ? 0 : userData?.gymVisit ?? 0;
  const weeklyChallenges = isDummyUser ? 26 : userData?.weeklyChallenges ?? 0;
  const totalReward = isDummyUser ? 1_300_000 : userData?.totalReward ?? 0;
  const generalRank = isDummyUser ? 1450 : userData?.generalRank ?? 0;
  const genderRank = isDummyUser ? 673 : userData?.genderRank ?? 0;
  const vhcStatus = isDummyUser
    ? "unchecked"
    : userData?.vhcStatus ?? "unchecked";

  return (
    <main
      className="
        h-svh
        overflow-y-scroll
        snap-y
        snap-mandatory
      "
    >
      <SnapSection>
        <InputVitalityCard />
      </SnapSection>

      <SnapSection>
        <IntroCard />
      </SnapSection>

      <SnapSection>
        <VHCStatusCard status={vhcStatus} />
      </SnapSection>

      <SnapSection>
        <StepsCard steps={steps} />
      </SnapSection>

      <SnapSection>
        <HeartRateCard bpm={bpm} />
      </SnapSection>

      <SnapSection>
        <GymVisitCard counter={gymVisit} />
      </SnapSection>

      <SnapSection>
        <FitnessChaserCard totalChallenges={weeklyChallenges} />
      </SnapSection>

      <SnapSection>
        <WeeklyChallengeCard totalReward={totalReward} />
      </SnapSection>

      <SnapSection>
        <FavoriteRewardCard userName="Toni" />
      </SnapSection>

      <SnapSection>
        <VitalityRankCard genderRank={genderRank} generalRank={generalRank} />
      </SnapSection>

      <SnapSection>
        <CrowningCard type="rajin-gerak" />
      </SnapSection>
    </main>
  );
}
