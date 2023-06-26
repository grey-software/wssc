"use client";
import HomeScreen from "@/components/HomeScreen/HomeScreen";
import Authentication from "@/components/Auth/Authentication";
import type { RootState } from "../global_state/store";
import { useSelector } from "react-redux";


export default function Home() {
  const { UserInfo }: any = useSelector((state: RootState) => state.users);
  return (
    <>
      {UserInfo?.phone ? (
        <>
          <HomeScreen />
        </>
      ) : (
        <div className={`${UserInfo?.phone && "grid-cols-3"}`}>
          <Authentication />
        </div>
      )}
    </>
  );
}
