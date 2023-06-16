"use client";
import HomeScreen from "@/components/HomeScreen";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "./GlobalState/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CardsPage from "@/components/MainPage/CardsPage";
import ChartSection from "@/components/MainPage/ChartSection";
import { Statistics } from "./GlobalState/ApiCalls/WSSC_API";
import { toast } from "react-hot-toast";

export default function Home() {
  const navigate = useRouter();
  const dispatch = useDispatch();

  const { WSSC_CODE }: any = useSelector(
    (state: RootState) => state.User.SignInData
  );

  // getting supervisor data from global store
  const { phone }: any = useSelector(
    (state: RootState) => state.suprvisor.SupervisorSiginData
  );

  // A method definition to fetch all records/statistics that are associated with logged wssc organization
  const StatisticsApi = async () => {
    try {
      await Statistics(dispatch);
     
    } catch (error) {
      console.log(error);
       toast.error("Something went wrong to fetch statistics data", {
         position: "top-right",
         duration: 5000,
       });
    }
  };

  //below is code to showing UI according to the user role
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
      // calling an api to fetch statistics of wssc
      StatisticsApi();
    }
  }, [WSSC_CODE, phone]);

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
