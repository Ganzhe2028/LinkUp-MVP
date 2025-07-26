import { HomeIcon, UserIcon, MessageSquareIcon, StarIcon, UsersIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import Auth from "./pages/Auth.jsx";
import Profile from "./pages/Profile.jsx";
import Match from "./pages/Match.jsx";
import Chat from "./pages/Chat.jsx";
import Users from "./pages/Users.jsx";
import UserDetail from "./pages/UserDetail.jsx";

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
    title: "人才库",
    to: "/users",
    icon: <UsersIcon className="h-4 w-4" />,
    page: <Users />,
  },
  {
    title: "智能匹配",
    to: "/match",
    icon: <StarIcon className="h-4 w-4" />,
    page: <Match />,
  },
  {
    title: "消息",
    to: "/chat",
    icon: <MessageSquareIcon className="h-4 w-4" />,
    page: <Chat />,
  },
  {
    title: "个人资料",
    to: "/profile",
    icon: <UserIcon className="h-4 w-4" />,
    page: <Profile />,
  },
  {
    title: "用户详情",
    to: "/users/:id",
    icon: <UserIcon className="h-4 w-4" />,
    page: <UserDetail />,
    hideInNav: true
  },
  {
    title: "登录注册",
    to: "/auth",
    icon: <UserIcon className="h-4 w-4" />,
    page: <Auth />,
    hideInNav: true
  }
];
