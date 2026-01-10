"use client";

import { useState } from "react";
import { useUserFlow } from "../../contexts/UserFlowContext";

export default function InputVitalityCard() {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const { setVitalityId } = useUserFlow();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!value.trim()) {
            setError("Your year with AIA Vitality cannot be empty");
            return;
        }
        setError("");
        setVitalityId(value);
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-100">
            <div className="relative h-175 w-97.5 rounded-2xl bg-white shadow-xl overflow-hidden">
                <div className="absolute inset-10 flex flex-col justify-evenly gap-8">
                    <div className="flex justify-center">
                        <img
                            src="/intro/aia-vitality-wrapped.svg"
                            alt="AIA Vitality"
                            className="h-14 w-auto"
                        />
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Enter your Vitality ID"
                            className={`
                                h-12 rounded-xl border px-4 text-sm
                                focus:outline-none focus:ring-2 focus:ring-red-500
                                ${error ? "border-red-500" : "border-gray-300"}
                            `}
                        />
                        {error && <p className="text-xs text-red-500">{error}</p>}
                        <button
                            type="submit"
                            className="
                                mt-2 h-12 rounded-xl
                                bg-red-600 text-white font-semibold
                                active:scale-[0.98]
                                transition
                            "
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
