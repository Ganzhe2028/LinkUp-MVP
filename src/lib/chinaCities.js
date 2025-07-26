// 中国城市数据库 - 用于智能搜索的语义扩展
export const CHINA_CITIES = {
  // 直辖市
  '北京': { province: '北京', keywords: ['北京', '首都', '帝都', 'beijing'] },
  '上海': { province: '上海', keywords: ['上海', '魔都', 'shanghai'] },
  '天津': { province: '天津', keywords: ['天津', '津门', 'tianjin'] },
  '重庆': { province: '重庆', keywords: ['重庆', '山城', 'chongqing'] },

  // 广东省
  '广州': { province: '广东', keywords: ['广州', '羊城', 'guangzhou'] },
  '深圳': { province: '广东', keywords: ['深圳', '鹏城', 'shenzhen'] },
  '东莞': { province: '广东', keywords: ['东莞', 'dongguan'] },
  '佛山': { province: '广东', keywords: ['佛山', 'foshan'] },
  '珠海': { province: '广东', keywords: ['珠海', 'zhuhai'] },
  '中山': { province: '广东', keywords: ['中山', 'zhongshan'] },
  '惠州': { province: '广东', keywords: ['惠州', 'huizhou'] },
  '汕头': { province: '广东', keywords: ['汕头', 'shantou'] },
  '江门': { province: '广东', keywords: ['江门', 'jiangmen'] },
  '湛江': { province: '广东', keywords: ['湛江', 'zhanjiang'] },
  '肇庆': { province: '广东', keywords: ['肇庆', 'zhaoqing'] },
  '清远': { province: '广东', keywords: ['清远', 'qingyuan'] },

  // 江苏省
  '南京': { province: '江苏', keywords: ['南京', '金陵', 'nanjing'] },
  '苏州': { province: '江苏', keywords: ['苏州', '姑苏', 'suzhou'] },
  '无锡': { province: '江苏', keywords: ['无锡', 'wuxi'] },
  '常州': { province: '江苏', keywords: ['常州', 'changzhou'] },
  '徐州': { province: '江苏', keywords: ['徐州', 'xuzhou'] },
  '南通': { province: '江苏', keywords: ['南通', 'nantong'] },
  '扬州': { province: '江苏', keywords: ['扬州', 'yangzhou'] },
  '镇江': { province: '江苏', keywords: ['镇江', 'zhenjiang'] },
  '泰州': { province: '江苏', keywords: ['泰州', 'taizhou'] },
  '盐城': { province: '江苏', keywords: ['盐城', 'yancheng'] },

  // 浙江省
  '杭州': { province: '浙江', keywords: ['杭州', '杭城', 'hangzhou'] },
  '宁波': { province: '浙江', keywords: ['宁波', 'ningbo'] },
  '温州': { province: '浙江', keywords: ['温州', 'wenzhou'] },
  '嘉兴': { province: '浙江', keywords: ['嘉兴', 'jiaxing'] },
  '绍兴': { province: '浙江', keywords: ['绍兴', 'shaoxing'] },
  '金华': { province: '浙江', keywords: ['金华', 'jinhua'] },
  '台州': { province: '浙江', keywords: ['台州', 'taizhou'] },
  '湖州': { province: '浙江', keywords: ['湖州', 'huzhou'] },
  '丽水': { province: '浙江', keywords: ['丽水', 'lishui'] },

  // 山东省
  '济南': { province: '山东', keywords: ['济南', '泉城', 'jinan'] },
  '青岛': { province: '山东', keywords: ['青岛', 'qingdao'] },
  '烟台': { province: '山东', keywords: ['烟台', 'yantai'] },
  '潍坊': { province: '山东', keywords: ['潍坊', 'weifang'] },
  '临沂': { province: '山东', keywords: ['临沂', 'linyi'] },
  '淄博': { province: '山东', keywords: ['淄博', 'zibo'] },
  '济宁': { province: '山东', keywords: ['济宁', 'jining'] },
  '泰安': { province: '山东', keywords: ['泰安', 'taian'] },

  // 河南省
  '郑州': { province: '河南', keywords: ['郑州', '绿城', 'zhengzhou'] },
  '洛阳': { province: '河南', keywords: ['洛阳', 'luoyang'] },
  '开封': { province: '河南', keywords: ['开封', 'kaifeng'] },
  '新乡': { province: '河南', keywords: ['新乡', 'xinxiang'] },
  '南阳': { province: '河南', keywords: ['南阳', 'nanyang'] },

  // 四川省
  '成都': { province: '四川', keywords: ['成都', '蓉城', 'chengdu'] },
  '绵阳': { province: '四川', keywords: ['绵阳', 'mianyang'] },
  '德阳': { province: '四川', keywords: ['德阳', 'deyang'] },
  '宜宾': { province: '四川', keywords: ['宜宾', 'yibin'] },
  '南充': { province: '四川', keywords: ['南充', 'nanchong'] },

  // 湖北省
  '武汉': { province: '湖北', keywords: ['武汉', '江城', 'wuhan'] },
  '宜昌': { province: '湖北', keywords: ['宜昌', 'yichang'] },
  '襄阳': { province: '湖北', keywords: ['襄阳', 'xiangyang'] },
  '荆州': { province: '湖北', keywords: ['荆州', 'jingzhou'] },

  // 湖南省
  '长沙': { province: '湖南', keywords: ['长沙', '星城', 'changsha'] },
  '株洲': { province: '湖南', keywords: ['株洲', 'zhuzhou'] },
  '湘潭': { province: '湖南', keywords: ['湘潭', 'xiangtan'] },
  '衡阳': { province: '湖南', keywords: ['衡阳', 'hengyang'] },

  // 福建省
  '福州': { province: '福建', keywords: ['福州', '榕城', 'fuzhou'] },
  '厦门': { province: '福建', keywords: ['厦门', '鹭岛', 'xiamen'] },
  '泉州': { province: '福建', keywords: ['泉州', 'quanzhou'] },
  '漳州': { province: '福建', keywords: ['漳州', 'zhangzhou'] },

  // 陕西省
  '西安': { province: '陕西', keywords: ['西安', '长安', 'xian'] },
  '宝鸡': { province: '陕西', keywords: ['宝鸡', 'baoji'] },
  '咸阳': { province: '陕西', keywords: ['咸阳', 'xianyang'] },
  '渭南': { province: '陕西', keywords: ['渭南', 'weinan'] },

  // 安徽省
  '合肥': { province: '安徽', keywords: ['合肥', '庐州', 'hefei'] },
  '芜湖': { province: '安徽', keywords: ['芜湖', 'wuhu'] },
  '蚌埠': { province: '安徽', keywords: ['蚌埠', 'bengbu'] },
  '马鞍山': { province: '安徽', keywords: ['马鞍山', 'maanshan'] },

  // 河北省
  '石家庄': { province: '河北', keywords: ['石家庄', 'shijiazhuang'] },
  '唐山': { province: '河北', keywords: ['唐山', 'tangshan'] },
  '保定': { province: '河北', keywords: ['保定', 'baoding'] },
  '秦皇岛': { province: '河北', keywords: ['秦皇岛', 'qinhuangdao'] },

  // 辽宁省
  '沈阳': { province: '辽宁', keywords: ['沈阳', '盛京', 'shenyang'] },
  '大连': { province: '辽宁', keywords: ['大连', '滨城', 'dalian'] },
  '鞍山': { province: '辽宁', keywords: ['鞍山', 'anshan'] },
  '抚顺': { province: '辽宁', keywords: ['抚顺', 'fushun'] },

  // 江西省
  '南昌': { province: '江西', keywords: ['南昌', '洪城', 'nanchang'] },
  '赣州': { province: '江西', keywords: ['赣州', 'ganzhou'] },
  '九江': { province: '江西', keywords: ['九江', 'jiujiang'] },
  '上饶': { province: '江西', keywords: ['上饶', 'shangrao'] },

  // 山西省
  '太原': { province: '山西', keywords: ['太原', '龙城', 'taiyuan'] },
  '大同': { province: '山西', keywords: ['大同', 'datong'] },
  '运城': { province: '山西', keywords: ['运城', 'yuncheng'] },
  '临汾': { province: '山西', keywords: ['临汾', 'linfen'] },

  // 黑龙江省
  '哈尔滨': { province: '黑龙江', keywords: ['哈尔滨', '冰城', 'harbin'] },
  '齐齐哈尔': { province: '黑龙江', keywords: ['齐齐哈尔', 'qiqihaer'] },
  '大庆': { province: '黑龙江', keywords: ['大庆', 'daqing'] },
  '牡丹江': { province: '黑龙江', keywords: ['牡丹江', 'mudanjiang'] },

  // 吉林省
  '长春': { province: '吉林', keywords: ['长春', '春城', 'changchun'] },
  '吉林': { province: '吉林', keywords: ['吉林', 'jilin'] },
  '延边': { province: '吉林', keywords: ['延边', 'yanbian'] },
  '四平': { province: '吉林', keywords: ['四平', 'siping'] },

  // 云南省
  '昆明': { province: '云南', keywords: ['昆明', '春城', 'kunming'] },
  '大理': { province: '云南', keywords: ['大理', 'dali'] },
  '丽江': { province: '云南', keywords: ['丽江', 'lijiang'] },
  '西双版纳': { province: '云南', keywords: ['西双版纳', 'xishuangbanna'] },

  // 贵州省
  '贵阳': { province: '贵州', keywords: ['贵阳', '林城', 'guiyang'] },
  '遵义': { province: '贵州', keywords: ['遵义', 'zunyi'] },
  '六盘水': { province: '贵州', keywords: ['六盘水', 'liupanshui'] },
  '安顺': { province: '贵州', keywords: ['安顺', 'anshun'] },

  // 广西壮族自治区
  '南宁': { province: '广西', keywords: ['南宁', '绿城', 'nanning'] },
  '桂林': { province: '广西', keywords: ['桂林', 'guilin'] },
  '柳州': { province: '广西', keywords: ['柳州', 'liuzhou'] },
  '北海': { province: '广西', keywords: ['北海', 'beihai'] },

  // 甘肃省
  '兰州': { province: '甘肃', keywords: ['兰州', '金城', 'lanzhou'] },
  '敦煌': { province: '甘肃', keywords: ['敦煌', 'dunhuang'] },
  '嘉峪关': { province: '甘肃', keywords: ['嘉峪关', 'jiayuguan'] },
  '天水': { province: '甘肃', keywords: ['天水', 'tianshui'] },

  // 内蒙古自治区
  '呼和浩特': { province: '内蒙古', keywords: ['呼和浩特', 'hohhot'] },
  '包头': { province: '内蒙古', keywords: ['包头', 'baotou'] },
  '鄂尔多斯': { province: '内蒙古', keywords: ['鄂尔多斯', 'eerduosi'] },
  '赤峰': { province: '内蒙古', keywords: ['赤峰', 'chifeng'] },

  // 新疆维吾尔自治区
  '乌鲁木齐': { province: '新疆', keywords: ['乌鲁木齐', 'wulumuqi'] },
  '喀什': { province: '新疆', keywords: ['喀什', 'kashi'] },
  '伊犁': { province: '新疆', keywords: ['伊犁', 'yili'] },
  '吐鲁番': { province: '新疆', keywords: ['吐鲁番', 'tulufan'] },

  // 宁夏回族自治区
  '银川': { province: '宁夏', keywords: ['银川', 'yinchuan'] },
  '吴忠': { province: '宁夏', keywords: ['吴忠', 'wuzhong'] },
  '石嘴山': { province: '宁夏', keywords: ['石嘴山', 'shizuishan'] },

  // 青海省
  '西宁': { province: '青海', keywords: ['西宁', 'xining'] },
  '海东': { province: '青海', keywords: ['海东', 'haidong'] },
  '格尔木': { province: '青海', keywords: ['格尔木', 'geermu'] },

  // 西藏自治区
  '拉萨': { province: '西藏', keywords: ['拉萨', 'lasa'] },
  '日喀则': { province: '西藏', keywords: ['日喀则', 'rikaze'] },
  '林芝': { province: '西藏', keywords: ['林芝', 'linzhi'] }
};

