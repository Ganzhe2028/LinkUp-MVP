import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, Calendar, Users, UserPlus, Mail, Phone, 
  Briefcase, GraduationCap, Clock, Star, MessageSquare
} from 'lucide-react';
import { getUserById } from '@/lib/mockData';

const UserDetail = () => {
  const { id } = useParams();
  const user = getUserById(id);

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <Card className="rounded-2xl">
          <CardContent className="py-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">用户不存在</h2>
              <p className="text-gray-600">抱歉，找不到该用户的详细信息</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧个人信息 */}
        <div className="lg:col-span-2">
          <Card className="rounded-2xl">
            <CardHeader>
              <div className="flex items-start space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar} alt={user.username} />
                  <AvatarFallback className="text-2xl">
                    {user.username.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">{user.username}</CardTitle>
                  <p className="text-lg text-gray-600 mb-2">{user.profession}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {user.region}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {user.age}岁
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {user.experience}经验
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="mb-2 rounded-xl">
                    {user.gender}
                  </Badge>
                  <div className="flex space-x-2">
                    <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      发起对话
                    </Button>
                    <Button variant="outline" className="rounded-xl">
                      <Star className="h-4 w-4 mr-2" />
                      关注
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">个人简介</h3>
                  <p className="text-gray-600 leading-relaxed">{user.bio}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">核心技能</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="rounded-xl">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">行业领域</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.industries.map((industry, index) => (
                      <Badge key={index} variant="secondary" className="rounded-xl">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">工作经历</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Briefcase className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium">{user.company}</p>
                        <p className="text-sm text-gray-600">{user.profession}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">教育背景</h3>
                  <div className="flex items-start space-x-3">
                    <GraduationCap className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium">{user.education}</p>
                      <p className="text-sm text-gray-600">计算机科学专业</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧统计信息 */}
        <div className="space-y-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>数据统计</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">注册时间</span>
                  <span className="font-medium">
                    {new Date(user.registerTime).toLocaleDateString('zh-CN')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">最后登录</span>
                  <span className="font-medium">
                    {new Date(user.lastLoginTime).toLocaleDateString('zh-CN')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">粉丝数量</span>
                  <span className="font-medium">{user.followers}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">关注数量</span>
                  <span className="font-medium">{user.following}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>联系方式</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{user.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>活跃度</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">在线状态</span>
                  <Badge variant="default" className="text-xs rounded-xl">在线</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">响应率</span>
                  <span className="text-sm font-medium">95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">平均响应时间</span>
                  <span className="text-sm font-medium">2小时内</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
