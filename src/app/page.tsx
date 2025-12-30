import GymVisitCard from "../components/GymVisitCard";
import WeeklyChallengeCard from "../components/FitnessChaserCard";
import IntroCard from "../components/IntroCard";

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
        <GymVisitCard />
      </section>
      

      <section className="h-svh snap-start snap-always">
        <WeeklyChallengeCard />
      </section>
     
    </main>
  );
}
