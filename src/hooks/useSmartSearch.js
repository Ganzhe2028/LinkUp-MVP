import { useState, useCallback, useMemo } from 'react';
import Fuse from 'fuse.js';
import { CHINA_CITIES, findRelatedCities, getCitiesByProvince } from '@/lib/chinaCities';

// 智能搜索Hook - 支持语义扩展和精确匹配
export const useSmartSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchMode, setSearchMode] = useState('smart'); // 'smart' | 'exact'
  const [matchReasons, setMatchReasons] = useState({});

  // Fuse.js配置
  const fuseOptions = useMemo(() => ({
    includeScore: true,
    threshold: 0.4,
    keys: [
      { name: 'username', weight: 0.3 },
      { name: 'profession', weight: 0.2 },
      { name: 'region', weight: 0.3 },
      { name: 'skills', weight: 0.15 },
      { name: 'industries', weight: 0.15 },
      { name: 'bio', weight: 0.1 }
    ]
  }), []);

  // 计算相关性分数
  const calculateRelevanceScore = (user, searchTerms, relatedCities) => {
    let score = 0;
    const reasons = [];

    // 检查直接匹配
    searchTerms.forEach(term => {
      const lowerTerm = term.toLowerCase();
      
      // 用户名匹配
      if (user.username.toLowerCase().includes(lowerTerm)) {
        score += 100;
        reasons.push(`用户名包含"${term}"`);
      }
      
      // 职业匹配
      if (user.profession.toLowerCase().includes(lowerTerm)) {
        score += 80;
        reasons.push(`职业包含"${term}"`);
      }
      
      // 地区匹配
      if (user.region.toLowerCase().includes(lowerTerm)) {
        score += 90;
        reasons.push(`所在地包含"${term}"`);
      }
      
      // 技能匹配
      user.skills.forEach(skill => {
        if (skill.toLowerCase().includes(lowerTerm)) {
          score += 70;
          reasons.push(`技能"${skill}"匹配"${term}"`);
        }
      });
      
      // 行业匹配
      user.industries.forEach(industry => {
        if (industry.toLowerCase().includes(lowerTerm)) {
          score += 75;
          reasons.push(`行业"${industry}"匹配"${term}"`);
        }
      });
      
      // 简介匹配
      if (user.bio.toLowerCase().includes(lowerTerm)) {
        score += 50;
        reasons.push(`个人简介包含"${term}"`);
      }
    });

    // 检查相关城市匹配
    relatedCities.forEach(city => {
      if (user.region === city.city) {
        score += 85;
        reasons.push(`匹配到所在地：${city.city}`);
      }
      
      // 检查同省其他城市
      const provinceCities = getCitiesByProvince(city.province);
      if (provinceCities.includes(user.region)) {
        score += 60;
        reasons.push(`匹配到同省城市：${user.region}`);
      }
    });

    return { score, reasons: [...new Set(reasons)] };
  };

  // 智能搜索
  const smartSearch = useCallback((users, keyword) => {
    if (!keyword.trim()) {
      setSearchResults(users);
      setMatchReasons({});
      return;
    }

    setLoading(true);

    try {
      const searchTerms = keyword.split(/\s+/).filter(term => term.length > 0);
      
      // 获取相关城市
      let relatedCities = [];
      if (searchMode === 'smart') {
        searchTerms.forEach(term => {
          relatedCities.push(...findRelatedCities(term));
        });
      }

      // 去重相关城市
      relatedCities = relatedCities.filter((city, index, self) => 
        index === self.findIndex(c => c.city === city.city)
      );

      // 计算每个用户的相关性
      const scoredUsers = users.map(user => {
        const { score, reasons } = calculateRelevanceScore(user, searchTerms, relatedCities);
        return {
          ...user,
          relevanceScore: score,
          matchReasons: reasons
        };
      });

      // 按相关性排序
      const sortedUsers = scoredUsers
        .filter(user => user.relevanceScore > 0)
        .sort((a, b) => b.relevanceScore - a.relevanceScore);

      // 构建匹配原因映射
      const reasonsMap = {};
      sortedUsers.forEach(user => {
        reasonsMap[user.id] = user.matchReasons;
      });

      setSearchResults(sortedUsers);
      setMatchReasons(reasonsMap);
    } catch (error) {
      console.error('智能搜索失败:', error);
      setSearchResults([]);
      setMatchReasons({});
    } finally {
      setLoading(false);
    }
  }, [searchMode]);

  // 精确搜索
  const exactSearch = useCallback((users, keyword) => {
    if (!keyword.trim()) {
      setSearchResults(users);
      setMatchReasons({});
      return;
    }

    setLoading(true);

    try {
      const fuse = new Fuse(users, fuseOptions);
      const results = fuse.search(keyword);
      
      const exactResults = results.map(result => ({
        ...result.item,
        relevanceScore: Math.round((1 - result.score) * 100),
        matchReasons: [`精确匹配"${keyword}"`]
      }));

      // 构建匹配原因映射
      const reasonsMap = {};
      exactResults.forEach(user => {
        reasonsMap[user.id] = user.matchReasons;
      });

      setSearchResults(exactResults);
      setMatchReasons(reasonsMap);
    } catch (error) {
      console.error('精确搜索失败:', error);
      setSearchResults([]);
      setMatchReasons({});
    } finally {
      setLoading(false);
    }
  }, [fuseOptions]);

  // 执行搜索
  const search = useCallback((users, keyword) => {
    if (searchMode === 'smart') {
      smartSearch(users, keyword);
    } else {
      exactSearch(users, keyword);
    }
  }, [searchMode, smartSearch, exactSearch]);

  // 切换搜索模式
  const toggleSearchMode = useCallback(() => {
    setSearchMode(prev => prev === 'smart' ? 'exact' : 'smart');
  }, []);

  return {
    searchResults,
    loading,
    searchMode,
    matchReasons,
    search,
    toggleSearchMode,
    setSearchMode
  };
};
