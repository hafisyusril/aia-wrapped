"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";

import { useUserFlow } from "../contexts/UserFlowContext";
import { useBackgroundMusic } from "./hooks/useBackgroundMusic";
import { MusicProvider } from "../contexts/MusicContext";
import PageCaptureWrapper from "../components/PageCaptureWrapper";
import SnapSection, { ScrollDirection } from "../components/SnapSection";
import { logAudit } from "./utils/auditLogger";
import { decodeVitalityId } from "./utils/vitalityUrl";

import InputVitalityCard from "../components/input-vitality/InputVitalityCard";
import IntroCard from "../components/IntroCard";
import RewardInfoCard from "../components/reward-info/RewardInfoCard";
import StepsCard from "../components/steps/StepsCard";
import HeartRateCard from "../components/heart-rates/HeartRateCard";
import GymVisitCard from "../components/gym-visit/GymVisitCard";
import FitnessChaserCard from "../components/fitness-chaser/FitnessChaserCard";
import WeeklyChallengeCard from "../components/weekly-challenges/WeeklyChallengeCard";
import VitalityRankCard from "../components/vitality-rank/VitalityRankCard";
import VHCStatusCard from "../components/vhc/VHCStatusCard";
import CrowningCard from "../components/crowning/CrowningCard";
import EndCard from "../components/end-card/EndCard";
import { addCookie, getCookie } from "./utils/cookie";

const DUMMY_DATA = {
  steps: 3_022_500,
  level: "moderate" as const,
  gymVisit: 20,
  weeklyChallenges: 20,
  totalReward: 1_300_000,
  generalRank: 1450,
  genderRank: 673,
  vhcStatus: "unchecked" as const,
  crowning: "starter" as const,
};

const ENABLE_SNAP_ANIMATION = true;

type SectionItem = {
  name: string;
  content: React.ReactNode;
  scrollHint?: ScrollDirection | "none";
  onScroll?: (index: number) => void;
};

