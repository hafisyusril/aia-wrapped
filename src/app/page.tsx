import VHCStatusCard from "../components/vhc/VHCStatusCard"
import FitnessChaserCard from "../components/FitnessChaserCard";
import GymVisitCard from "../components/GymVisitCard";
import HeartRateCard from "../components/heart-rates/HeartRateCard";
import IntroCard from "../components/IntroCard";
import CrowningCard from "../components/crowning/CrowningCard";
import VitalityRankCard from "../components/vitality-rank/VitalityRankCard";
import WeeklyChallengeCard from "../components/weekly-challenges/WeeklyChallengeCard";
import StepsCard from "../components/steps/StepsCard";
import InputVitalityCard from "../components/input-vitality/InputVitalityCard"
import FavoriteRewardCard from "../components/favorite-rewards/FavoriteRewardCard";

import { submitVitalityId } from "../components/input-vitality/inputVitalityUtils";


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
        <InputVitalityCard
          title="Your year with AIA Vitality"
          description="Take a look back at your year and see how your healthy habits added up."
          placeholder="Masukkan Vitality ID"
          buttonLabel="Lanjut"
          icon={<img src="/intro/aia-vitality-wrapped.svg" alt="AIA Vitality" className="h-8 w-auto" />}
          onSubmit={(value) => submitVitalityId(value)}
        />
      </section>
      <section className="h-svh snap-start snap-always">
        <IntroCard />
      </section>
      <section className="h-[100svh] snap-start snap-always">
        <VHCStatusCard status={"unchecked"} />
      </section>
      <section className="h-[100svh] snap-start snap-always">
        <VHCStatusCard status={"checked"} />
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
        <FitnessChaserCard />
      </section>
      <section className="h-svh snap-start snap-always">
        <WeeklyChallengeCard totalReward={3650000} />
      </section>
      <section className="h-svh snap-start snap-always">
        <FavoriteRewardCard userName="Toni" />
      </section>
      <section className="h-svh snap-start snap-always">
        <VitalityRankCard genderRank={180} generalRank={3500} />
      </section>
      <section className="h-svh snap-start snap-always">
        <CrowningCard type="warming-up" />
      </section>
      <section className="h-svh snap-start snap-always">
        <CrowningCard type="rajin-gerak" />
      </section>
      <section className="h-svh snap-start snap-always">
        <CrowningCard type="paling-atlet" />
      </section>
    </main>
  )
}
