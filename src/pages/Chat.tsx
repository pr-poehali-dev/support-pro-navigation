import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const CHATS = [
  { id: 1, name: "Алексей М.", company: "ООО «Альфа»", lastMsg: "Спасибо, вопрос решён!", time: "09:45", unread: 0, online: false },
  { id: 2, name: "Елена К.", company: "ИП Козлов", lastMsg: "Когда будет готов отчёт?", time: "09:32", unread: 2, online: true },
  { id: 3, name: "Дмитрий В.", company: "ЗАО «Бета»", lastMsg: "Прикрепил скриншот ошибки", time: "09:15", unread: 1, online: true },
  { id: 4, name: "Марина С.", company: "ООО «Гамма»", lastMsg: "Добрый день, нужна помощь", time: "08:50", unread: 3, online: true },
  { id: 5, name: "Игорь П.", company: "АО «Дельта»", lastMsg: "Понял, жду ответа", time: "Вчера", unread: 0, online: false },
];

const MESSAGES = [
  { from: "client", text: "Добрый день! У меня проблема с авторизацией.", time: "09:10" },
  { from: "client", text: "Ввожу логин и пароль, но система выдаёт ошибку 403.", time: "09:11" },
  { from: "operator", text: "Добрый день, Елена! Давайте разберёмся. Какой браузер вы используете?", time: "09:15" },
  { from: "client", text: "Google Chrome, последняя версия", time: "09:18" },
  { from: "operator", text: "Попробуйте очистить кэш и cookies, затем попробуйте снова.", time: "09:20" },
  { from: "client", text: "Сделала, но проблема осталась. Может пароль сбросить?", time: "09:25" },
  { from: "operator", text: "Сейчас сброшу пароль и отправлю новый на вашу почту.", time: "09:28" },
  { from: "client", text: "Когда будет готов отчёт?", time: "09:32" },
];

export default function Chat() {
  const [activeChat, setActiveChat] = useState(2);
  const [message, setMessage] = useState("");

  return (
    <DashboardLayout title="Чат" subtitle="Общение с клиентами в реальном времени">
      <div className="bg-card rounded-xl border flex" style={{ height: "calc(100vh - 200px)" }}>
        <div className="w-80 border-r flex flex-col">
          <div className="p-3 border-b">
            <div className="relative">
              <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Поиск чатов..." className="pl-8 h-8 text-sm" />
            </div>
          </div>
          <div className="flex-1 overflow-auto divide-y">
            {CHATS.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`w-full px-4 py-3 flex items-start gap-3 text-left transition-colors ${activeChat === chat.id ? "bg-primary/5" : "hover:bg-muted/50"}`}
              >
                <div className="relative">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold text-white" style={{ background: "hsl(220 50% 40%)" }}>
                    {chat.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  {chat.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-card" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground truncate">{chat.name}</span>
                    <span className="text-[10px] text-muted-foreground">{chat.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{chat.lastMsg}</p>
                </div>
                {chat.unread > 0 && (
                  <span className="min-w-[18px] h-[18px] rounded-full bg-primary text-primary-foreground text-[10px] font-semibold flex items-center justify-center">{chat.unread}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="px-5 py-3 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white" style={{ background: "hsl(220 50% 40%)" }}>ЕК</div>
              <div>
                <p className="text-sm font-medium text-foreground">Елена К.</p>
                <p className="text-[11px] text-green-600">В сети</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm"><Icon name="Phone" size={16} /></Button>
              <Button variant="ghost" size="sm"><Icon name="MoreVertical" size={16} /></Button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-5 space-y-3">
            {MESSAGES.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "operator" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
                  msg.from === "operator"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                }`}>
                  <p>{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.from === "operator" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="px-5 py-3 border-t flex items-center gap-3">
            <Button variant="ghost" size="sm"><Icon name="Paperclip" size={16} /></Button>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Введите сообщение..."
              className="flex-1 h-9"
            />
            <Button size="sm" className="h-9 px-4">
              <Icon name="Send" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
