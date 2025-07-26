import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { PlusIcon, XIcon } from 'lucide-react';

const Profile = () => {
  const [skills, setSkills] = useState(['产品设计', '融资']);
  const [newSkill, setNewSkill] = useState('');
  const [industries, setIndustries] = useState(['科技', '金融科技']);
  const [newIndustry, setNewIndustry] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const addIndustry = () => {
    if (newIndustry.trim() && !industries.includes(newIndustry.trim())) {
      setIndustries([...industries, newIndustry.trim()]);
      setNewIndustry('');
    }
  };

  const removeIndustry = (industry) => {
    setIndustries(industries.filter(i => i !== industry));
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>完善个人资料</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>姓名</Label>
                <Input placeholder="请输入真实姓名" className="rounded-xl" />
              </div>
              
              <div className="space-y-2">
                <Label>职业身份</Label>
                <div className="flex space-x-2">
                  <Button variant="outline" className="rounded-xl">创业者</Button>
                  <Button variant="outline" className="rounded-xl">投资人</Button>
                  <Button variant="outline" className="rounded-xl">行业专家</Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>个人简介</Label>
              <Textarea 
                placeholder="简要介绍您的专业背景、成就和专长领域..." 
                rows={3}
                className="rounded-xl"
              />
            </div>
            
            <div className="space-y-2">
              <Label>核心能力</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((skill) => (
                  <Badge key={skill} className="flex items-center gap-1 rounded-xl">
                    {skill}
                    <button onClick={() => removeSkill(skill)}>
                      <XIcon className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input 
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="添加新能力" 
                  className="rounded-xl"
                />
                <Button variant="outline" onClick={addSkill} className="rounded-xl">
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>行业领域</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {industries.map((industry) => (
                  <Badge key={industry} variant="secondary" className="flex items-center gap-1 rounded-xl">
                    {industry}
                    <button onClick={() => removeIndustry(industry)}>
                      <XIcon className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input 
                  value={newIndustry}
                  onChange={(e) => setNewIndustry(e.target.value)}
                  placeholder="添加新行业" 
                  className="rounded-xl"
                />
                <Button variant="outline" onClick={addIndustry} className="rounded-xl">
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>项目经验</Label>
              <Textarea 
                placeholder="描述您的项目经验、成就和关键贡献..." 
                rows={4}
                className="rounded-xl"
              />
            </div>
            
            <div className="space-y-2">
              <Label>资源需求</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <Button variant="outline" className="rounded-xl">资金支持</Button>
                <Button variant="outline" className="rounded-xl">技术合作</Button>
                <Button variant="outline" className="rounded-xl">市场资源</Button>
                <Button variant="outline" className="rounded-xl">人才招募</Button>
                <Button variant="outline" className="rounded-xl">战略咨询</Button>
                <Button variant="outline" className="rounded-xl">渠道拓展</Button>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl">保存资料</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
