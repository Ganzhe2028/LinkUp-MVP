import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

// 设置中文本地化
faker.locale = 'zh_CN';

// 职业列表
const professions = [
  '程序员', '设计师', '产品经理', '数据分析师', '市场营销', '销售经理',
  '教师', '医生', '律师', '会计师', '工程师', '建筑师', '摄影师',
  '作家', '记者', '翻译', '人力资源', '运营经理', '投资顾问', '创业者'
];

// 地区列表 - 按国内外分类
const chinaRegions = [
  '北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安', '南京', '苏州',
  '天津', '重庆', '青岛', '大连', '厦门', '长沙', '郑州', '济南', '福州', '合肥',
  '石家庄', '太原', '沈阳', '长春', '哈尔滨', '昆明', '贵阳', '南宁', '兰州', '银川',
  '西宁', '拉萨', '乌鲁木齐', '呼和浩特', '南昌', '海口', '三亚', '珠海', '佛山', '东莞',
  '中山', '惠州', '汕头', '湛江', '江门', '茂名', '肇庆', '梅州', '汕尾', '河源',
  '阳江', '清远', '潮州', '揭阳', '云浮', '无锡', '常州', '徐州', '南通', '连云港',
  '淮安', '盐城', '扬州', '镇江', '泰州', '宿迁', '温州', '嘉兴', '湖州', '绍兴',
  '金华', '衢州', '舟山', '台州', '丽水', '烟台', '潍坊', '济宁', '泰安', '威海',
  '日照', '临沂', '德州', '聊城', '滨州', '菏泽', '枣庄', '东营', '洛阳', '开封',
  '平顶山', '安阳', '鹤壁', '新乡', '焦作', '濮阳', '许昌', '漯河', '三门峡', '商丘',
  '周口', '驻马店', '南阳', '信阳', '绵阳', '自贡', '攀枝花', '泸州', '德阳', '广元',
  '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安', '达州', '雅安', '巴中'
];

const overseasRegions = [
  '纽约', '洛杉矶', '旧金山', '西雅图', '芝加哥', '波士顿', '华盛顿', '迈阿密',
  '伦敦', '曼彻斯特', '爱丁堡', '都柏林', '巴黎', '马赛', '里昂', '柏林',
  '慕尼黑', '法兰克福', '汉堡', '东京', '大阪', '京都', '横滨', '名古屋',
  '首尔', '釜山', '新加坡', '吉隆坡', '曼谷', '雅加达', '马尼拉', '胡志明市',
  '悉尼', '墨尔本', '布里斯班', '珀斯', '多伦多', '温哥华', '蒙特利尔', '渥太华',
  '香港', '澳门', '台北', '高雄', '苏黎世', '日内瓦', '阿姆斯特丹', '布鲁塞尔'
];

// 合并所有地区，中国地区占比更高
const regions = [
  ...chinaRegions,
  ...chinaRegions, // 重复一次，增加中国地区的权重
  ...overseasRegions
];

// 技能列表
const skills = [
  'JavaScript', 'React', 'Vue', 'Node.js', 'Python', 'Java', 'Go', 'Rust',
  'UI设计', 'UX设计', '产品设计', '品牌设计', '数据分析', '机器学习', '深度学习',
  '项目管理', '团队管理', '商业分析', '市场营销', '用户增长', '内容运营'
];

// 行业列表
const industries = [
  '互联网', '金融科技', '人工智能', '区块链', '电子商务', '企业服务',
  '教育科技', '医疗科技', '游戏', '文化娱乐', '新能源', '智能制造',
  '房地产', '消费品', '物流', '旅游', '餐饮', '零售'
];

// 生成随机头像URL
const generateAvatar = (gender) => {
  const genderKeyword = gender === '男' ? 'man' : 'woman';
  return `https://nocode.meituan.com/photo/search?keyword=${genderKeyword},portrait&width=400&height=400&seed=${Math.random()}`;
};

