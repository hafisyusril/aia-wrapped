import { VHCStatusCard } from "../components/VHCStatusCard"
import GymVisitCard from "../components/GymVisitCard";
import WeeklyChallengeCard from "../components/FitnessChaserCard";

export default function Home() {
  const vhcCompleted = true; // ganti dari API / state

  return (
    <main
      className="
        h-[100svh]
        overflow-y-scroll
        snap-y
        snap-mandatory
      "
    >
      <section className="h-[100svh] snap-start snap-always">
        <GymVisitCard />
      </section>
      <section className="h-[100svh] snap-start snap-always">
        <GymVisitCard />
      </section>
      <section className="h-[100svh] snap-start snap-always">
        <VHCStatusCard status={vhcCompleted ? "checked" : "unchecked"} />
      </section>
      <section className="h-[100svh] snap-start snap-always">
        <WeeklyChallengeCard />
      </section>
      <section className="h-[100svh] snap-start snap-always">
        <WeeklyChallengeCard />
      </section>
    </main>
  )
}
