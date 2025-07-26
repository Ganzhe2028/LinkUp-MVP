import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RocketIcon, UsersIcon, StarIcon } from 'lucide-react';

const Carousel = () => {
  const slides = [
    {
      title: "连接创业者、投资人与行业专家",
      description: "基于AI智能算法，精准匹配您的商业需求与人才资源",
      buttonText: "立即体验",
      bgGradient: "from-blue-600 via-purple-600 to-blue-800",
      icon: <RocketIcon className="h-16 w-16 text-white/80" />
    },
    {
      title: "智能匹配优质合作伙伴",
      description: "精准对接创业资源，加速项目成长",
      buttonText: "了解更多",
      bgGradient: "from-green-600 via-teal-600 to-blue-600",
      icon: <UsersIcon className="h-16 w-16 text-white/80" />
    },
    {
      title: "LinkUp一站式创业服务平台",
      description: "从人才匹配到资源对接，全程专业支持",
      buttonText: "查看案例",
      bgGradient: "from-purple-600 via-pink-600 to-red-600",
      icon: <StarIcon className="h-16 w-16 text-white/80" />
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className={`w-full h-full bg-gradient-to-br ${slide.bgGradient} relative overflow-hidden`}>
            {/* 装饰性图案 */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-10 w-32 h-32 border border-white rounded-full"></div>
              <div className="absolute bottom-20 right-32 w-16 h-16 border border-white rounded-full"></div>
              <div className="absolute top-1/2 right-20 w-8 h-8 bg-white rounded-full"></div>
            </div>
            
            <div className="absolute inset-0 flex items-center">
              <div className="flex items-center justify-between w-full px-8 md:px-16">
                <div className="flex-1 text-white max-w-3xl">
                  <h1 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-xl mb-8 text-white/90">{slide.description}</p>
                  <div className="flex gap-4">
                    <Button className="bg-white text-blue-600 hover:bg-blue-50 h-12 px-8 text-lg rounded-xl">
                      {slide.buttonText}
                    </Button>
                    <Button variant="outline" className="h-12 px-8 text-lg rounded-xl border-white text-white hover:bg-white/10">
                      了解更多
                    </Button>
                  </div>
                </div>
                <div className="hidden lg:flex items-center justify-center flex-shrink-0 ml-8">
                  {slide.icon}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
