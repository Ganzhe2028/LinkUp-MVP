import OpenAI from 'openai';
import { generateUsers, isChinaRegion, getChinaRegions, getOverseasRegions } from './mockData';

// 从环境变量获取API配置
const KIMI_API_KEY = import.meta.env.VITE_KIMI_API_KEY;
const KIMI_BASE_URL = import.meta.env.VITE_KIMI_BASE_URL || 'https://api.moonshot.cn/v1';

// 检查API密钥是否配置
if (!KIMI_API_KEY) {
  console.warn('⚠️ Kimi API密钥未配置，AI搜索功能将使用模拟数据');
}

const openai = KIMI_API_KEY ? new OpenAI({
  apiKey: KIMI_API_KEY,
  baseURL: KIMI_BASE_URL,
  dangerouslyAllowBrowser: true
}) : null;

// 生成更丰富的人才库数据
const generateEnhancedTalentPool = () => {
  const baseUsers = generateUsers(200); // 生成200个基础用户
  
  // 增强用户数据，添加更多详细信息
  return baseUsers.map(user => ({
    ...user,
    // 添加更详细的工作经验
    workExperience: generateWorkExperience(user),
    // 添加项目经验
    projects: generateProjects(user),
    // 添加教育背景
    educationDetails: generateEducation(user),
    // 添加语言能力
    languages: generateLanguages(),
    // 添加地理位置偏好
    locationPreference: generateLocationPreference(user),
    // 添加薪资期望
    salaryExpectation: generateSalaryExpectation(user),
    // 添加工作状态
    workStatus: generateWorkStatus(),
    // 添加个人特质
    personality: generatePersonality(),
    // 添加成就和认证
    achievements: generateAchievements(user)
  }));
};

const generateWorkExperience = (user) => {
  const companies = ['腾讯', '阿里巴巴', '字节跳动', '美团', '滴滴', '小米', '华为', '百度', '京东', '网易'];
  const experiences = [];
  const yearsExp = parseInt(user.experience) || 3;
  
  for (let i = 0; i < Math.min(yearsExp / 2, 3); i++) {
    experiences.push({
      company: companies[Math.floor(Math.random() * companies.length)],
      position: user.profession,
      duration: `${Math.floor(Math.random() * 3) + 1}年`,
      description: `负责${user.skills.slice(0, 2).join('、')}相关工作，参与多个核心项目开发`
    });
  }
  return experiences;
};

const generateProjects = (user) => {
  const projectTypes = ['移动应用', 'Web平台', '数据分析系统', 'AI算法', '区块链应用', '企业管理系统'];
  const projects = [];
  
  for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
    projects.push({
      name: `${projectTypes[Math.floor(Math.random() * projectTypes.length)]}项目`,
      role: '核心开发者',
      technologies: user.skills.slice(0, 3),
      impact: '提升用户体验30%，优化系统性能50%'
    });
  }
  return projects;
};

const generateEducation = (user) => {
  const universities = ['清华大学', '北京大学', '复旦大学', '上海交通大学', '浙江大学', '中科院'];
  const majors = ['计算机科学', '软件工程', '数据科学', '人工智能', '电子工程', '工商管理'];
  
  return {
    university: universities[Math.floor(Math.random() * universities.length)],
    degree: user.education,
    major: majors[Math.floor(Math.random() * majors.length)],
    graduationYear: new Date().getFullYear() - Math.floor(Math.random() * 10) - 2
  };
};

const generateLanguages = () => {
  const languages = ['中文(母语)', '英语(流利)', '日语(基础)', '韩语(基础)'];
  return languages.slice(0, Math.floor(Math.random() * 3) + 1);
};

const generateLocationPreference = (user) => {
  const preferences = ['本地工作', '远程工作', '混合办公', '愿意出差'];
  return preferences[Math.floor(Math.random() * preferences.length)];
};

const generateSalaryExpectation = (user) => {
  const baseMap = {
    '程序员': 25000,
    '产品经理': 30000,
    '设计师': 20000,
    '数据分析师': 22000,
    '工程师': 28000
  };
  const base = baseMap[user.profession] || 20000;
  const yearsExp = parseInt(user.experience) || 3;
  return base + (yearsExp * 2000) + Math.floor(Math.random() * 5000);
};

