import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { HomeIcon, UserIcon, MessageSquareIcon, StarIcon, UsersIcon, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// 导航配置
const navItems = [
  {
    title: "首页",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
  },
  {
    title: "人才库",
    to: "/users",
    icon: <UsersIcon className="h-4 w-4" />,
    requireAuth: true,
  },
  {
    title: "智能匹配",
    to: "/match",
    icon: <StarIcon className="h-4 w-4" />,
    requireAuth: true,
  },
  {
    title: "消息",
    to: "/chat",
    icon: <MessageSquareIcon className="h-4 w-4" />,
    requireAuth: true,
  },
  {
    title: "个人资料",
    to: "/profile",
    icon: <UserIcon className="h-4 w-4" />,
    requireAuth: true,
  },
];

const Navbar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('已成功退出登录');
    } catch (error) {
      toast.error('退出登录失败');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LinkUp
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems
              .filter(item => !item.requireAuth || user)
              .map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.to
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              ))}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  欢迎, {user.user_metadata?.name || user.email}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>退出</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/auth">
                  <Button variant="outline" size="sm">
                    登录/注册
                  </Button>
                </Link>
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                  发布需求
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
