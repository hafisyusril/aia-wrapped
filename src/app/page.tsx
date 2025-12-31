import FitnessChaserCard from "../components/FitnessChaserCard";
import GymVisitCard from "../components/GymVisitCard";
import HeartRateCard from "../components/heart-rates/HeartRateCard";
import IntroCard from "../components/IntroCard";
import VitalityRankCard from "../components/vitality-rank/VitalityRankCard";

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

      <section className="h-svh snap-start snap-always">
        <HeartRateCard />
      </section>

      <section className="h-svh snap-start snap-always">
        <GymVisitCard />
      </section>

      <section className="h-svh snap-start snap-always">
        <VitalityRankCard genderRank={180} generalRank={3500} />
      </section>
    </main>
  );
}
