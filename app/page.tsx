import Signup from "@/components/Auth/Signup";
import Form from "@/app/complaint/[complaint]/page";
import HomeScreen from "@/components/HomeScreen/HomeScreen";
import Header from "@/components/Header";
import Timeline from "@/components/Complaint-Timeline/Timeline";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* <Signup /> */}
      {/* <Form /> */}
      {/* <Timeline/> */}
      <HomeScreen/>
    </main>
  );
}
