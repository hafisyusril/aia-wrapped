"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface UserData {
    vhcStatus: "checked" | "unchecked"
    steps: number;
    bpm: number;
    gymVisit: number;
    weeklyChallenges: number;
    totalReward: number;
    generalRank: number;
    genderRank: number;
}

interface UserFlowContextProps {
    isDummyUser: boolean;
    userData: UserData | null;
    setVitalityId: (id: string) => void;
}

const UserFlowContext = createContext<UserFlowContextProps | undefined>(undefined);

export function UserFlowProvider({ children }: { children: ReactNode }) {
    const [isDummyUser, setIsDummyUser] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);

    function setVitalityId(id: string) {
        if (id === "dummyToni") {
            setIsDummyUser(true);
            setUserData({
                vhcStatus: "unchecked",
                steps: 3_022_500,
                bpm: 120,
                gymVisit: 0,
                weeklyChallenges: 26,
                totalReward: 1_300_000,
                generalRank: 1450,
                genderRank: 673,
            });
        } else {
            setIsDummyUser(false);
            setUserData(null);
        }
    }

    return (
        <UserFlowContext.Provider value={{ isDummyUser, userData, setVitalityId }}>
            {children}
        </UserFlowContext.Provider>
    );
}

export function useUserFlow() {
    const context = useContext(UserFlowContext);
    if (!context) {
        throw new Error("useUserFlow must be used within a UserFlowProvider");
    }
    return context;
}
