type CrowningType = 'warming-up' | 'rajin-gerak' | 'paling-atlet';

interface CrowningCardProps {
    type: CrowningType;
}

export default function CrowningCard({ type }: CrowningCardProps) {
    let titleLine1: string = '';
    let titleLine2: string = '';
    let description: string = '';
    let themeColor: string = '';
    let illustrationSrc: string = '';

    switch (type) {
        case 'warming-up':
            titleLine1 = 'Si Baru';
            titleLine2 = 'Warming-Up';
            description = 'Part paling pentingnya: kamu udah mulai olahraga. Kalau udah nemu ritemnya, pasti makin semangat hidup sehat!';
            themeColor = 'text-[#00AEEF]';
            illustrationSrc = '/crowning/yoga_radio.svg';
            break;
        case 'rajin-gerak':
            titleLine1 = 'Si Rajin';
            titleLine2 = 'Gerak';
            description = 'Kamu jago jaga ritem, udah konsisten olahraga, tinggal tingkatin intensitas dan rutin finish Weekly Challenge-nya!';
            themeColor = 'text-[#FF7F00]';
            illustrationSrc = '/crowning/treadmill_run.svg';
            break;
        case 'paling-atlet':
            titleLine1 = 'Si Paling';
            titleLine2 = 'Atlet';
            description = 'Kamu totalitas 110% buat hidup sehat, rata-rata aktivitas olahraga kamu di zona intens. Bener-bener push to the max!';
            themeColor = 'text-[#E60000]';
            illustrationSrc = '/crowning/barbel.svg';
            break;
    }

    return (
        <div className="w-full min-h-screen bg-white font-sans flex flex-col">
            <div className="px-6 pt-8 pb-4 bg-gray-100">
                <img
                    src="/crowning/aia_vitality.svg"
                    alt="AIA Vitality Wrapped"
                    width={60}
                    height={60}
                    className="object-contain w-20 sm:w-40 md:w-48"

                />
            </div>
            <div className="relative flex-1 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                    src={illustrationSrc}
                    alt={`${titleLine1} ${titleLine2}`}
                    width={400}
                    height={400}
                    className="object-contain z-10 drop-shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg px-8"
                />
                <div className="absolute bottom-20 left-0 right-0 h-24 sm:h-32 md:h-40">
                    <div
                        className="absolute bottom-0 w-full h-40 bg-white"
                        style={{
                            borderRadius: '100% / 40% 40% 0 0',
                            transform: 'translateY(50%)',
                        }}
                    />
                </div>
            </div>
            <div className="px-6 sm:px-8 pt-10 pb-12">
                <p className="text-sm sm:text-base text-gray-600 mb-4">Your Vitality Type</p>

                <h1 className={`text-5xl sm:text-6xl md:text-7xl font-bold ${themeColor} leading-none`}>
                    {titleLine1}<br />
                    {titleLine2}
                </h1>

                <p className="mt-8 text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                    {description}
                </p>
            </div>
            <div className="px-6 sm:px-8 pb-10 border-t border-gray-200 pt-6">
                <p className="text-xs sm:text-sm text-gray-500">aia-financial.co.id</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                    PT AIA Financial berizin dan diawasi oleh Otoritas Jasa Keuangan
                </p>
            </div>
        </div>
    );
};