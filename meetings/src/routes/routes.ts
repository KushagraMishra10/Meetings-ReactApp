import { lazy } from "react";
import eRoutes from "./eRoutes";

const routes = [
  {
    path: eRoutes.landingPage,
    component: lazy(() => import("../pages/landingPage")),
    isExact: true
  },
  {
    path: eRoutes.addMeeting,
    component: lazy(() => import("../pages/addMeeting")),
    isExact: true
  },
  {
    path: eRoutes.meetingList,
    component: lazy(() => import("../pages/meetingRoomList")),
    isExact: true
  }
];

export { routes };
