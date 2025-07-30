import { HomeIcon, UserIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import Auth from "./pages/Auth.jsx";
import Profile from "./pages/Profile.jsx";

/**
* Central place for defining the navigation items. Used for navigation components and routing.
*/
export const navItems = [
  {
    title: "首页",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "个人资料",
    to: "/profile",
    icon: <UserIcon className="h-4 w-4" />,
    page: <Profile />,
  },
  {
    title: "登录注册",
    to: "/auth",
    icon: <UserIcon className="h-4 w-4" />,
    page: <Auth />,
    hideInNav: true
  }
];
