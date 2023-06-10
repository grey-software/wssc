"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { RootState } from "../GlobalState/store";
import HomeScreen from "@/components/Supervisor components/Homepage";

const Page = () => {
  const navigate = useRouter();
  const { phone }:any = useSelector(
    (state: RootState) => state.suprvisor.SupervisorSiginData
  );
  const { WSSC_CODE }: any = useSelector(
    (state: RootState) => state.User.SignInData
  );

  useEffect(() => {
    // Redirect logic based on login status
    if (!WSSC_CODE && !phone) {
      navigate.push("/auth"); // Redirect to authentication page
    } else if (!WSSC_CODE && phone) {
      navigate.push("/supervisor"); // Redirect to supervisor page
    } else if (WSSC_CODE && !phone) {
      navigate.push("/"); // Redirect to admin page
    }
  }, [WSSC_CODE, phone, navigate]);

  return phone ? <HomeScreen /> : null;
};

export default Page;
