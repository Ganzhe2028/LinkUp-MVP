import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StarIcon, MessageSquareIcon, LinkIcon, Sparkles, SearchIcon, ClockIcon, TrendingUpIcon, MapPinIcon, BrainIcon } from 'lucide-react';
import { aiSmartSearch, getSearchSuggestions, analyzeSearchQuery } from '@/lib/aiSearch';

const SearchResultCard = ({ user, matchScore, matchReason, relevantSkills, highlights, potentialValue }) => {
  // 安全检查，确保数据存在
  const safeUser = user || {};
  const safeRelevantSkills = relevantSkills || [];
  const safeHighlights = highlights || [];

  return (
    <Card className="hover:shadow-lg transition-all duration-300 rounded-2xl border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {safeUser.username || '未知用户'}
              <Badge variant="outline" className="text-xs">
                {safeUser.workStatus || '状态未知'}
              </Badge>
            </CardTitle>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              {safeUser.profession || '未填写职业'}
              <MapPinIcon className="h-3 w-3" />
              {safeUser.region || '位置未知'}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {safeUser.experience || '经验未知'} | {safeUser.educationDetails?.university || '教育背景未知'}
            </p>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <BrainIcon className="h-4 w-4" />
            {matchScore || 0}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* AI匹配原因 */}
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-1 flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              AI匹配分析
            </h4>
            <p className="text-sm text-blue-700">{matchReason || '基于综合评估的匹配'}</p>
          </div>
          
          {/* 潜在价值 */}
          {potentialValue && (
            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-green-800 mb-1 flex items-center gap-1">
                <TrendingUpIcon className="h-4 w-4" />
                潜在价值
              </h4>
              <p className="text-sm text-green-700">{potentialValue}</p>
            </div>
          )}
          
          {/* 相关技能 */}
          {safeRelevantSkills.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">相关技能</h4>
              <div className="flex flex-wrap gap-2">
                {safeRelevantSkills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs rounded-xl bg-yellow-50 border-yellow-200 text-yellow-800">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* 亮点特征 */}
          {safeHighlights.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">核心亮点</h4>
              <div className="flex flex-wrap gap-2">
                {safeHighlights.map((highlight, index) => (
                  <Badge key={index} variant="secondary" className="text-xs rounded-xl">
                    {highlight}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* 详细信息 */}
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div>薪资期望: {safeUser.salaryExpectation ? `${safeUser.salaryExpectation}元/月` : '面议'}</div>
            <div>工作偏好: {safeUser.locationPreference || '未知'}</div>
            <div>语言能力: {safeUser.languages?.join(', ') || '未知'}</div>
            <div>个人特质: {safeUser.personality?.slice(0, 2).join(', ') || '未知'}</div>
          </div>
          
          {/* 操作按钮 */}
          <div className="flex justify-between pt-2 border-t">
            <Button variant="outline" className="flex items-center gap-1 rounded-xl">
              <MessageSquareIcon className="h-4 w-4" />
              发起对话
            </Button>
            <Button variant="ghost" className="flex items-center gap-1 rounded-xl">
              <LinkIcon className="h-4 w-4" />
              查看详情
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Match = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchInsights, setSearchInsights] = useState('');
  const [searchStats, setSearchStats] = useState({ totalFound: 0, searchTime: 0 });

  useEffect(() => {
    // 初始化时加载一些推荐搜索
    loadInitialRecommendations();
    loadSearchSuggestions('');
  }, []);

  const loadInitialRecommendations = async () => {
    setLoading(true);
    try {
      // 执行一个默认搜索来展示功能
      const result = await aiSmartSearch('优秀的技术人才', { limit: 6 });
      setSearchResults(result.results);
      setSearchStats({ totalFound: result.totalFound, searchTime: result.searchTime });
      setSearchInsights(result.searchInsights || '');
    } catch (error) {
      console.error('加载推荐失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSearchSuggestions = async (query) => {
    try {
      const suggestions = await getSearchSuggestions(query);
      setSearchSuggestions(suggestions);
    } catch (error) {
      console.error('加载搜索建议失败:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setShowSuggestions(false);
    
    try {
      const result = await aiSmartSearch(searchQuery, { limit: 10 });
      setSearchResults(result.results);
      setSearchStats({ totalFound: result.totalFound, searchTime: result.searchTime });
      setSearchInsights(result.searchInsights || '');
    } catch (error) {
      console.error('AI搜索失败:', error);
      setSearchResults([]);
      setSearchInsights('搜索失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length > 0) {
      loadSearchSuggestions(value);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    // 自动执行搜索
    setTimeout(() => {
      handleSearch();
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              AI智能人才搜索
              <BrainIcon className="h-8 w-8 text-blue-600" />
            </h1>
            <p className="text-gray-600">基于Kimi-k2模型的语义理解搜索，支持自然语言查询</p>
          </div>
        </div>
        
        {/* 搜索框 */}
        <div className="relative mb-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="试试：国内产品经理会react、北京资深前端工程师、有AI经验的Python开发者..."
              value={searchQuery}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="pl-10 pr-20 py-3 rounded-xl text-base"
            />
            <Button 
              onClick={handleSearch}
              disabled={loading || !searchQuery.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              {loading ? '搜索中...' : '搜索'}
            </Button>
          </div>
          
          {/* 搜索建议 */}
          {showSuggestions && searchSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1">
              {searchSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm border-b last:border-b-0"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <SearchIcon className="inline h-4 w-4 text-gray-400 mr-2" />
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* 搜索统计 */}
        {searchStats.totalFound > 0 && (
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <span className="flex items-center gap-1">
              <TrendingUpIcon className="h-4 w-4" />
              找到 {searchStats.totalFound} 个匹配结果
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon className="h-4 w-4" />
              搜索耗时 {searchStats.searchTime}ms
            </span>
          </div>
        )}
        
        {/* AI搜索洞察 */}
        {searchInsights && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-6 border border-blue-200">
            <h3 className="text-sm font-medium text-blue-800 mb-2 flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              AI搜索洞察
            </h3>
            <p className="text-sm text-blue-700">{searchInsights}</p>
          </div>
        )}
      </div>
      
      {/* 搜索结果 */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">AI正在理解您的需求并搜索匹配人才...</p>
          <p className="text-xs text-gray-400 mt-2">语义分析 → 智能匹配 → 结果排序</p>
        </div>
      ) : searchResults.length === 0 ? (
        <div className="text-center py-12">
          <BrainIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">
            {searchQuery ? '未找到匹配的人才' : '输入搜索条件开始AI智能搜索'}
          </p>
          <p className="text-sm text-gray-400">
            支持自然语言搜索，如："国内产品经理会react"、"北京资深前端工程师"
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {searchResults.map(result => (
            <SearchResultCard key={result.id || result.userId} {...result} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Match;
