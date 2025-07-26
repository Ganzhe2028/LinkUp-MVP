import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Users, UserPlus, Calendar } from 'lucide-react';

const UserCard = ({ user }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer rounded-2xl">
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback>{user.username.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-bold text-lg">{user.username}</h3>
            <p className="text-sm text-gray-500">{user.profession}</p>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              {user.region}
            </div>
          </div>
          <Badge variant="secondary" className="text-xs rounded-xl">
            {user.gender} · {user.age}岁
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{user.bio}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {user.skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="outline" className="text-xs rounded-xl">
              {skill}
            </Badge>
          ))}
          {user.skills.length > 3 && (
            <Badge variant="outline" className="text-xs rounded-xl">
              +{user.skills.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{user.followers} 粉丝</span>
          </div>
          <div className="flex items-center">
            <UserPlus className="h-4 w-4 mr-1" />
            <span>{user.following} 关注</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{new Date(user.registerTime).getFullYear()}年注册</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
