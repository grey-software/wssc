"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalState/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CardsPage from "@/components/MainPage/CardsPage";
import ChartSection from "@/components/MainPage/ChartSection";
import { Statistics } from "@/GlobalState/ApiCalls/WSSC_API";
import { toast } from "react-hot-toast";
import DesktopScreenMsg from "@/components/DesktopScreenMsg";

const Home = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();
const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const { WSSC_CODE }: any = useSelector(
    (state: RootState) => state.User.SignInData
  );
  // getting token from store
  const token: any = useSelector((state: RootState) => state.User.adminToken);

  // getting supervisor data from global store
  const { phone }: any = useSelector(
    (state: RootState) => state.suprvisor.SupervisorSiginData
  );

  // A method definition to fetch all records/statistics that are associated with logged wssc organization
  const StatisticsApi = async () => {
    try {
      await Statistics(dispatch, token);
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
  }, [WSSC_CODE, navigate, phone]);

  // useEffect hook has used for the purpose to get the screen width, with the help we display organization short and fullname on the basisi of device screen
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // JSX SECTION
  return (
    <>
      {WSSC_CODE &&
        (windowWidth > 760 ? (
          <div className="container w-full h-auto overflow-x-hidden">
            {/* if the admin has loggedIn successfully then render these compnents */}
            <CardsPage />
            <ChartSection />
          </div>
        ) : (
          <div className=" overflow-hidden w-screen -ml-[280px] h-screen fixed top-0 bg-slate-200 flex justify-center items-center flex-col z-50">
            <DesktopScreenMsg />
          </div>
        ))}
    </>
  );
}

export default Home;