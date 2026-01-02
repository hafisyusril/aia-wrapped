import VHCStatusCard from "../components/vhc/VHCStatusCard"
import FitnessChaserCard from "../components/FitnessChaserCard";
import GymVisitCard from "../components/GymVisitCard";
import HeartRateCard from "../components/heart-rates/HeartRateCard";
import IntroCard from "../components/IntroCard";
import CrowningCard from "../components/crowning/CrowningCard";
import VitalityRankCard from "../components/vitality-rank/VitalityRankCard";
import WeeklyChallengeCard from "../components/weekly-challenges/WeeklyChallengeCard";
import StepsCard from "../components/steps/StepsCard";

export default function Home() {
  return (
    <main
      className="
        h-svh
        overflow-y-scroll
        snap-y
        snap-mandatory
      "
    >
      <section className="h-svh snap-start snap-always">
        <IntroCard />
      </section>

      <section className="h-svh snap-start snap-always">
        <FitnessChaserCard />
      </section>
      <section className="h-[100svh] snap-start snap-always">
        <VHCStatusCard status={"checked"} />
      </section>
      <section className="h-[100svh] snap-start snap-always">
        <VHCStatusCard status={"unchecked"} />
      </section>
      <section className="h-svh snap-start snap-always">
        <StepsCard />
      </section>

      <section className="h-svh snap-start snap-always">
        <HeartRateCard />
      </section>

      <section className="h-svh snap-start snap-always">
        <GymVisitCard />
      </section>

      <section className="h-svh snap-start snap-always">
        <CrowningCard type="warming-up" />
      </section>

      <section className="h-svh snap-start snap-always">
        <CrowningCard type="rajin-gerak" />
      </section>

      <section className="h-svh snap-start snap-always">
        <CrowningCard type="paling-atlet" />
        <WeeklyChallengeCard totalReward={3650000} />
      </section>

      <section className="h-svh snap-start snap-always">
        <VitalityRankCard genderRank={180} generalRank={3500} />
      </section>
    </main>
  )
}
