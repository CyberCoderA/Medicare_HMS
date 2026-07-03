import { HomeIcon, UserIcon, UserGroupIcon, CalendarIcon } from "@heroicons/react/24/solid";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import AdminHomePanel from "../pages/AdminHomePanel";
import AdminUsersPanel from "../pages/AdminUserPanel";
import AdminLogsPanel from "../pages/AdminLogsPanel";

export const NAVIGATION_BY_ROLE = {
  TECHNICAL_ADMIN: [
    { id: "home", title: "Home", icon: <HomeIcon className="size-8 text-white" />, pane: <AdminHomePanel /> },
    { id: "users", title: "Users", icon: <UserIcon className="size-8 text-white" />, pane: <AdminUsersPanel /> },
    { id: "logs", title: "Logs", icon: <ClipboardIcon className="size-8 text-white" />, pane: <AdminLogsPanel /> },
  ],
  HOSPITAL_ADMIN: [
    { id: "home", title: "Home", icon: <HomeIcon className="size-8 text-white" />},
    { id: "users", title: "Users", icon: <UserIcon className="size-8 text-white" />},
  ],
  DOCTOR: [
    { id: "home", title: "Home", icon: <HomeIcon className="size-8 text-white" />},
    { id: "appointments", title: "Appointments", icon: <CalendarIcon className="size-8 text-white" />},
    { id: "patients", title: "Patients", icon: <UserGroupIcon className="size-8 text-white" />},
  ],
  RECEPTIONIST: [
    { id: "home", title: "Home", icon: <HomeIcon className="size-8 text-white" />},
    { id: "appointments", title: "Appointments", icon: <CalendarIcon className="size-8 text-white" />},
  ],
};