import {
  IconBellRinging,
  IconChartAreaLine,
  IconHexagon,
  IconInbox,
  IconLayoutDashboard,
  IconStack,
  IconTicket,
  IconUser,
  IconUserCheck
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Dashboard",
    icon: IconLayoutDashboard,
  },
  {
    id: uniqueId(),
    title: "Default",
    href: "/administrator/dashboard",
    icon: IconLayoutDashboard,
    children: [
      {
        id: uniqueId(),
        title: "Inbox",
        href: "/administrator/test",
        icon: IconInbox,
      },
      {
        id: uniqueId(),
        title: "Tickets",
        href: "/administrator/test",
        icon: IconTicket,
      },
      {
        id: uniqueId(),
        title: "Notifications",
        href: "/administrator/test",
        icon: IconBellRinging,
      },
    ],
  },
  {
    id: uniqueId(),
    title: "Analytics",
    icon: IconChartAreaLine,
    href: "/analytics",
  },
  {
    navlabel: true,
    subheader: "User",
    icon: IconUserCheck,
  },
  {
    id: uniqueId(),
    title: "User Accounts",
    icon: IconUser,
    href: "/administrator/users",
  },
  {
    id: uniqueId(),
    title: "Modules",
    icon: IconHexagon,
    href: "/administrator/modules",
  },
  {
    navlabel: true,
    subheader: "Master Tables",
    icon: IconStack,
  },
  {
    id: uniqueId(),
    title: "Departments",
    icon: IconStack,
    href: "/master-tables/departments",
  },
  {
    id: uniqueId(),
    title: "Companies",
    icon: IconStack,
    href: "/master-tables/companies",
  },
];

export default Menuitems;
