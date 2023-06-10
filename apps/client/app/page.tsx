"use client";
import HomeScreen from "@/components/HomeScreen/HomeScreen";
import { Inter } from "next/font/google";
import Authentication from "@/components/Auth/Authentication";
import type { RootState } from "../global_state/store";
import { useSelector } from "react-redux";
import DesktopMenu from "@/components/DesktopMenu";

export default function Home() {
  const { UserInfo }: any = useSelector((state: RootState) => state.users);
  return (
    <>
      {UserInfo?.phone ? (
        <>
          <HomeScreen />
        </>
      ) : (
        <Authentication />
      )}
    </>
  );
}
