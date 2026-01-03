"use client";

import { useEffect, useState } from "react";
import MobileCardFrame from "./MobileCardFrame";

interface GymVisitCardProps {
  counter: number;
}

export default function GymVisitCard({ counter }: GymVisitCardProps) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [background, setBackground] = useState("");

  useEffect(() => {
    if (counter <= 50) {
      setTitle("Routines <br /> Starter");
      setMessage("Nice Start!");
      setBackground("linear-gradient(to bottom, #9393f9 35%, #d7f5ff 35%)");
    } else if (counter <= 150) {
      setTitle("Regular <br /> Powerlifter");
      setMessage("Your habit <br /> is solid!");
      setBackground(
        "linear-gradient(to bottom, rgba(113,113,226,1) 35%, rgba(178,232,247,1) 35%)"
      );
    } else if (counter <= 250) {
      setTitle("Strong <br /> Habit Builder");
      setMessage("Love the <br /> discipline!");
      setBackground(
        "linear-gradient(to bottom, rgba(70,70,204,1) 35%, rgba(108,220,239,1) 35%)"
      );
    } else {
      setTitle("Gym <br /> Crusher");
      setMessage("You're <br /> unstoppable!");
      setBackground(
        "linear-gradient(to bottom, rgba(41,41,155,1) 35%, rgba(23,209,229,1) 35%)"
      );
    }
  }, [counter]);

  return (
    <MobileCardFrame
      background={background}
      ornaments={
        <div className="absolute inset-0 z-0">
          <img
            src="/gym-visit/triangle.svg"
            className="absolute top-0 left-0 w-full h-[50%] object-cover opacity-50"
            alt=""
          />
          <img
            src="/gym-visit/triangle.svg"
            className="absolute bottom-0 left-0 w-full h-[50%] object-cover opacity-50"
            alt=""
          />
        </div>
      }
      illustration={
        <img
          src="/gym-visit/gym-visit-deadlift.svg"
          className="absolute bottom-10 right-0 w-62.5 h-75 z-10"
          alt=""
        />
      }
      topContent={
        <h1
          className="text-white text-[50px] font-bold leading-none"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      }
      bottomContent={
        <>
          <p className="text-[20px] text-black">You went to gym partner</p>
          <h2 className="text-[50px] text-black font-bold leading-none">{counter}</h2>
          <p className="text-[20px] font-medium text-black">times</p>
          <p
            className="mt-7.5 text-[15px] text-black"
            dangerouslySetInnerHTML={{ __html: message }}
          />
        </>
      }
    />
  );
}
