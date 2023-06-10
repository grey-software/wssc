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
// getting supervisor data from global store
  const {phone }:any = useSelector((state: RootState) => state.suprvisor.SupervisorSiginData);
  useEffect(() => {
    // when none of user signedIn then redirect to the auth page
    if (!WSSC_CODE && !phone) {
      navigate.push("/auth");
      // dispatch(setActiveTab(0));
    }
    //-------- conditions to redirect user to their according page ---------
    // when supervisor signedIn Successfully
    if (!WSSC_CODE && phone) {
      navigate.push("/supervisor");
    }
    // when admin signedIn Successfully
    if (WSSC_CODE && !phone) {
      navigate.push("/");
    }
  }, []);

  return (
    <>
      <div className="container w-full h-auto overflow-x-hidden">
        {/* card section */}
        {/* if the admin has loggedIn successfully then render these compnents */}
        {WSSC_CODE && (
          <>
            <CardsPage />
            <ChartSection />
          </>
        )}
      </div>
    </>
  );
}
