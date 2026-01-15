"use client";

import { useEffect, useRef } from "react";
import { useUserFlow } from "../contexts/UserFlowContext";
import { useBackgroundMusic } from "./hooks/useBackgroundMusic";
import { MusicProvider } from "../contexts/MusicContext";
import PageCaptureWrapper from "../components/PageCaptureWrapper";

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

  const sections: { content: React.ReactNode }[] = [
    { content: <InputVitalityCard /> },

    {
      content: (
        <div ref={introRef}>
          <IntroCard />
        </div>
      ),
    },
    {
      content: (
        <PageCaptureWrapper fileName="steps-card.png">
          {({ onShare }) => <StepsCard steps={data.steps} onShare={onShare} />}
        </PageCaptureWrapper>
      ),
    },
    {
      content: (
        <PageCaptureWrapper fileName="heart-rate-card.png">
          {({ onShare }) => <HeartRateCard level={data.level} onShare={onShare} />}
        </PageCaptureWrapper>
      ),
    },
    {
      content: (
        <PageCaptureWrapper fileName="gym-visit-card.png">
          {({ onShare }) => <GymVisitCard counter={data.gymVisit} onShare={onShare} />}
        </PageCaptureWrapper>
      ),
    },
    {
      content: (
        <PageCaptureWrapper fileName="fitness-chaser-card.png">
          {({ onShare }) => (
            <FitnessChaserCard totalChallenges={data.weeklyChallenges} onShare={onShare} />
          )}
        </PageCaptureWrapper>
      ),
    },
    {
      content: (
        <PageCaptureWrapper fileName="weekly-challenge.png">
          {({ onShare }) => (
            <WeeklyChallengeCard totalReward={data.totalReward} onShare={onShare} />
          )}
        </PageCaptureWrapper>
      ),
    },

    data.vhcStatus === "unchecked"
      ? {
        content: (
          <PageCaptureWrapper fileName="vhc-status.png">
            {({ onShare }) => (
              <VHCStatusCard
                status={data.vhcStatus}
                onShare={onShare}
              />
            )}
          </PageCaptureWrapper>
        ),
      }
      : null,

    {
      content: (
        <PageCaptureWrapper fileName="vitality-rank.png">
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
      content: (
        <PageCaptureWrapper fileName="crowning.png">
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
      content: <EndCard />,
    },
  ].filter(Boolean) as { content: React.ReactNode }[];



  return (
    <MusicProvider playMusic={play}>
      <main className="h-svh overflow-y-scroll snap-y snap-mandatory relative">
        {sections.map((section, idx) => {
          const disableScroll =
            idx === 0 || idx === 1 || idx === sections.length - 1;

          return (
            <SnapSection
              key={idx}
              enableAnimation={ENABLE_SNAP_ANIMATION}
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
    </MusicProvider>

  );
}
