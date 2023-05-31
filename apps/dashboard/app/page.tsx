'use client';
import HomeScreen from "@/components/HomeScreen";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "./GlobalState/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setActiveTab } from "@/app/GlobalState/TabSlice";

export default function Home() {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { username }:any = useSelector((state: RootState) => state.User.SignInData);
  useEffect(() => {
    if (username) {
      navigate.push("/");
      dispatch(setActiveTab(0))
    } else {
      navigate.push("/auth");
      dispatch(setActiveTab(10));
    }
  }, [])
  
  return (
    <>
    <h1>Dashboard</h1>
    </>
  )

}
