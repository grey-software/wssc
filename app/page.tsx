import Form from "@/app/complaint/[complaint]/page";
import HomeScreen from "@/components/HomeScreen/HomeScreen";
import Header from "@/components/Header";
import Timeline from "@/components/Complaint-Timeline/Timeline";
import { Inter } from "next/font/google";
import Authentication from "@/components/Auth/Authentication";

export default function Home() {
  return (
    <main>
      <Authentication/>
      {/* <Form /> */}
      {/* <Timeline/> */}
      <HomeScreen/>
    </main>
  );
}
