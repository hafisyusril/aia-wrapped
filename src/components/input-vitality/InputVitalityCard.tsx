"use client";

import { useState, ReactNode } from "react";

interface InputCardProps {
    title: string;
    description?: string;
    placeholder: string;
    buttonLabel: string;
    onSubmit: (value: string) => void;
    type?: string;
    icon?: ReactNode;
}

export default function InputCard({
    title,
    description,
    placeholder,
    buttonLabel,
    onSubmit,
    type = "text",
    icon,
}: InputCardProps) {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!value.trim()) {
            setError(`${title} cannot be empty`);
            return;
        }

        setError("");
        onSubmit(value);
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-100">
            <div className="relative h-175 w-97.5 rounded-2xl bg-white shadow-xl overflow-hidden">
                <div className="absolute inset-10 flex flex-col justify-center gap-8">
                    {icon && <div className="flex justify-start">{icon}</div>}

                    <div className="flex flex-col gap-2 text-left">
                        <h1 className="text-3xl font-extrabold leading-tight text-gray-900">{title}</h1>
                        {description && (
                            <p className="text-sm leading-relaxed text-gray-600">{description}</p>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                        <label className="text-xs font-medium text-gray-500">{title}</label>

                        <input
                            type={type}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder={placeholder}
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
                            {buttonLabel}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
