"use client";
import Form from "@/app/complaint/[complaint]/page";
import HomeScreen from "@/components/HomeScreen/HomeScreen";
import Header from "@/components/Header";
import Timeline from "@/app/complaint/timeline/[status]/page";
import { Inter } from "next/font/google";
// import Authentication from "@/components/auth/Authentication";
import Complaints from "@/app/complaint/page";
import Loading from "./loading";
import ProfileCard from "@/components/ProfileCard";
import ShareApp from "@/components/ShareApp";
import Authentication from "@/components/Auth/Authentication";
import type { RootState } from "../Redux-toolkit/store";
import { useSelector } from "react-redux";
import RootLayout from "./layout";
import type { user } from "../Redux-toolkit/UserSlice";

export default function Home() {
  const { phone }: user = useSelector(
    (state: RootState) => state.users.SignInData
  );

  return (
    <>
      <div className="container">
        {phone ? <ProfileCard /> : <Authentication />}
      </div>
      {/* <Authentication /> */}
      {/* <Signup /> */}
      {/* <Form /> */}
      {/* <Complaints /> */}
      {/* <Timeline /> */}
      {/* <HomeScreen /> */}
      {/* <ProfileCard/> */}
      {/* <Loading/> */}
      {/* <ShareApp/> */}
      {/* <Testing/> */}
    </>
  );
}
