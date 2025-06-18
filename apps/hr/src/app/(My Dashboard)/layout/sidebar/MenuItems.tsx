import {
  IconBellRinging,
  IconChessKing,
  IconInbox,
  IconLayoutDashboard,
  IconTicket
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "ACCOUNT",
    icon: IconLayoutDashboard,
  },
  {
    id: uniqueId(),
    title: "Overview",
    href: "/account/dashboard",
    icon: IconLayoutDashboard,
  },
  {
    id: uniqueId(),
    title: "Inbox",
    href: "/administrator/test",
    icon: IconInbox,
  },
  {
    id: uniqueId(),
    title: "Staffs",
    href: "/account/staffs",
    icon: IconTicket,
  },
  {
    id: uniqueId(),
    title: "Notifications",
    href: "/administrator/test",
    icon: IconBellRinging,
  },
  {
    navlabel: true,
    subheader: "MAIN MENU",
    icon: IconLayoutDashboard,
  },
  {
    id: uniqueId(),
    title: "Administrator",
    href: "/administrator/dashboard",
    icon: IconChessKing,
  },
];

export default Menuitems;
