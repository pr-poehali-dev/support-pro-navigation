import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const EMAILS = [
  { id: 1, from: "info@alpha.ru", subject: "Запрос на подключение API", preview: "Добрый день! Хотели бы узнать о возможности интеграции...", date: "09:45", unread: true, priority: "high" },
  { id: 2, from: "support@beta.com", subject: "Ошибка при загрузке файлов", preview: "При попытке загрузить документ в формате PDF возникает ошибка...", date: "08:30", unread: true, priority: "high" },
  { id: 3, from: "kozlov@mail.ru", subject: "Вопрос по тарифу «Бизнес»", preview: "Подскажите, есть ли возможность перейти на годовой тариф...", date: "Вчера", unread: false, priority: "medium" },
  { id: 4, from: "gamma@corp.ru", subject: "Благодарность за быстрое решение", preview: "Хочу поблагодарить вашу команду за оперативное решение...", date: "Вчера", unread: false, priority: "low" },
  { id: 5, from: "delta@business.ru", subject: "Не приходят уведомления", preview: "Перестали приходить email-уведомления о статусе заказа...", date: "21.03", unread: false, priority: "medium" },
  { id: 6, from: "morozova@ip.ru", subject: "Возврат средств за март", preview: "Прошу оформить возврат средств за неиспользованный период...", date: "21.03", unread: false, priority: "medium" },
];

const PRIORITY_DOT: Record<string, string> = {
  high: "bg-red-500",
  medium: "bg-amber-500",
  low: "bg-green-500",
};

export default function Mail() {
  return (
    <DashboardLayout title="Почта" subtitle="Входящие обращения клиентов по email">
      <div className="flex gap-4 mb-5">
        <Button className="gap-2"><Icon name="PenLine" size={16} />Написать</Button>
        <Button variant="outline" className="gap-2"><Icon name="RefreshCw" size={16} />Обновить</Button>
        <Button variant="outline" className="gap-2"><Icon name="Link" size={16} />Подключить почту</Button>
      </div>

      <div className="bg-card rounded-xl border">
        <div className="px-5 py-3 border-b flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-foreground">Входящие</span>
            <Badge variant="secondary" className="text-xs">{EMAILS.filter(e => e.unread).length} новых</Badge>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="Filter" size={14} />
            Фильтр
          </div>
        </div>

        <div className="divide-y">
          {EMAILS.map((email, i) => (
            <div
              key={email.id}
              className={`px-5 py-4 flex items-start gap-4 cursor-pointer transition-colors hover:bg-muted/50 animate-fade-in ${email.unread ? "bg-blue-50/50" : ""}`}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className={`w-2 h-2 rounded-full mt-2 ${PRIORITY_DOT[email.priority]}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm ${email.unread ? "font-semibold text-foreground" : "text-foreground"}`}>{email.from}</span>
                  <span className="text-xs text-muted-foreground">{email.date}</span>
                </div>
                <p className={`text-sm ${email.unread ? "font-medium text-foreground" : "text-muted-foreground"}`}>{email.subject}</p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{email.preview}</p>
              </div>
              {email.unread && <div className="w-2 h-2 rounded-full bg-primary mt-2" />}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