// 生成个人简介
const generateBio = (profession, region) => {
  const isChina = chinaRegions.includes(region);
  const isEntrepreneur = profession === '创业者';
  
  const templates = [
    `我是一名${profession}，拥有${faker.number.int({ min: 3, max: 15 })}年的行业经验。专注于${faker.helpers.arrayElement(skills)}领域，曾参与多个大型项目的开发与管理。热爱技术创新，期待与志同道合的伙伴合作。`,
    `来自${region}的${profession}，擅长${faker.helpers.arrayElement(skills)}和${faker.helpers.arrayElement(skills)}。相信技术改变世界，致力于用创新解决实际问题。`,
    `资深${profession}，在${faker.helpers.arrayElement(industries)}领域有丰富经验。追求极致的用户体验，注重团队协作与知识分享。`
  ];
  
  // 为创业者生成特殊的简介
  if (isEntrepreneur) {
    const entrepreneurTemplates = [
      `${isChina ? '中国' : '海外'}连续创业者，专注于${faker.helpers.arrayElement(industries)}领域。曾成功创立并运营多家公司，拥有丰富的商业经验和资源网络。正在寻找志同道合的合作伙伴。`,
      `来自${region}的创业者，在${faker.helpers.arrayElement(industries)}行业深耕${faker.number.int({ min: 5, max: 20 })}年。擅长${faker.helpers.arrayElement(skills)}，致力于通过创新技术解决行业痛点。`,
      `${isChina ? '国内' : '海外'}知名创业者，曾获得多轮融资。专注于${faker.helpers.arrayElement(industries)}赛道，拥有强大的团队管理和商业拓展能力。欢迎投资人和合作伙伴交流。`,
      `资深${profession}，在${region}创立了多家${faker.helpers.arrayElement(industries)}公司。拥有从0到1的完整创业经验，熟悉产品开发、市场推广、团队建设等各个环节。`
    ];
    return faker.helpers.arrayElement(entrepreneurTemplates);
  }
  
  return faker.helpers.arrayElement(templates);
};

// 判断是否为中国地区
export const isChinaRegion = (region) => {
  return chinaRegions.includes(region);
};

// 获取中国地区列表
export const getChinaRegions = () => {
  return [...chinaRegions];
};

// 获取海外地区列表
export const getOverseasRegions = () => {
  return [...overseasRegions];
};

// 生成单个用户数据
export const generateUser = () => {
  const gender = faker.helpers.arrayElement(['男', '女']);
  const profession = faker.helpers.arrayElement(professions);
  const region = faker.helpers.arrayElement(regions);
  const registerTime = faker.date.between({ 
    from: new Date(2021, 0, 1), 
    to: new Date() 
  });
  const lastLoginTime = faker.date.between({ 
    from: registerTime, 
    to: new Date() 
  });

  return {
    id: uuidv4(),
    username: `${faker.person.lastName()}${faker.person.firstName()}${faker.person.firstName()}`,
    englishName: faker.person.firstName(),
    avatar: generateAvatar(gender),
    gender,
    age: faker.number.int({ min: 18, max: 65 }),
    profession,
    region,
    bio: generateBio(profession, region),
    registerTime: registerTime.toISOString(),
    lastLoginTime: lastLoginTime.toISOString(),
    followers: faker.number.int({ min: 0, max: 10000 }),
    following: faker.number.int({ min: 0, max: 500 }),
    skills: faker.helpers.arrayElements(skills, { min: 3, max: 8 }),
    industries: faker.helpers.arrayElements(industries, { min: 2, max: 5 }),
    experience: `${faker.number.int({ min: 1, max: 15 })}年`,
    company: faker.company.name(),
    education: faker.helpers.arrayElement(['本科', '硕士', '博士', 'MBA']),
    email: faker.internet.email(),
    phone: faker.phone.number()
  };
};

// 生成批量用户数据
export const generateUsers = (count = 50) => {
  return Array.from({ length: count }, (_, index) => ({
    ...generateUser(),
    id: uuidv4() // 确保每个用户都有唯一的ID
  }));
};

// 分页获取用户数据
export const getUsersByPage = (page = 1, pageSize = 10) => {
  const allUsers = generateUsers(100); // 预生成100个用户
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  return {
    users: allUsers.slice(startIndex, endIndex),
    total: allUsers.length,
    page,
    pageSize,
    totalPages: Math.ceil(allUsers.length / pageSize)
  };
};

// 搜索用户
export const searchUsers = (keyword, filters = {}) => {
  let allUsers = generateUsers(100);
  
  if (keyword) {
    const searchTerm = keyword.toLowerCase();
    allUsers = allUsers.filter(user => 
      user.username.toLowerCase().includes(searchTerm) ||
      user.profession.toLowerCase().includes(searchTerm) ||
      user.region.toLowerCase().includes(searchTerm) ||
      user.skills.some(skill => skill.toLowerCase().includes(searchTerm)) ||
      user.industries.some(industry => industry.toLowerCase().includes(searchTerm))
    );
  }
  
  if (filters.profession) {
    allUsers = allUsers.filter(user => user.profession === filters.profession);
  }
  
  if (filters.region) {
    allUsers = allUsers.filter(user => user.region === filters.region);
  }
  
  if (filters.gender) {
    allUsers = allUsers.filter(user => user.gender === filters.gender);
  }
  
  if (filters.minAge) {
    allUsers = allUsers.filter(user => user.age >= filters.minAge);
  }
  
  if (filters.maxAge) {
    allUsers = allUsers.filter(user => user.age <= filters.maxAge);
  }
  
  return {
    users: allUsers,
    total: allUsers.length
  };
};

// 获取单个用户详情
export const getUserById = (id) => {
  const users = generateUsers(100);
  return users.find(user => user.id === id) || generateUser();
};