// 获取所有城市名称
export const getAllCityNames = () => Object.keys(CHINA_CITIES);

// 获取所有省份
export const getAllProvinces = () => {
  const provinces = new Set();
  Object.values(CHINA_CITIES).forEach(city => provinces.add(city.province));
  return Array.from(provinces);
};

// 根据关键词查找相关城市
export const findRelatedCities = (keyword) => {
  const results = [];
  const searchTerm = keyword.toLowerCase();
  
  for (const [city, data] of Object.entries(CHINA_CITIES)) {
    const isMatch = data.keywords.some(k => 
      k.toLowerCase().includes(searchTerm) || 
      searchTerm.includes(k.toLowerCase())
    );
    
    if (isMatch) {
      results.push({
        city,
        province: data.province,
        keywords: data.keywords,
        matchType: 'city'
      });
    }
  }
  
  return results;
};

// 检查是否为中国城市
export const isChinaCity = (cityName) => {
  return CHINA_CITIES.hasOwnProperty(cityName);
};

// 获取城市对应的省份
export const getProvinceByCity = (cityName) => {
  return CHINA_CITIES[cityName]?.province || null;
};

// 获取省份下的所有城市
export const getCitiesByProvince = (province) => {
  return Object.entries(CHINA_CITIES)
    .filter(([_, data]) => data.province === province)
    .map(([city]) => city);
};
