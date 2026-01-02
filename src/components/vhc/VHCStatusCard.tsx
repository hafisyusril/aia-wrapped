import Image from "next/image";
import { VHCStatus } from "./vhcStatusConfig";
import { getVHCStatusContent } from "./vhcStatusUtils";

interface VHCStatusCardProps {
    status: VHCStatus;
}

export default function VHCStatusCard({ status }: VHCStatusCardProps) {
    const {
        title,
        background,
        headerBackground,
        illustrationSrc,
        textColor,
        message,
    } = getVHCStatusContent(status);

    const [titleLine1, titleLine2] = title.split("\n");

    return (
        <section
            className={`w-full min-h-screen flex flex-col font-sans ${background}`}
        >
            <div className={`px-6 py-12 ${headerBackground}`}>
                <h1 className="text-white text-4xl font-extrabold leading-tight">
                    {titleLine1}
                    <br />
                    {titleLine2}
                </h1>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center px-6 text-start gap-6">
                <Image
                    src={illustrationSrc}
                    alt="VHC Illustration"
                    width={220}
                    height={220}
                    priority
                />

                <p className={`${textColor} text-lg font-medium`}>
                    {message.split("\n").map((line, index) => (
                        <span key={index}>
                            {line}
                            <br />
                        </span>
                    ))}
                </p>
            </div>
        </section>
    );
}
