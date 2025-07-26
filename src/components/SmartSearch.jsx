import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Sparkles, Filter, X } from 'lucide-react';
import { useSmartSearch } from '@/hooks/useSmartSearch';
import { generateUsers } from '@/lib/mockData';

const SmartSearch = ({ onResultsChange, placeholder = "搜索用户..." }) => {
  const [keyword, setKeyword] = useState('');
  const [users, setUsers] = useState([]);
  const {
    searchResults,
    loading,
    searchMode,
    matchReasons,
    search,
    toggleSearchMode,
    setSearchMode
  } = useSmartSearch();

  // 加载用户数据
  useEffect(() => {
    const mockUsers = generateUsers(100);
    setUsers(mockUsers);
  }, []);

  // 执行搜索
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (keyword.trim()) {
        search(users, keyword);
      } else {
        search(users, '');
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [keyword, users, search]);

  // 通知父组件结果变化
  useEffect(() => {
    if (onResultsChange) {
      onResultsChange({
        results: searchResults,
        loading,
        matchReasons,
        searchMode
      });
    }
  }, [searchResults, loading, matchReasons, searchMode, onResultsChange]);

  const clearSearch = () => {
    setKeyword('');
  };

  return (
    <div className="w-full space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="pl-10 pr-20 rounded-xl"
        />
        {keyword && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-10 top-1/2 transform -translate-y-1/2"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-xl"
          onClick={toggleSearchMode}
        >
          <Sparkles className="h-4 w-4 mr-1" />
          {searchMode === 'smart' ? '智能' : '精确'}
        </Button>
      </div>

      {/* 搜索提示 */}
      {keyword && (
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs rounded-xl">
              {searchMode === 'smart' ? '智能匹配' : '精确匹配'}
            </Badge>
            <span className="text-gray-600">
              找到 {searchResults.length} 个结果
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchMode(searchMode === 'smart' ? 'exact' : 'smart')}
            className="rounded-xl"
          >
            切换到{searchMode === 'smart' ? '精确' : '智能'}模式
          </Button>
        </div>
      )}

      {/* 搜索建议 */}
      {keyword && searchMode === 'smart' && (
        <div className="text-xs text-gray-500">
          提示：智能模式会扩展搜索"中国"相关的城市名称
        </div>
      )}
    </div>
  );
};

export default SmartSearch;
