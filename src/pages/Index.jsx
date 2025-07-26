import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StarIcon, UserIcon, MessageSquareIcon, RocketIcon, UsersIcon, SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateUsers } from '@/lib/mockData';
import UserCard from '@/components/UserCard';
import SmartSearch from '@/components/SmartSearch';

const FeatureCard = ({ icon, title, description }) => (
  <Card className="h-full transition-all hover:shadow-lg rounded-2xl">
    <CardHeader>
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-blue-100 rounded-full text-blue-600">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

const Index = () => {
  const [featuredUsers, setFeaturedUsers] = useState([]);
  const [searchDemoResults, setSearchDemoResults] = useState([]);
  const [showSearchDemo, setShowSearchDemo] = useState(false);

  useEffect(() => {
    // 加载精选用户
    const users = generateUsers(6);
    setFeaturedUsers(users);
  }, []);

  const handleSearchDemo = (results) => {
    setSearchDemoResults(results.results);
    setShowSearchDemo(true);
  };

  return (
    <div className="flex flex-col">
      {/* 英雄区域 */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
          <Badge variant="secondary" className="mb-4 rounded-xl">
            LinkUp专业人才智能对接平台
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 max-w-3xl">
            连接创业者、投资人与行业专家
          </h1>
          <p className="text-xl mb-10 max-w-2xl text-blue-100">
            基于AI智能算法，精准匹配您的商业需求与人才资源
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 h-12 px-8 text-lg rounded-xl" asChild>
              <Link to="/users">立即体验</Link>
            </Button>
            <Button variant="secondary" className="h-12 px-8 text-lg rounded-xl">
              了解更多
            </Button>
          </div>
        </div>
      </div>

      {/* 智能搜索演示 */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <SearchIcon className="h-8 w-8 text-blue-600" />
              智能搜索演示
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              体验我们的智能搜索功能，支持语义扩展和精确匹配
            </p>
          </div>

          <Card className="max-w-4xl mx-auto rounded-2xl">
            <CardHeader>
              <CardTitle>搜索人才</CardTitle>
              <p className="text-sm text-gray-600">
                试试搜索"中国"或具体城市名称，体验智能匹配功能
              </p>
            </CardHeader>
            <CardContent>
              <SmartSearch onResultsChange={handleSearchDemo} />
              
              {showSearchDemo && searchDemoResults.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-4">搜索结果预览</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {searchDemoResults.slice(0, 4).map(user => (
                      <UserCard key={user.id} user={user} />
                    ))}
                  </div>
                  <div className="text-center mt-4">
                    <Button variant="outline" asChild className="rounded-xl">
                      <Link to="/users">查看更多结果</Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 功能亮点 */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">核心功能</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            LinkUp专为创业者、投资人及行业专家打造的智能对接平台
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<StarIcon className="h-6 w-6" />} 
            title="智能匹配" 
            description="AI算法精准分析需求，推荐最合适的合作伙伴"
          />
          <FeatureCard 
            icon={<UserIcon className="h-6 w-6" />} 
            title="人才画像" 
            description="多维度的专业人才评估与展示系统"
          />
          <FeatureCard 
            icon={<MessageSquareIcon className="h-6 w-6" />} 
            title="即时沟通" 
            description="内置聊天系统，一键发起专业对话"
          />
          <FeatureCard 
            icon={<RocketIcon className="h-6 w-6" />} 
            title="付费推广" 
            description="精准标签定向推送，提升曝光机会"
          />
        </div>
      </div>

      {/* 精选人才 */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">精选人才</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              在LinkUp平台发现优秀人才，建立有价值的商业连接
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredUsers.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl" asChild>
              <Link to="/users">查看更多人才</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* 用户案例 */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">成功案例</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            见证LinkUp如何帮助用户找到理想的商业伙伴
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="rounded-2xl">
            <CardContent className="p-0">
              <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-2xl flex items-center justify-center">
                <div className="text-center">
                  <RocketIcon className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                  <p className="text-blue-700 font-medium">AI医疗项目</p>
                </div>
              </div>
              <div className="p-6">
                <Badge variant="secondary" className="mb-2 rounded-xl">科技创业</Badge>
                <h3 className="font-bold text-lg mb-2">AI医疗项目获得天使轮融资</h3>
                <p className="text-gray-600">
                  通过LinkUp平台匹配到医疗AI专家和投资人，3个月内完成500万天使轮融资
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="rounded-2xl">
            <CardContent className="p-0">
              <div className="w-full h-48 bg-gradient-to-br from-green-100 to-green-200 rounded-t-2xl flex items-center justify-center">
                <div className="text-center">
                  <UserIcon className="h-12 w-12 text-green-600 mx-auto mb-2" />
                  <p className="text-green-700 font-medium">技术合伙人</p>
                </div>
              </div>
              <div className="p-6">
                <Badge variant="secondary" className="mb-2 rounded-xl">人才对接</Badge>
                <h3 className="font-bold text-lg mb-2">跨境电商找到技术合伙人</h3>
                <p className="text-gray-600">
                  创业公司通过LinkUp平台精准匹配技术合伙人，6个月实现产品上线
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="rounded-2xl">
            <CardContent className="p-0">
              <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-purple-200 rounded-t-2xl flex items-center justify-center">
                <div className="text-center">
                  <StarIcon className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                  <p className="text-purple-700 font-medium">数字化转型</p>
                </div>
              </div>
              <div className="p-6">
                <Badge variant="secondary" className="mb-2 rounded-xl">资源对接</Badge>
                <h3 className="font-bold text-lg mb-2">传统企业数字化转型</h3>
                <p className="text-gray-600">
                  制造企业通过LinkUp平台找到数字化转型专家，成功实施智能制造解决方案
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 统计数据 */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">LinkUp平台数据</h2>
            <p className="text-gray-700">用数据说话，让连接更高效</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10万+</div>
              <p className="text-gray-600">注册用户</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">5万+</div>
              <p className="text-gray-600">成功对接</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">200+</div>
              <p className="text-gray-600">城市覆盖</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">92%</div>
              <p className="text-gray-600">匹配准确率</p>
            </div>
          </div>
        </div>
      </div>

      {/* 行动号召 */}
      <div className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">立即加入LinkUp，开启您的专业对接之旅</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-10">
            无论您是寻找投资机会、技术合伙人还是行业专家，LinkUp都能为您提供精准匹配
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 h-12 px-8 text-lg rounded-xl" asChild>
              <Link to="/auth">免费注册</Link>
            </Button>
            <Button variant="outline" className="h-12 px-8 text-lg rounded-xl">
              了解更多
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
