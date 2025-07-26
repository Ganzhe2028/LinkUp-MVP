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

// 地区列表
const regions = [
  '北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安', '南京', '苏州',
  '天津', '重庆', '青岛', '大连', '厦门', '长沙', '郑州', '济南', '福州', '合肥',
  '纽约', '伦敦', '东京', '新加坡', '香港', '悉尼', '多伦多', '温哥华', '洛杉矶', '旧金山'
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
const generateBio = () => {
  const templates = [
    `我是一名${faker.helpers.arrayElement(professions)}，拥有${faker.number.int({ min: 3, max: 15 })}年的行业经验。专注于${faker.helpers.arrayElement(skills)}领域，曾参与多个大型项目的开发与管理。热爱技术创新，期待与志同道合的伙伴合作。`,
    `来自${faker.helpers.arrayElement(regions)}的${faker.helpers.arrayElement(professions)}，擅长${faker.helpers.arrayElement(skills)}和${faker.helpers.arrayElement(skills)}。相信技术改变世界，致力于用创新解决实际问题。`,
    `资深${faker.helpers.arrayElement(professions)}，在${faker.helpers.arrayElement(industries)}领域有丰富经验。追求极致的用户体验，注重团队协作与知识分享。`
  ];
  return faker.helpers.arrayElement(templates);
};

// 生成单个用户数据
export const generateUser = () => {
  const gender = faker.helpers.arrayElement(['男', '女']);
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
    profession: faker.helpers.arrayElement(professions),
    region: faker.helpers.arrayElement(regions),
    bio: generateBio(),
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
