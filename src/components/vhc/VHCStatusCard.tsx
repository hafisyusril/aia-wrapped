import Image from "next/image";

type VHCStatus = "checked" | "unchecked";

interface VHCStatusCardProps {
    status: VHCStatus;
}

export default function VHCStatusCard({ status }: VHCStatusCardProps) {
    const isChecked = status === "checked";

    return (
        <section
            className={`w-full min-h-screen flex flex-col font-sans ${isChecked ? "bg-pink-300" : "bg-gray-600"
                }`}
        >
            <div
                className={`px-6 py-12 ${isChecked ? "bg-red-600" : "bg-gray-800"
                    }`}
            >
                <h1 className="text-white text-4xl font-extrabold leading-tight">
                    Health
                    <br />
                    {isChecked ? "in Check" : "Unchecked"}
                </h1>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center px-6 text-start gap-6">
                <Image
                    src={
                        isChecked
                            ? "/vhc/checked.svg"
                            : "/vhc/unchecked.svg"
                    }
                    alt="VHC Illustration"
                    width={220}
                    height={220}
                    priority
                />

                {isChecked ? (
                    <p className="text-black text-lg font-medium">
                        You completed
                        <br />
                        your Vitality Health Check.
                        <br />
                        <span className="font-bold">Great job!</span>
                    </p>
                ) : (
                    <p className="text-white text-lg font-medium">
                        You haven’t completed
                        <br />
                        your Vitality Health Check.
                        <br />
                        <span className="font-bold">
                            Let’s do it in 2026!
                        </span>
                    </p>
                )}
            </div>
        </section>
    );
}
