"use client";
import HomeScreen from "@/components/HomeScreen";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "./GlobalState/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CardsPage from "@/components/MainPage/CardsPage";
import ChartSection from "@/components/MainPage/ChartSection";

export default function Home() {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { WSSC_CODE }: any = useSelector(
    (state: RootState) => state.User.SignInData
  );

  useEffect(() => {
    if (!WSSC_CODE) {
      navigate.push("/auth");
      // dispatch(setActiveTab(0));
    }
  }, []);

  return (
    <>
      <div className="container w-full h-auto overflow-x-hidden">
        {/* card section */}
        <CardsPage />
        <ChartSection/>
      </div>
    </>
  );
}
