interface WeeklyChallengeCardProps {
  totalReward: number;
}

export default function WeeklyChallengeCard({
  totalReward,
}: WeeklyChallengeCardProps) {
  return (
    <section className="w-full min-h-screen flex flex-col font-sans bg-[#FBEAD1]">
      {/* Header */}
      <div className="px-6 py-12 bg-[#F2B24C]">
        <div className="text-white">
          <p className="text-lg font-medium mb-2">Rp</p>
          <h1 className="text-5xl font-extrabold leading-tight">
            {totalReward.toLocaleString("id-ID")}
          </h1>
          <p className="mt-2 text-xl font-medium">
            rewards redeemed!
          </p>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between px-6 py-8">
        <p className="text-black text-lg font-medium leading-relaxed">
          Kamu berhasil buktiin
          <br />
          kalau hidup sehat
          <br />
          bisa bikin lebih hemat!
        </p>
        <div className="relative flex justify-center items-end mt-8">
          <img
            src="/weekly-challenge/person_illustration.svg"
            alt="Weekly Challenge Reward"
            className="w-[320px] h-auto"
          />
          <img
            src="/weekly-challenge/coin.svg"
            alt="Floating Coin"
            className="absolute -right-0 top-0 w-[90px] h-auto"
          />
        </div>
      </div>
    </section>
  );
}
