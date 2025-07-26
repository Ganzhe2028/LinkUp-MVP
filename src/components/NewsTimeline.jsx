import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const NewsTimeline = () => {
  const newsItems = [
    {
      date: "2023-12-15",
      title: "LinkUp平台用户突破10万大关",
      description: "LinkUp平台注册用户数突破10万，服务覆盖全国200多个城市"
    },
    {
      date: "2023-11-28",
      title: "荣获年度最佳创业服务平台",
      description: "LinkUp在2023中国创新创业大会上获得行业认可"
    },
    {
      date: "2023-11-10",
      title: "AI匹配算法升级",
      description: "LinkUp最新版匹配算法准确率提升至92%，大幅提升对接效率"
    },
    {
      date: "2023-10-25",
      title: "新增行业专家认证功能",
      description: "LinkUp平台推出行业专家认证体系，提升人才可信度"
    }
  ];

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">最新动态</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          了解LinkUp平台最新进展和行业资讯
        </p>
      </div>
      
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>
        
        <div className="space-y-12">
          {newsItems.map((item, index) => (
            <div 
              key={index} 
              className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
            >
              <div className="w-1/2 px-8">
                <Card className="h-full hover:shadow-lg transition-shadow rounded-2xl">
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="w-1/2 flex justify-center">
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-600 border-4 border-white"></div>
                </div>
              </div>
              
              <div className="w-1/2 px-8">
                <div className="bg-gray-100 rounded-2xl p-6 h-full flex items-center justify-center">
                  <img 
                    src={`https://nocode.meituan.com/photo/search?keyword=news,update&width=400&height=300&seed=${index}`} 
                    alt={item.title}
                    className="mx-auto object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsTimeline;