const generateWorkStatus = () => {
  const statuses = ['在职-考虑机会', '在职-急寻新机会', '离职-随时到岗', '创业中', '自由职业'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const generatePersonality = () => {
  const traits = ['善于沟通', '团队合作', '创新思维', '执行力强', '学习能力强', '抗压能力强'];
  return traits.slice(0, Math.floor(Math.random() * 3) + 2);
};

const generateAchievements = (user) => {
  const achievements = [
    '获得公司年度最佳员工',
    '主导项目获得行业奖项',
    '拥有相关技术专利',
    '发表技术文章被广泛引用',
    '开源项目获得1000+ stars'
  ];
  return achievements.slice(0, Math.floor(Math.random() * 2) + 1);
};

// 智能模拟AI搜索结果（当API不可用时使用）
const generateMockSearchResults = (query, talentPool) => {
  const keywords = query.toLowerCase().split(/[，,\s]+/).filter(k => k.length > 0);
  
  // 增强的智能关键词映射
  const keywordMapping = {
    // 职业相关
    '产品经理': ['产品经理', '产品', 'PM', 'Product Manager'],
    '前端': ['前端工程师', '前端开发', 'Frontend', 'React', 'Vue', 'JavaScript', 'Web开发'],
    '后端': ['后端工程师', '后端开发', 'Backend', 'Java', 'Python', 'Node.js', '服务端'],
    '设计师': ['UI设计师', 'UX设计师', '视觉设计', '交互设计', '平面设计'],
    '数据': ['数据分析师', '数据科学家', '数据挖掘', 'Python', 'SQL', '大数据'],
    'AI': ['人工智能', '机器学习', '深度学习', 'Python', 'TensorFlow', 'PyTorch'],
    '创业者': ['创业者', '创始人', 'CEO', '企业家', '创业', '创新', '商业', '投资'],
    '程序员': ['程序员', '开发者', '工程师', '编程', '软件开发', 'Developer'],
    
    // 地理位置相关
    '中国': [...getChinaRegions(), '国内', '中国大陆', '内地', '本土'],
    '国内': [...getChinaRegions(), '中国', '中国大陆', '内地', '本土'],
    '海外': [...getOverseasRegions(), '国外', '境外', '海外市场'],
    '国外': [...getOverseasRegions(), '海外', '境外', '国际'],
    '北京': ['北京', '京', '首都', '帝都'],
    '上海': ['上海', '沪', '魔都'],
    '深圳': ['深圳', '深', '鹏城'],
    '杭州': ['杭州', '杭', '杭城'],
    '广州': ['广州', '穗', '羊城'],
    '成都': ['成都', '蓉', '蓉城'],
    
    // 技术相关
    'react': ['React', 'JavaScript', '前端', 'JSX', 'Redux'],
    'vue': ['Vue', 'JavaScript', '前端', 'Vuex', 'Nuxt'],
    'python': ['Python', '后端', '数据', 'Django', 'Flask'],
    'java': ['Java', '后端', 'Spring', 'SpringBoot'],
    'javascript': ['JavaScript', 'JS', '前端', 'Node.js'],
    
    // 经验级别
    '资深': ['高级', '资深', '专家', '架构师', '技术总监', 'Senior'],
    '初级': ['初级', '入门', '新手', '应届', 'Junior'],
    '中级': ['中级', '有经验', '熟练', 'Mid-level'],
    
    // 工作方式
    '远程': ['远程工作', '在家办公', 'WFH', '分布式'],
    '全职': ['全职', '正式员工', 'Full-time'],
    '兼职': ['兼职', '自由职业', 'Part-time', 'Freelance']
  };
  
  // 扩展关键词
  const expandedKeywords = [];
  keywords.forEach(keyword => {
    expandedKeywords.push(keyword);
    Object.entries(keywordMapping).forEach(([key, values]) => {
      if (keyword.includes(key) || values.some(v => v.toLowerCase().includes(keyword))) {
        expandedKeywords.push(...values.map(v => v.toLowerCase()));
      }
    });
  });
  
  // 特殊处理：检测地理位置过滤需求
  const needChinaFilter = keywords.some(k => 
    ['中国', '国内', '内地', '本土', '中国大陆'].includes(k)
  );
  const needOverseasFilter = keywords.some(k => 
    ['海外', '国外', '境外', '国际'].includes(k)
  );
  
  // 特殊处理：检测职业过滤需求
  const needEntrepreneurFilter = keywords.some(k => 
    ['创业者', '创始人', 'ceo', '企业家', '创业'].includes(k)
  );
  
  // 计算匹配分数
  const scoredResults = talentPool.map(user => {
    const searchText = [
      user.username,
      user.profession,
      user.region,
      ...user.skills,
      ...user.industries,
      user.bio,
      user.workStatus || '',
      ...(user.personality || []),
      user.educationDetails?.major || '',
      user.educationDetails?.university || '',
      user.locationPreference || ''
    ].join(' ').toLowerCase();
    
    let score = 0;
    let matchedKeywords = [];
    let matchReasons = [];
    
    // 地理位置过滤
    if (needChinaFilter && !isChinaRegion(user.region)) {
      return { ...user, matchScore: 0, matchReasons: ['不在中国地区'] };
    }
    if (needOverseasFilter && isChinaRegion(user.region)) {
      return { ...user, matchScore: 0, matchReasons: ['不在海外地区'] };
    }
    
    // 职业过滤
    if (needEntrepreneurFilter && user.profession !== '创业者') {
      score -= 20; // 减分但不完全排除
    }
    
    // 地理位置匹配加分
    if (needChinaFilter && isChinaRegion(user.region)) {
      score += 40;
      matchReasons.push('位于中国地区');
    }
    if (needOverseasFilter && !isChinaRegion(user.region)) {
      score += 40;
      matchReasons.push('位于海外地区');
    }
    
    // 职业精确匹配
    if (needEntrepreneurFilter && user.profession === '创业者') {
      score += 50;
      matchReasons.push('职业为创业者');
    }
    
    // 计算关键词匹配分数
    expandedKeywords.forEach(keyword => {
      if (searchText.includes(keyword)) {
        score += 8;
        if (!matchedKeywords.includes(keyword)) {
          matchedKeywords.push(keyword);
        }
      }
    });
    
    // 职业匹配加分
    if (keywords.some(k => user.profession.toLowerCase().includes(k))) {
      score += 30;
      matchReasons.push('职业高度匹配');
    }
    
    // 地区匹配加分
    if (keywords.some(k => user.region.toLowerCase().includes(k))) {
      score += 25;
      matchReasons.push('地理位置匹配');
    }
    
    // 技能匹配加分
    const skillMatches = user.skills.filter(skill => 
      keywords.some(k => skill.toLowerCase().includes(k)) ||
      expandedKeywords.some(k => skill.toLowerCase().includes(k))
    );
    if (skillMatches.length > 0) {
      score += skillMatches.length * 15;
      matchReasons.push(`${skillMatches.length}项技能匹配`);
    }
    
    // 行业匹配加分
    const industryMatches = user.industries.filter(industry => 
      keywords.some(k => industry.toLowerCase().includes(k)) ||
      expandedKeywords.some(k => industry.toLowerCase().includes(k))
    );
    if (industryMatches.length > 0) {
      score += industryMatches.length * 12;
      matchReasons.push(`${industryMatches.length}项行业匹配`);
    }
    
    // 简介内容匹配
    const bioMatches = keywords.filter(k => user.bio.toLowerCase().includes(k));
    if (bioMatches.length > 0) {
      score += bioMatches.length * 10;
      matchReasons.push('个人简介匹配');
    }
    
    // 工作状态匹配
    if (user.workStatus && keywords.some(k => user.workStatus.toLowerCase().includes(k))) {
      score += 10;
      matchReasons.push('工作状态匹配');
    }
    
    // 教育背景匹配
    if (user.educationDetails && keywords.some(k => 
      user.educationDetails.university.toLowerCase().includes(k) ||
      user.educationDetails.major.toLowerCase().includes(k)
    )) {
      score += 15;
      matchReasons.push('教育背景匹配');
    }
    
    return {
      ...user,
      matchScore: Math.min(Math.max(score, 0), 100),
      matchedKeywords,
      matchReasons,
      relevantSkills: skillMatches.length > 0 ? skillMatches : user.skills.slice(0, 3)
    };
  });
  
  // 过滤和排序结果
  const filteredResults = scoredResults
    .filter(user => user.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 15); // 增加结果数量
  
  // 如果没有匹配结果，返回一些符合条件的候选人
  if (filteredResults.length === 0) {
    let fallbackUsers = talentPool;
    
    // 根据搜索条件过滤备选用户
    if (needChinaFilter) {
      fallbackUsers = fallbackUsers.filter(user => isChinaRegion(user.region));
    }
    if (needOverseasFilter) {
      fallbackUsers = fallbackUsers.filter(user => !isChinaRegion(user.region));
    }
    if (needEntrepreneurFilter) {
      fallbackUsers = fallbackUsers.filter(user => user.profession === '创业者');
    }
    
    return fallbackUsers.slice(0, 5).map(user => ({
      ...user,
      matchScore: Math.floor(Math.random() * 20) + 50,
      matchReason: '基于搜索条件推荐的候选人',
      relevantSkills: user.skills.slice(0, 3),
      highlights: [`${user.profession}专业`, `${user.region}地区`, `${user.experience}经验`],
      potentialValue: '符合基本搜索条件的优质候选人'
    }));
  }
  
  // 生成详细的匹配信息
  return filteredResults.map(user => {
    const matchReason = user.matchReasons && user.matchReasons.length > 0 
      ? user.matchReasons.join('，') 
      : '基于关键词匹配分析';
    
    const highlights = [
      `${user.profession || '未知职业'}背景`,
      `${user.region || '未知地区'}地区`,
      `${user.experience || '未知'}经验`,
      ...(user.personality || []).slice(0, 2)
    ].slice(0, 4);
    
    const potentialValue = generatePotentialValue(user, query);
    
    return {
      ...user,
      matchReason: `${matchReason}，匹配度${user.matchScore || 0}%`,
      highlights,
      potentialValue
    };
  });
};

// 生成潜在价值描述
const generatePotentialValue = (user, query) => {
  const values = [];
  
  if (user.matchScore > 85) {
    values.push('高度匹配的核心候选人');
  } else if (user.matchScore > 70) {
    values.push('具有良好匹配度的候选人');
  }
  
  if (user.workStatus && user.workStatus.includes('急寻')) {
    values.push('求职意愿强烈，可快速入职');
  } else if (user.workStatus && user.workStatus.includes('考虑')) {
    values.push('对优质机会开放，可深度沟通');
  }
  
  if (user.experience && (user.experience.includes('5年以上') || user.experience.includes('资深'))) {
    values.push('丰富经验，可独当一面');
  }
  
  if (user.personality && user.personality.includes('学习能力强')) {
    values.push('学习能力强，适应性好');
  }
  
  if (user.personality && user.personality.includes('团队合作')) {
    values.push('团队协作能力优秀');
  }
  
  return values.length > 0 ? values.join('，') : '具有专业背景和发展潜力';
};

// 生成搜索洞察
const generateSearchInsights = (query, results) => {
  const insights = [];
  
  if (results.length === 0) {
    insights.push('未找到完全匹配的候选人，建议：');
    insights.push('• 尝试使用更通用的关键词');
    insights.push('• 考虑扩大地理范围');
    insights.push('• 降低某些技能要求');
    return insights.join(' ');
  }
  
  const avgScore = results.reduce((sum, r) => sum + r.matchScore, 0) / results.length;
  const highScoreCount = results.filter(r => r.matchScore > 80).length;
  
  if (avgScore > 80) {
    insights.push(`找到了${highScoreCount}个高匹配度候选人，建议优先联系。`);
  } else if (avgScore > 60) {
    insights.push(`找到了一些潜在候选人，建议进一步筛选和沟通。`);
  } else {
    insights.push(`匹配度相对较低，建议调整搜索条件或扩大范围。`);
  }
  
  // 分析地理分布
  const regions = [...new Set(results.map(r => r.user?.region || r.region))];
  if (regions.length > 1) {
    insights.push(`候选人分布在${regions.slice(0, 3).join('、')}等地区。`);
  }
  
  // 分析技能分布
  const allSkills = results.flatMap(r => r.relevantSkills || []);
  const skillCounts = {};
  allSkills.forEach(skill => {
    skillCounts[skill] = (skillCounts[skill] || 0) + 1;
  });
  const topSkills = Object.entries(skillCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([skill]) => skill);
  
  if (topSkills.length > 0) {
    insights.push(`主要技能集中在${topSkills.join('、')}等方面。`);
  }
  
  return insights.join(' ');
};

// AI智能搜索主函数
export const aiSmartSearch = async (query, options = {}) => {
  const { limit = 10, includeDetails = true } = options;
  
  // 生成增强的人才库
  const talentPool = generateEnhancedTalentPool();
  
  // 如果没有配置API密钥，使用模拟搜索
  if (!openai) {
    console.log('🤖 使用智能模拟AI搜索');
    const results = generateMockSearchResults(query, talentPool);
    
    // 生成搜索洞察
    const searchInsights = generateSearchInsights(query, results);
    
    return {
      results,
      query,
      totalFound: results.length + Math.floor(Math.random() * 20) + 5,
      searchTime: Math.floor(Math.random() * 300) + 150,
      searchInsights
    };
  }

  try {
    const startTime = Date.now();
    
    // 构建AI搜索提示词
    const prompt = `你是一个专业的人才搜索专家。用户查询："${query}"

请从以下人才库中找出最符合查询意图的人才。注意：
1. 理解查询的语义含义，不仅仅是关键词匹配
2. 考虑地理位置、技能匹配、经验水平、工作状态等多个维度
3. 对于模糊查询，要能推理出用户的真实需求

人才库数据（前50个样本）：
${talentPool.slice(0, 50).map((user, index) => `
${index + 1}. ${user.username} | ${user.profession} | ${user.region}
   技能: ${user.skills.join(', ')}
   行业: ${user.industries.join(', ')}
   经验: ${user.experience}
   工作状态: ${user.workStatus}
   教育: ${user.educationDetails.university} ${user.educationDetails.major} ${user.educationDetails.degree}
   语言: ${user.languages.join(', ')}
   特质: ${user.personality.join(', ')}
   薪资期望: ${user.salaryExpectation}元/月
   位置偏好: ${user.locationPreference}
`).join('\n')}

请返回最匹配的${limit}个人才，按匹配度排序。对于每个人才，请分析：
1. 为什么匹配（具体原因）
2. 匹配分数（0-100）
3. 相关技能亮点
4. 潜在价值

请严格按照以下JSON格式返回：
{
  "results": [
    {
      "userId": "用户ID",
      "matchScore": 匹配分数,
      "matchReason": "详细匹配原因",
      "relevantSkills": ["相关技能"],
      "highlights": ["亮点1", "亮点2", "亮点3"],
      "potentialValue": "潜在价值描述"
    }
  ],
  "searchInsights": "搜索洞察和建议"
}`;

    const completion = await openai.chat.completions.create({
      model: "kimi-k2-0711-preview",
      messages: [
        {
          role: "system",
          content: "你是一个专业的人才搜索和匹配专家，擅长理解复杂的人才需求并进行精准匹配。请严格按照要求的JSON格式返回结果。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 3000
    });

    const aiResponse = JSON.parse(completion.choices[0].message.content);
    const searchTime = Date.now() - startTime;
    
    // 将AI结果与完整用户数据合并
    const enrichedResults = aiResponse.results.map(result => {
      const fullUser = talentPool.find(u => u.id === result.userId) || talentPool[0];
      return {
        ...fullUser,
        ...result
      };
    });

    return {
      results: enrichedResults,
      query,
      totalFound: enrichedResults.length,
      searchTime,
      searchInsights: aiResponse.searchInsights
    };

  } catch (error) {
    console.error('AI搜索失败，使用模拟数据:', error);
    // API调用失败时，回退到模拟搜索
    return {
      results: generateMockSearchResults(query, talentPool),
      query,
      totalFound: Math.floor(Math.random() * 50) + 10,
      searchTime: Math.floor(Math.random() * 500) + 200,
      searchInsights: '由于API限制，当前使用模拟搜索结果'
    };
  }
};

// 获取搜索建议
export const getSearchSuggestions = async (partialQuery) => {
  const suggestions = [
    '国内产品经理会react',
    '北京资深前端工程师',
    '有AI经验的Python开发者',
    '深圳UI设计师 3年以上经验',
    '远程工作的全栈工程师',
    '创业公司CTO候选人',
    '金融科技行业数据分析师',
    '会英语的项目经理',
    '有区块链经验的后端开发',
    '教育行业产品运营专家'
  ];
  
  if (!partialQuery) return suggestions.slice(0, 5);
  
  const filtered = suggestions.filter(s => 
    s.toLowerCase().includes(partialQuery.toLowerCase())
  );
  
  return filtered.length > 0 ? filtered : suggestions.slice(0, 3);
};

// 分析搜索查询
export const analyzeSearchQuery = async (query) => {
  if (!openai) {
    return {
      intent: '人才搜索',
      keywords: query.split(/[，,\s]+/),
      suggestions: ['尝试添加地理位置', '指定技能要求', '说明经验水平']
    };
  }

  try {
    const prompt = `分析以下人才搜索查询的意图和关键信息："${query}"

请提取：
1. 搜索意图
2. 关键技能要求
3. 地理位置要求
4. 经验水平要求
5. 行业偏好
6. 其他特殊要求

返回JSON格式：
{
  "intent": "搜索意图",
  "skills": ["技能1", "技能2"],
  "location": "地理位置",
  "experience": "经验要求",
  "industry": "行业",
  "other": "其他要求",
  "suggestions": ["优化建议1", "优化建议2"]
}`;

    const completion = await openai.chat.completions.create({
      model: "kimi-k2-0711-preview",
      messages: [
        {
          role: "system",
          content: "你是一个专业的搜索查询分析专家，擅长理解用户的搜索意图。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.2,
      max_tokens: 500
    });

    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error('查询分析失败:', error);
    return {
      intent: '人才搜索',
      keywords: query.split(/[，,\s]+/),
      suggestions: ['尝试添加更多具体要求']
    };
  }
};