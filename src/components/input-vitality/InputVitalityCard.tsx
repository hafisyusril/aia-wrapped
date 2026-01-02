"use client";

import { useState } from "react";
import { inputVitalityConfig } from "./inputVitalityConfig";
import { submitVitalityId } from "./inputVitalityUtils";

export default function InputVitalityCard() {
    const [vitalityId, setVitalityId] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!vitalityId.trim()) {
            setError("Vitality ID cannot be empty");
            return;
        }

        setError("");
        submitVitalityId(vitalityId);
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-100">
            <div className="relative h-175 w-97.5 rounded-2xl bg-white shadow-xl overflow-hidden">
                <div className="absolute inset-10 flex flex-col justify-center gap-8">
                    <div className="flex justify-start">
                        <img
                            src="/intro/aia-vitality-wrapped.svg"
                            alt="AIA Vitality Wrapped"
                            className="h-8 w-auto"
                        />
                    </div>

                    <div className="flex flex-col gap-2 text-left">
                        <h1 className="text-3xl font-extrabold leading-tight text-gray-900">
                            Your year with AIA Vitality
                        </h1>
                        <p className="text-sm leading-relaxed text-gray-600">
                            Take a look back at your year and see how your healthy habits added
                            up.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                        <label className="text-xs font-medium text-gray-500">Vitality ID</label>

                        <input
                            type="text"
                            value={vitalityId}
                            onChange={(e) => setVitalityId(e.target.value)}
                            placeholder={inputVitalityConfig.input.placeholder}
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
                            {inputVitalityConfig.button.label}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
