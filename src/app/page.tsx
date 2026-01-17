"use client";

import { useEffect, useRef } from "react";
import { useUserFlow } from "../contexts/UserFlowContext";
import { useBackgroundMusic } from "./hooks/useBackgroundMusic";
import { MusicProvider } from "../contexts/MusicContext";
import PageCaptureWrapper from "../components/PageCaptureWrapper";

import SnapSection from "../components/SnapSection";
import { logAudit } from "./utils/auditLogger"; // Import audit logger
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
import EndCard from "../components/end-card/EndCard";

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

const ENABLE_SNAP_ANIMATION = true;

export default function Home() {
  const { userData, isDummyUser, flowStep } = useUserFlow();
  const { play } = useBackgroundMusic("/music/aia-vitality.mp3", 0.35);

  const introRef = useRef<HTMLDivElement>(null);

  // @ts-ignore
  const { vitalityId } = useUserFlow();

  const handleSectionVisible = (sectionName: string) => {
    const id = vitalityId || localStorage.getItem("aia-vitality-id");
    if (id) {
      console.log(`[Audit] Viewing: ${sectionName} by ${id}`);
      logAudit(id, sectionName);
    }
  };

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
    sectionRefs.current[currentIndex - 1]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Tentukan Sections dengan Nama Halaman untuk Audit Log
  type SectionItem = { name: string; content: React.ReactNode };

  const sections: SectionItem[] = [
    { name: "Input ID", content: <InputVitalityCard /> },

    {
      name: "Intro",
      content: (
        <div ref={introRef}>
          <IntroCard />
        </div>
      ),
    },
    data.vhcStatus === "checked"
      ? {
        name: "VHC Status",
        content: (
          <PageCaptureWrapper fileName="vhc-status.png" pageName="VHC Status">
            {({ onShare }) => (
              <VHCStatusCard status={data.vhcStatus} onShare={onShare} />
            )}
          </PageCaptureWrapper>
        ),
      }
      : null,
    {
      name: "Steps",
      content: (
        <PageCaptureWrapper fileName="steps-card.png" pageName="Steps">
          {({ onShare }) => <StepsCard steps={data.steps} onShare={onShare} />}
        </PageCaptureWrapper>
      ),
    },
    {
      name: "Heart Rate",
      content: (
        <PageCaptureWrapper fileName="heart-rate-card.png" pageName="Heart Rate">
          {({ onShare }) => <HeartRateCard level={data.level} onShare={onShare} />}
        </PageCaptureWrapper>
      ),
    },
    {
      name: "Gym Visit",
      content: (
        <PageCaptureWrapper fileName="gym-visit-card.png" pageName="Gym Visit">
          {({ onShare }) => <GymVisitCard counter={data.gymVisit} onShare={onShare} />}
        </PageCaptureWrapper>
      ),
    },
    {
      name: "Fitness Chaser",
      content: (
        <PageCaptureWrapper fileName="fitness-chaser-card.png" pageName="Fitness Chaser">
          {({ onShare }) => (
            <FitnessChaserCard totalChallenges={data.weeklyChallenges} onShare={onShare} />
          )}
        </PageCaptureWrapper>
      ),
    },
    {
      name: "Weekly Challenge",
      content: (
        <PageCaptureWrapper fileName="weekly-challenge.png" pageName="Weekly Challenge">
          {({ onShare }) => (
            <WeeklyChallengeCard totalReward={data.totalReward} onShare={onShare} />
          )}
        </PageCaptureWrapper>
      ),
    },

    data.vhcStatus === "unchecked"
      ? {
        name: "VHC Status",
        content: (
          <PageCaptureWrapper fileName="vhc-status.png" pageName="VHC Status">
            {({ onShare }) => (
              <VHCStatusCard status={data.vhcStatus} onShare={onShare} />
            )}
          </PageCaptureWrapper>
        ),
      }
      : null,

    {
      name: "Vitality Rank",
      content: (
        <PageCaptureWrapper fileName="vitality-rank.png" pageName="Vitality Rank">
          {({ onShare }) => (
            <VitalityRankCard
              genderRank={data.genderRank}
              generalRank={data.generalRank}
              onShare={onShare}
            />
          )}
        </PageCaptureWrapper>
      ),
    },

    {
      name: "Crowning",
      content: (
        <PageCaptureWrapper fileName="crowning.png" pageName="Crowning">
          {({ onShare }) => (
            <CrowningCard
              type="athlete"
              onShare={onShare}
            />
          )}
        </PageCaptureWrapper>
      ),
    },

    {
      name: "End Card",
      content: <EndCard />,
    },
  ].filter(Boolean) as SectionItem[];

  const displayedSections = (userData || isDummyUser) ? sections : [sections[0]];

  return (
    <MusicProvider playMusic={play}>
      <main className="h-svh overflow-y-scroll snap-y snap-mandatory relative">
        {displayedSections.map((section, idx) => {
          const disableScroll =
            idx === 0 || idx === 1 || idx === displayedSections.length - 1;

          return (
            <SnapSection
              key={idx}
              enableAnimation={ENABLE_SNAP_ANIMATION}
              innerRef={(el) => {
                sectionRefs.current[idx] = el!;
              }}
              showScrollUp={!disableScroll}
              onScrollUp={() => scrollPrev(idx)}
              onVisible={() => handleSectionVisible(section.name)}
            >
              {section.content}
            </SnapSection>
          );
        })}
      </main>
    </MusicProvider>

  );
}
