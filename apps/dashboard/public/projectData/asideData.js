import { FaUserCircle, FaUsers } from "react-icons/fa";
import { MdSpaceDashboard, MdFeedback } from "react-icons/md";
import { SiFiles } from "react-icons/si";
import { HiUsers } from "react-icons/hi";

export const items = [
  {
    id: 0,
    name: "Dashboard",
    to: "/",
    icon: <MdSpaceDashboard />,
  },
  {
    id: 1,
    name: "Complaints",
    to: "/complaint",
    icon: <SiFiles />,
  },
  {
    id: 2,
    name: "Supervisors",
    to: "/supervisors",
    icon: <HiUsers />,
  },
  {
    id: 3,
    name: "Citizens",
    to: "/users",
    icon: <FaUsers />,
  },
  {
    id: 4,
    name: "Feedback",
    to: "/feedback",
    icon: <MdFeedback />,
  },
];
