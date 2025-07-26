import OpenAI from 'openai';

// 从环境变量获取API配置
const KIMI_API_KEY = import.meta.env.VITE_KIMI_API_KEY;
const KIMI_BASE_URL = import.meta.env.VITE_KIMI_BASE_URL || 'https://api.moonshot.cn/v1';

// 检查API密钥是否配置
if (!KIMI_API_KEY) {
  console.warn('⚠️ Kimi API密钥未配置，AI匹配功能将使用模拟数据');
}

const openai = KIMI_API_KEY ? new OpenAI({
  apiKey: KIMI_API_KEY,
  baseURL: KIMI_BASE_URL,
  dangerouslyAllowBrowser: true
}) : null;

// 模拟AI匹配结果（当API不可用时使用）
const generateMockMatches = (currentUser, targetUsers) => {
  const mockMatches = targetUsers.slice(0, 5).map((user, index) => ({
    userId: user.id,
    matchScore: Math.floor(Math.random() * 30) + 70, // 70-100分
    reason: `基于${user.profession || user.title}背景和${currentUser.title}需求的高度匹配`,
    keySkills: user.skills?.slice(0, 2) || ['专业技能', '行业经验'],
    complementary: `在${user.industries?.[0] || '相关领域'}方面具有丰富经验，能够为您的项目提供有力支持`
  }));
  
  return { matches: mockMatches };
};

export const aiMatchUsers = async (currentUser, targetUsers, context = '') => {
  // 如果没有配置API密钥，使用模拟数据
  if (!openai) {
    console.log('🤖 使用模拟AI匹配数据');
    return generateMockMatches(currentUser, targetUsers);
  }

  try {
    const prompt = `你是一个专业的人才匹配专家。请根据以下信息，为当前用户从候选人才库中找出最匹配的3-5个人选。

当前用户信息：
- 姓名：${currentUser.name || '匿名用户'}
- 职业身份：${currentUser.title || '未填写'}
- 核心技能：${currentUser.skills?.join(', ') || '未填写'}
- 行业领域：${currentUser.industries?.join(', ') || '未填写'}
- 项目经验：${currentUser.experience || '未填写'}
- 资源需求：${currentUser.needs?.join(', ') || '未填写'}

候选人才库：
${targetUsers.map((user, index) => `
${index + 1}. ${user.name || user.username} - ${user.title || user.profession}
   技能：${user.skills?.join(', ') || user.skills?.join(', ')}
   行业：${user.industries?.join(', ') || user.industries?.join(', ')}
   经验：${user.experience || user.experience}
`).join('\n')}

额外上下文：${context}

请基于技能匹配度、行业相关性、经验互补性、资源需求匹配度等多个维度进行综合评估，返回最匹配的3-5个人选，并给出匹配分数（0-100分）和推荐理由。

请严格按照以下JSON格式返回：
{
  "matches": [
    {
      "userId": "用户ID",
      "matchScore": 匹配分数,
      "reason": "推荐理由",
      "keySkills": ["关键匹配技能"],
      "complementary": "互补性描述"
    }
  ]
}`;

    const completion = await openai.chat.completions.create({
      model: "kimi-k2-0711-preview",
      messages: [
        {
          role: "system",
          content: "你是一个专业的人才匹配专家，擅长基于多维度信息精准匹配人才。请严格按照要求的JSON格式返回结果。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2000
    });

    const response = completion.choices[0].message.content;
    return JSON.parse(response);
  } catch (error) {
    console.error('AI匹配失败，使用模拟数据:', error);
    // API调用失败时，回退到模拟数据
    return generateMockMatches(currentUser, targetUsers);
  }
};

export const generateMatchContext = async (user1, user2) => {
  // 如果没有配置API密钥，返回默认描述
  if (!openai) {
    return `${user1.name || user1.username}和${user2.name || user2.username}在${user1.industries?.[0] || '相关领域'}方面具有很好的合作潜力，双方的技能和经验能够形成良好的互补关系。`;
  }

  try {
    const prompt = `基于以下两位用户的信息，生成一段精准的匹配描述，说明为什么他们是理想的合作伙伴：

用户A：${user1.name || user1.username} - ${user1.title || user1.profession}
技能：${user1.skills?.join(', ')}
行业：${user1.industries?.join(', ')}

用户B：${user2.name || user2.username} - ${user2.title || user2.profession}
技能：${user2.skills?.join(', ')}
行业：${user2.industries?.join(', ')}

请用中文生成一段简洁的匹配描述，突出双方的优势互补和合作潜力。`;

    const completion = await openai.chat.completions.create({
      model: "kimi-k2-0711-preview",
      messages: [
        {
          role: "system",
          content: "你是一个专业的商业配对顾问，擅长发现人才间的互补性和合作机会。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.5,
      max_tokens: 200
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('生成匹配描述失败:', error);
    return '基于技能和经验分析，你们是理想的合作伙伴';
  }
};
