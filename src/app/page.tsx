"use client";

import { useEffect, useRef } from "react";
import { useUserFlow } from "../contexts/UserFlowContext";

import SnapSection from "../components/SnapSection";
import InputVitalityCard from "../components/input-vitality/InputVitalityCard";
import IntroCard from "../components/IntroCard";
import StepsCard from "../components/steps/StepsCard";
import HeartRateCard from "../components/heart-rates/HeartRateCard";
import GymVisitCard from "../components/gym-visit/GymVisitCard";
import FitnessChaserCard from "../components/fitness-chaser/FitnessChaserCard";
import WeeklyChallengeCard from "../components/weekly-challenges/WeeklyChallengeCard";
import VitalityRankCard from "../components/vitality-rank/VitalityRankCard";
import VHCStatusCard from "../components/vhc/VHCStatusCard";
import CrowningCard from "../components/crowning/CrowningCard";

const DUMMY_DATA = {
  steps: 3_022_500,
  level: "moderate" as const,
  gymVisit: 20,
  weeklyChallenges: 20,
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
    level: isDummyUser ? DUMMY_DATA.level : userData?.level ?? "light",
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

  const sectionRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (flowStep === "intro") {
      introRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [flowStep]);

  const scrollPrev = (currentIndex: number) => {
    if (currentIndex <= 0) return;
    sectionRefs.current[currentIndex - 1]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const sections: { content: React.ReactNode }[] = [
    { content: <InputVitalityCard /> },
    { content: <div ref={introRef}><IntroCard /></div> },
    data.vhcStatus === "checked" ? { content: <VHCStatusCard status={data.vhcStatus} /> } : null,
    { content: <StepsCard steps={data.steps} /> },
    { content: <HeartRateCard level={data.level} /> },
    { content: <GymVisitCard counter={data.gymVisit} /> },
    { content: <FitnessChaserCard totalChallenges={data.weeklyChallenges} /> },
    { content: <WeeklyChallengeCard totalReward={data.totalReward} /> },
    data.vhcStatus === "unchecked" ? { content: <VHCStatusCard status={data.vhcStatus} /> } : null,
    { content: <VitalityRankCard genderRank={data.genderRank} generalRank={data.generalRank} /> },
    { content: <CrowningCard type="starter" /> },
  ].filter(Boolean) as { content: React.ReactNode }[];

  return (
    <main className="h-svh overflow-y-scroll snap-y snap-mandatory relative">
      {sections.map((section, idx) => {
        const disableScroll = idx === 0 || idx === 1 || idx === sections.length - 1;

        return (
          <SnapSection
            key={idx}
            innerRef={(el) => {
              sectionRefs.current[idx] = el!;
            }}
            showScrollUp={!disableScroll}
            onScrollUp={() => scrollPrev(idx)}
          >
            {section.content}
          </SnapSection>
        );
      })}
    </main>
  );
}
