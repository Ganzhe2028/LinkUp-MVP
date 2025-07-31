import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { navItems } from '../nav-items';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import logoImage from '@/assets/logo.svg';

const Navbar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('登出失败，请重试');
    } else {
      toast.success('已成功登出');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-10">
          <Link to="/" className="flex items-center font-bold text-xl text-blue-600">
            <img 
              src={logoImage} 
              alt="LinkUp Logo" 
              className="h-8 w-auto object-contain"
            />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-1">
            {navItems
              .filter(item => {
                // 隐藏标记为hideInNav的项目
                if (item.hideInNav) return false;
                
                // 个人资料页面只在用户登录后显示
                if (item.to === '/profile' && !user) return false;
                
                return true;
              })
              .map((item) => (
                <Button
                  key={item.to}
                  asChild
                  variant={location.pathname === item.to ? "secondary" : "ghost"}
                >
                  <Link to={item.to} className="flex items-center gap-2">
                    {item.icon}
                    {item.title}
                  </Link>
                </Button>
              ))}
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm text-gray-600">
                欢迎, {user.user_metadata?.name || user.email}
              </span>
              <Button variant="outline" onClick={handleLogout}>
                登出
              </Button>
            </>
          ) : (
            <Button variant="outline" asChild>
              <Link to="/auth">登录/注册</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