export default function Home() {
  const { userData, isDummyUser, flowStep, vitalityId, setVitalityId } =
    useUserFlow();

  const params = useParams();
  const encodedId = params?.slug as string | undefined;

  const { play, stop } = useBackgroundMusic("/music/aia-vitality.m4a", 0.35);

  const containerRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<HTMLDivElement[]>([]);

  const data = {
    steps: isDummyUser ? DUMMY_DATA.steps : (userData?.steps ?? 0),
    level: isDummyUser ? DUMMY_DATA.level : (userData?.level ?? "light"),
    gymVisit: isDummyUser ? DUMMY_DATA.gymVisit : (userData?.gymVisit ?? 0),
    weeklyChallenges: isDummyUser
      ? DUMMY_DATA.weeklyChallenges
      : (userData?.weeklyChallenges ?? 0),
    totalReward: isDummyUser
      ? DUMMY_DATA.totalReward
      : (userData?.totalReward ?? 0),
    generalRank: isDummyUser
      ? DUMMY_DATA.generalRank
      : (userData?.generalRank ?? 0),
    genderRank: isDummyUser
      ? DUMMY_DATA.genderRank
      : (userData?.genderRank ?? 0),
    vhcStatus: isDummyUser
      ? DUMMY_DATA.vhcStatus
      : (userData?.vhcStatus ?? "unchecked"),
    crowning: isDummyUser
      ? DUMMY_DATA.crowning
      : (userData?.crowning ?? "starter"),
  };

  const resolvedActivities = isDummyUser
    ? {
        steps: true,
        heartRate: true,
        gymVisit: true,
        weeklyChallenge: true,
        vhc: true,
        rank: true,
      }
    : userData?.activities;

  useEffect(() => {
    if (!encodedId) return;
    const decoded = decodeVitalityId(encodedId);
    if (!decoded) return;
    setVitalityId(decoded);
    addCookie("aia-vitality-id", decoded, 15);
  }, [encodedId, setVitalityId]);

  useEffect(() => {
    if (flowStep === "intro") {
      introRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [flowStep]);

  const isLocked = !vitalityId && flowStep === "input";

  if (isLocked) {
    return (
      <MusicProvider playMusic={play}>
        <main className="h-svh overflow-hidden flex items-center justify-center">
          <InputVitalityCard />
        </main>
      </MusicProvider>
    );
  }

  const handleSectionVisible = (sectionName: string) => {
    const id = vitalityId || getCookie("aia-vitality-id");
    if (id) logAudit(id, sectionName);
  };

  const scrollPrev = (currentIndex: number) => {
    if (currentIndex <= 0) return;
    sectionRefs.current[currentIndex - 1]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const sections: SectionItem[] = [
    {
      name: "Intro",
      content: (
        <div ref={introRef}>
          <IntroCard containerRef={containerRef} />
        </div>
      ),
    },

    {
      name: "Reward Info",
      content: <RewardInfoCard containerRef={containerRef} />,
    },

    resolvedActivities?.vhc &&
      data.vhcStatus === "checked" && {
        name: "VHC Status Completed",
        content: (
          <PageCaptureWrapper
            fileName="vhc-status.png"
            pageName="VHC Status Completed"
          >
            {({ onShare, isReady }) => (
              <VHCStatusCard status="checked" onShare={onShare} isReady={isReady} />
            )}
          </PageCaptureWrapper>
        ),
      },

    resolvedActivities?.steps && {
      name: "Steps turtle",
      content: (
        <PageCaptureWrapper fileName="steps-card.png" pageName="Steps turtle">
          {({ onShare, isReady }) => <StepsCard steps={data.steps} onShare={onShare} isReady={isReady} />}
        </PageCaptureWrapper>
      ),
    },

    resolvedActivities?.heartRate && {
      name: "Heart Rate",
      content: (
        <PageCaptureWrapper
          fileName="heart-rate-card.png"
          pageName="Heart Rate"
        >
          {({ pageName, onShare, isReady }) => (
            <HeartRateCard
              containerRef={containerRef}
              level={data.level}
              pageName={pageName}
              onShare={onShare}
              isReady={isReady}
            />
          )}
        </PageCaptureWrapper>
      ),
    },

    resolvedActivities?.gymVisit && {
      name: "Gym Visit",
      content: (
        <PageCaptureWrapper fileName="gym-visit-card.png" pageName="Gym Visit">
          {({ onShare, isReady }) => (
            <GymVisitCard counter={data.gymVisit} onShare={onShare} isReady={isReady} />
          )}
        </PageCaptureWrapper>
      ),
    },

    resolvedActivities?.weeklyChallenge && {
      name: "Fitness Chaser",
      content: (
        <PageCaptureWrapper
          fileName="fitness-chaser-card.png"
          pageName="Fitness Chaser"
        >
          {({ onShare, isReady }) => (
            <FitnessChaserCard
              totalChallenges={data.weeklyChallenges}
              onShare={onShare}
              isReady={isReady}
            />
          )}
        </PageCaptureWrapper>
      ),
    },

    resolvedActivities?.weeklyChallenge && {
      name: "Weekly Challenge",
      content: (
        <PageCaptureWrapper
          fileName="weekly-challenge.png"
          pageName="Weekly Challenge"
        >
          {({ pageName, onShare, isReady }) => (
            <WeeklyChallengeCard
              totalReward={data.totalReward}
              vitalityId={vitalityId!}
              pageName={pageName}
              onShare={onShare}
              isReady={isReady}
            />
          )}
        </PageCaptureWrapper>
      ),
    },

    resolvedActivities?.rank && {
      name: "Vitality Rank",
      content: (
        <PageCaptureWrapper
          fileName="vitality-rank.png"
          pageName="Vitality Rank"
          isBrightText
        >
          {({ onShare, isReady }) => (
            <VitalityRankCard
              genderRank={data.genderRank}
              generalRank={data.generalRank}
              onShare={onShare}
              isReady={isReady}
            />
          )}
        </PageCaptureWrapper>
      ),
    },

    resolvedActivities?.vhc &&
      data.vhcStatus === "unchecked" && {
        name: "VHC Status Not Completed",
        content: (
          <PageCaptureWrapper
            fileName="vhc-status.png"
            pageName="VHC Status Not Completed"
            isBrightText
          >
            {({ onShare, isReady }) => (
              <VHCStatusCard status="unchecked" onShare={onShare} isReady={isReady} />
            )}
          </PageCaptureWrapper>
        ),
      },

    {
      name: "Crowning",
      content: (
        <PageCaptureWrapper
          fileName="crowning.png"
          pageName="Crowning"
          disableWatermarkLogo
        >
          {({ pageName, onShare, isReady }) => (
            <CrowningCard
              type={data.crowning}
              containerRef={containerRef}
              onShare={onShare}
              pageName={pageName}
              isReady={isReady}
            />
          )}
        </PageCaptureWrapper>
      ),
    },

    {
      name: "End Card",
      content: <EndCard />,
      scrollHint: "down",
      onScroll: () => {
        introRef.current?.scrollIntoView({ behavior: "smooth" });
      },
    },
  ].filter(Boolean) as SectionItem[];

  return (
    <MusicProvider playMusic={play}>
      <main
        ref={containerRef}
        className="h-svh overflow-y-scroll snap-y snap-mandatory relative"
      >
        {sections.map((section, idx) => {
          const showScrollUp = section.scrollHint !== "none";

          return (
            <SnapSection
              key={section.name}
              enableAnimation={ENABLE_SNAP_ANIMATION}
              innerRef={(el) => {
                if (el) sectionRefs.current[idx] = el;
              }}
              showScrollUp={showScrollUp}
              scrollDirection={section.scrollHint === "down" ? "down" : "up"}
              onScrollUp={
                section.onScroll
                  ? () => section.onScroll!(idx)
                  : () => scrollPrev(idx)
              }
              onVisible={() => handleSectionVisible(section.name)}
              persistScrollHint={section.name === "Intro"}
            >
              {section.content}
            </SnapSection>
          );
        })}
      </main>
    </MusicProvider>
  );
}
