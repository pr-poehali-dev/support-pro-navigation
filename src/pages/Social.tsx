import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const CHANNELS = [
  { name: "Telegram", icon: "Send", connected: true, messages: 12, color: "bg-blue-500" },
  { name: "ВКонтакте", icon: "MessageCircle", connected: true, messages: 5, color: "bg-blue-600" },
  { name: "WhatsApp", icon: "Phone", connected: false, messages: 0, color: "bg-green-500" },
  { name: "Viber", icon: "Smartphone", connected: false, messages: 0, color: "bg-purple-500" },
];

const SOCIAL_MESSAGES = [
  { channel: "Telegram", from: "@alexey_m", text: "Не могу оплатить заказ", time: "10:15", status: "new" },
  { channel: "Telegram", from: "@elena_s", text: "Когда доставка?", time: "09:55", status: "new" },
  { channel: "ВКонтакте", from: "Дмитрий В.", text: "Хочу вернуть товар", time: "09:40", status: "in_progress" },
  { channel: "Telegram", from: "@marina_k", text: "Спасибо за помощь!", time: "09:20", status: "resolved" },
  { channel: "ВКонтакте", from: "Ольга Н.", text: "Не работает промокод", time: "09:05", status: "new" },
];

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  new: { label: "Новое", cls: "bg-blue-50 text-blue-700 border-blue-200" },
  in_progress: { label: "В работе", cls: "bg-amber-50 text-amber-700 border-amber-200" },
  resolved: { label: "Решено", cls: "bg-green-50 text-green-700 border-green-200" },
};

export default function Social() {
  return (
    <DashboardLayout title="Соц. сети" subtitle="Обращения из мессенджеров и социальных сетей">
      <div className="grid grid-cols-4 gap-4 mb-6">
        {CHANNELS.map((ch, i) => (
          <div key={i} className="bg-card rounded-xl border p-4 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${ch.color} flex items-center justify-center`}>
                <Icon name={ch.icon} size={18} className="text-white" />
              </div>
              {ch.connected ? (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-50 text-green-600 font-medium">Активен</span>
              ) : (
                <Button size="sm" variant="outline" className="h-6 text-[10px] px-2">Подключить</Button>
              )}
            </div>
            <p className="text-sm font-medium text-foreground">{ch.name}</p>
            {ch.connected && <p className="text-xs text-muted-foreground">{ch.messages} сообщений</p>}
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border">
        <div className="px-5 py-3 border-b">
          <h3 className="text-sm font-semibold text-foreground">Последние сообщения</h3>
        </div>
        <div className="divide-y">
          {SOCIAL_MESSAGES.map((msg, i) => (
            <div key={i} className="px-5 py-4 flex items-center gap-4 hover:bg-muted/50 transition-colors cursor-pointer animate-fade-in" style={{ animationDelay: `${i * 40}ms` }}>
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                <Icon name="User" size={16} className="text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{msg.from}</span>
                  <span className="text-[10px] text-muted-foreground px-1.5 py-0.5 bg-muted rounded">{msg.channel}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{msg.text}</p>
              </div>
              <span className="text-xs text-muted-foreground">{msg.time}</span>
              <Badge variant="outline" className={STATUS_MAP[msg.status].cls}>{STATUS_MAP[msg.status].label}</Badge>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
