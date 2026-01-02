import VHCStatusCard from "../components/vhc/VHCStatusCard"
import FitnessChaserCard from "../components/FitnessChaserCard";
import GymVisitCard from "../components/GymVisitCard";
import HeartRateCard from "../components/heart-rates/HeartRateCard";
import IntroCard from "../components/IntroCard";
import StepsCard from "../components/steps/StepsCard";

export default function Home() {
  const vhcCompleted = true; // ganti dari API / state

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
        <VHCStatusCard status={vhcCompleted ? "checked" : "unchecked"} />
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
    </main>
  )
}
