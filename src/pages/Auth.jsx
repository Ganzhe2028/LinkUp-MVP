import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Github, Linkedin, Twitter, Eye, EyeOff, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 如果用户已登录，重定向到首页
  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  // 表单验证
  const validateForm = () => {
    const newErrors = {};

    // 邮箱验证
    if (!formData.email) {
      newErrors.email = '请输入邮箱地址';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    // 密码验证
    if (!formData.password) {
      newErrors.password = '请输入密码';
    } else if (formData.password.length < 8) {
      newErrors.password = '密码至少需要8位字符';
    }

    // 注册时的额外验证
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = '请输入姓名';
      } else if (formData.name.length < 2) {
        newErrors.name = '姓名至少需要2个字符';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = '请确认密码';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = '两次输入的密码不一致';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // 清除对应字段的错误
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await signIn(formData.email, formData.password);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('登录成功！');
          const from = location.state?.from?.pathname || '/';
          navigate(from, { replace: true });
        }
      } else {
        const { data, error } = await signUp(formData.email, formData.password, { 
          name: formData.name 
        });
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('注册成功！欢迎加入LinkUp！');
          const from = location.state?.from?.pathname || '/';
          navigate(from, { replace: true });
        }
      }
    } catch (error) {
      toast.error('操作失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      name: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      const { data, error } = await signIn('demo@linkup.com', 'password');
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('演示账号登录成功！');
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast.error('演示登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {isLogin ? '欢迎回来' : '加入LinkUp'}
          </CardTitle>
          <p className="text-gray-600 text-sm mt-2">
            {isLogin ? '登录您的账户继续使用' : '创建账户开始您的职业之旅'}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* 演示账号提示 */}
          <Alert className="border-blue-200 bg-blue-50">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <div className="space-y-1">
                <p className="font-medium">演示账号：</p>
                <p className="text-sm">📧 demo@linkup.com / password</p>
                <Button 
                  variant="link" 
                  className="h-auto p-0 text-blue-600 text-sm"
                  onClick={handleDemoLogin}
                  disabled={loading}
                >
                  一键登录演示账号
                </Button>
              </div>
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  姓名
                </Label>
                <Input 
                  id="name" 
                  placeholder="请输入真实姓名" 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`rounded-xl ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                邮箱
              </Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="请输入工作邮箱" 
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`rounded-xl ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                密码
              </Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  placeholder="至少8位字符" 
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`rounded-xl pr-10 ${errors.password ? 'border-red-500' : ''}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  确认密码
                </Label>
                <div className="relative">
                  <Input 
                    id="confirmPassword" 
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="再次输入密码" 
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`rounded-xl pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                )}
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl h-12 text-white font-medium"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  处理中...
                </div>
              ) : (
                isLogin ? '登录' : '注册'
              )}
            </Button>
          </form>
          
          <Separator className="my-6" />
          
          <div className="flex flex-col space-y-3">
            <Button variant="outline" className="flex items-center gap-2 rounded-xl h-12" disabled>
              <Github className="h-4 w-4" />
              使用 GitHub 登录
              <span className="text-xs text-gray-400 ml-auto">即将推出</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2 rounded-xl h-12" disabled>
              <Linkedin className="h-4 w-4" />
              使用 LinkedIn 登录
              <span className="text-xs text-gray-400 ml-auto">即将推出</span>
            </Button>
          </div>
          
          <div className="text-center text-sm mt-6">
            <button 
              type="button"
              onClick={switchMode}
              className="text-blue-600 hover:underline font-medium"
            >
              {isLogin ? '没有账号？立即注册' : '已有账号？立即登录'}
            </button>
          </div>

          {isLogin && (
            <div className="text-center">
              <button 
                type="button"
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                忘记密码？
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
