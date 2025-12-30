import GymVisitCard from "../components/GymVisitCard";
import WeeklyChallengeCard from "../components/FitnessChaserCard";

export default function Home() {
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
        <WeeklyChallengeCard />
      </section>
      <section className="h-[100svh] snap-start snap-always">
        <WeeklyChallengeCard />
      </section>
    </main>
  );
}
