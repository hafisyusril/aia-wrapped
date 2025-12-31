import FitnessChaserCard from "../components/FitnessChaserCard";
import GymVisitCard from "../components/GymVisitCard";
import HeartRateCard from "../components/heart-rates/HeartRateCard";
import IntroCard from "../components/IntroCard";
import CrowningCard from "../components/crowning/CrowningCard";

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
        <CrowningCard type="warming-up" />
      </section>

      <section className="h-svh snap-start snap-always">
        <CrowningCard type="rajin-gerak" />
      </section>

      <section className="h-svh snap-start snap-always">
        <CrowningCard type="paling-atlet" />
      </section>
    </main>
  );
}
