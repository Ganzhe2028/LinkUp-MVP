import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'partner', text: '您好！看到您在寻找技术合伙人，我对您的项目很感兴趣。', time: '10:30' },
    { id: 2, sender: 'me', text: '太好了！能简单介绍一下您的技术背景和经验吗？', time: '10:32' },
    { id: 3, sender: 'partner', text: '我有8年全栈开发经验，主导过3个SaaS产品从0到1的开发，熟悉React、Node.js和云架构。', time: '10:35' }
  ]);
  
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: 'me',
        text: newMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="rounded-2xl">
        <CardHeader className="border-b">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">张明</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>张明</CardTitle>
              <p className="text-sm text-gray-500">资深投资人 | 科技领域</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[500px] overflow-y-auto p-4 space-y-6">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.sender === 'me' 
                      ? 'bg-blue-100 rounded-br-none' 
                      : 'bg-gray-100 rounded-bl-none'
                  }`}
                >
                  <p>{message.text}</p>
                  <p className="text-xs text-gray-500 mt-1 text-right">{message.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t p-4 flex gap-2">
            <Input 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="输入消息..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="rounded-xl"
            />
            <Button onClick={sendMessage} className="rounded-xl">发送</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chat;
