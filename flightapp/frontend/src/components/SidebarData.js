import React from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Display",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text"
  },
  {
    title: "Create",
    path: "/flight/create",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text"
  },
  // {
  //   title: "Products",
  //   path: "/products",
  //   icon: <FaIcons.FaCartPlus />,
  //   cName: "nav-text"
  // },
  // {
  //   title: "Team",
  //   path: "/team",
  //   icon: <IoIcons.IoMdPeople />,
  //   cName: "nav-text"
  // },
  // {
  //   title: "Messages",
  //   path: "/",
  //   icon: <FaIcons.FaEnvelopeOpenText />,
  //   cName: "nav-text"
  // },
  // {
  //   title: "Support",
  //   path: "/support",
  //   icon: <IoIcons.IoMdHelpCircle />,
  //   cName: "nav-text"
  // }
];
