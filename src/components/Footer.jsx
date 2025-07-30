import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">LinkUp</h3>
            <p className="text-gray-600 mb-4">
              专业人才智能对接平台，连接创业者、投资人与行业专家
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-blue-600">首页</Link></li>
              <li><Link to="/profile" className="text-gray-600 hover:text-blue-600">个人资料</Link></li>
              <li><Link to="/auth" className="text-gray-600 hover:text-blue-600">登录注册</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">解决方案</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600">创业者服务</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">投资人服务</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">行业专家</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">企业服务</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">联系我们</h3>
            <ul className="space-y-2 text-gray-600">
              <li>电话: 400-123-4567</li>
              <li>邮箱: contact@linkup.com</li>
              <li>地址: 北京市海淀区中关村科技园</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8 text-center text-sm text-gray-500">
          <p>© 2023 LinkUp平台 - 专业人才智能对接服务</p>
          <p className="mt-2">京ICP备12345678号 | 京公网安备11010802012345号</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
