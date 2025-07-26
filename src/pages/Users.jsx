import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Filter, Grid, List, Sparkles } from 'lucide-react';
import UserCard from '@/components/UserCard';
import SmartSearch from '@/components/SmartSearch';
import { generateUsers } from '@/lib/mockData';
import { useAIMatch } from '@/hooks/useAIMatch';

const Users = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allUsers, setAllUsers] = useState([]);
  const [displayUsers, setDisplayUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const { matches: aiMatches, loading: aiLoading, matchUsers } = useAIMatch();
  
  // 筛选状态
  const [filters, setFilters] = useState({
    profession: searchParams.get('profession') || 'all',
    region: searchParams.get('region') || 'all',
    gender: searchParams.get('gender') || 'all',
    minAge: searchParams.get('minAge') || '',
    maxAge: searchParams.get('maxAge') || ''
  });

  const [showAIMatch, setShowAIMatch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [matchReasons, setMatchReasons] = useState({});
  const [searchLoading, setSearchLoading] = useState(false);

  // 加载用户数据
  useEffect(() => {
    const mockUsers = generateUsers(100);
    setAllUsers(mockUsers);
    setDisplayUsers(mockUsers);
  }, []);

  // 处理智能搜索结果
  const handleSearchResults = (results) => {
    setSearchResults(results.results);
    setMatchReasons(results.matchReasons);
    setSearchLoading(results.loading);
    setShowAIMatch(false);
  };

  // 处理AI匹配
  const handleAIMatch = async () => {
    const currentUser = {
      name: '当前用户',
      title: '创业者',
      skills: ['人工智能', '产品设计'],
      industries: ['AI', 'SaaS'],
      needs: ['技术合伙人', '投资']
    };
    
    await matchUsers(currentUser, allUsers);
    setShowAIMatch(true);
  };

  // 应用筛选
  const applyFilters = (users) => {
    let filtered = [...users];

    if (filters.profession !== 'all') {
      filtered = filtered.filter(user => 
        user.profession.toLowerCase().includes(filters.profession.toLowerCase())
      );
    }

    if (filters.region !== 'all') {
      filtered = filtered.filter(user => 
        user.region === filters.region
      );
    }

    if (filters.gender !== 'all') {
      filtered = filtered.filter(user => 
        user.gender === filters.gender
      );
    }

    if (filters.minAge) {
      filtered = filtered.filter(user => 
        user.age >= parseInt(filters.minAge)
      );
    }

    if (filters.maxAge) {
      filtered = filtered.filter(user => 
        user.age <= parseInt(filters.maxAge)
      );
    }

    return filtered;
  };

  // 更新显示的用户
  useEffect(() => {
    let usersToDisplay = allUsers;

    // 如果有搜索结果，使用搜索结果
    if (searchResults.length > 0) {
      usersToDisplay = searchResults;
    }

    // 应用筛选
    usersToDisplay = applyFilters(usersToDisplay);

    setDisplayUsers(usersToDisplay);
  }, [allUsers, searchResults, filters]);

  const clearAllFilters = () => {
    setFilters({
      profession: 'all',
      region: 'all',
      gender: 'all',
      minAge: '',
      maxAge: ''
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">人才库</h1>
        <p className="text-gray-600">发现优秀的创业者、投资人和行业专家</p>
      </div>

      {/* 智能搜索区域 */}
      <Card className="mb-6 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">智能搜索</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <SmartSearch onResultsChange={handleSearchResults} />
            
            <div className="flex gap-2">
              <Button 
                onClick={handleAIMatch}
                disabled={aiLoading}
                className="bg-purple-600 hover:bg-purple-700 rounded-xl"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {aiLoading ? 'AI匹配中...' : 'AI智能匹配'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 筛选区域 */}
      <Card className="mb-6 rounded-2xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">高级筛选</CardTitle>
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              清除筛选
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Select
              value={filters.profession}
              onValueChange={(value) => setFilters({ ...filters, profession: value })}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="职业" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部职业</SelectItem>
                <SelectItem value="程序员">程序员</SelectItem>
                <SelectItem value="设计师">设计师</SelectItem>
                <SelectItem value="产品经理">产品经理</SelectItem>
                <SelectItem value="创业者">创业者</SelectItem>
                <SelectItem value="投资人">投资人</SelectItem>
                <SelectItem value="教师">教师</SelectItem>
                <SelectItem value="医生">医生</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.region}
              onValueChange={(value) => setFilters({ ...filters, region: value })}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="地区" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部地区</SelectItem>
                <SelectItem value="北京">北京</SelectItem>
                <SelectItem value="上海">上海</SelectItem>
                <SelectItem value="广州">广州</SelectItem>
                <SelectItem value="深圳">深圳</SelectItem>
                <SelectItem value="杭州">杭州</SelectItem>
                <SelectItem value="成都">成都</SelectItem>
                <SelectItem value="武汉">武汉</SelectItem>
                <SelectItem value="西安">西安</SelectItem>
                <SelectItem value="南京">南京</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.gender}
              onValueChange={(value) => setFilters({ ...filters, gender: value })}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="性别" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="男">男</SelectItem>
                <SelectItem value="女">女</SelectItem>
              </SelectContent>
            </Select>

            <div>
              <input
                type="number"
                placeholder="最小年龄"
                value={filters.minAge}
                onChange={(e) => setFilters({ ...filters, minAge: e.target.value })}
                min="18"
                max="65"
                className="w-full px-3 py-2 border rounded-xl"
              />
            </div>

            <div>
              <input
                type="number"
                placeholder="最大年龄"
                value={filters.maxAge}
                onChange={(e) => setFilters({ ...filters, maxAge: e.target.value })}
                min="18"
                max="65"
                className="w-full px-3 py-2 border rounded-xl"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 结果统计和视图切换 */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-gray-600">
            共找到 <Badge variant="secondary" className="rounded-xl">{displayUsers.length}</Badge> 位用户
            {showAIMatch && <span className="ml-2 text-purple-600">(AI智能匹配结果)</span>}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="rounded-xl"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="rounded-xl"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 用户列表 */}
      {searchLoading || aiLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {aiLoading ? 'AI正在为您精准匹配...' : '搜索中...'}
          </p>
        </div>
      ) : displayUsers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">暂无匹配的用户</p>
        </div>
      ) : (
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {displayUsers.map(user => (
            <div key={user.id} className="relative">
              <UserCard user={user} />
              {matchReasons[user.id] && matchReasons[user.id].length > 0 && (
                <div className="mt-2 p-2 bg-blue-50 rounded-xl">
                  <p className="text-xs text-blue-600">
                    <strong>匹配原因：</strong>
                    {matchReasons[user.id].slice(0, 2).join('；')}
                    {matchReasons[user.id].length > 2 && '...'}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
