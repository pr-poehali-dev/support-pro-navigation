import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const MOCK_TICKETS = [
  { id: "TK-001", subject: "Не работает авторизация в личном кабинете", client: "ООО «Альфа»", priority: "high", status: "open", operator: "Сидоров К.Н.", date: "23.03.2026", time: "09:15" },
  { id: "TK-002", subject: "Вопрос по тарифам и оплате", client: "ИП Козлов", priority: "medium", status: "in_progress", operator: "Сидоров К.Н.", date: "23.03.2026", time: "08:42" },
  { id: "TK-003", subject: "Ошибка 500 при загрузке документов", client: "ЗАО «Бета»", priority: "high", status: "open", operator: "—", date: "22.03.2026", time: "17:30" },
  { id: "TK-004", subject: "Запрос на интеграцию с 1С", client: "ООО «Гамма»", priority: "low", status: "closed", operator: "Сидоров К.Н.", date: "22.03.2026", time: "14:10" },
  { id: "TK-005", subject: "Проблема с отправкой email-уведомлений", client: "ООО «Дельта»", priority: "medium", status: "in_progress", operator: "Сидоров К.Н.", date: "22.03.2026", time: "11:55" },
  { id: "TK-006", subject: "Не приходят SMS-коды подтверждения", client: "ИП Морозова", priority: "high", status: "open", operator: "—", date: "21.03.2026", time: "16:20" },
  { id: "TK-007", subject: "Запрос на выгрузку данных за квартал", client: "АО «Эпсилон»", priority: "low", status: "closed", operator: "Сидоров К.Н.", date: "21.03.2026", time: "10:00" },
];

const STATUS_MAP: Record<string, { label: string; className: string }> = {
  open: { label: "Открыт", className: "bg-blue-50 text-blue-700 border-blue-200" },
  in_progress: { label: "В работе", className: "bg-amber-50 text-amber-700 border-amber-200" },
  closed: { label: "Закрыт", className: "bg-green-50 text-green-700 border-green-200" },
};

const PRIORITY_MAP: Record<string, { label: string; color: string }> = {
  high: { label: "Высокий", color: "text-red-500" },
  medium: { label: "Средний", color: "text-amber-500" },
  low: { label: "Низкий", color: "text-green-500" },
};

export default function Tickets() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = MOCK_TICKETS.filter((t) => {
    const matchSearch = t.subject.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || t.status === filter;
    return matchSearch && matchFilter;
  });

  const counts = {
    all: MOCK_TICKETS.length,
    open: MOCK_TICKETS.filter((t) => t.status === "open").length,
    in_progress: MOCK_TICKETS.filter((t) => t.status === "in_progress").length,
    closed: MOCK_TICKETS.filter((t) => t.status === "closed").length,
  };

  return (
    <DashboardLayout title="Тикеты" subtitle="Управление обращениями клиентов">
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Всего", value: counts.all, icon: "Inbox", bg: "bg-blue-50", iconColor: "text-blue-600" },
          { label: "Открытых", value: counts.open, icon: "CircleDot", bg: "bg-orange-50", iconColor: "text-orange-600" },
          { label: "В работе", value: counts.in_progress, icon: "Clock", bg: "bg-amber-50", iconColor: "text-amber-600" },
          { label: "Закрытых", value: counts.closed, icon: "CheckCircle2", bg: "bg-green-50", iconColor: "text-green-600" },
        ].map((stat, i) => (
          <div key={i} className="bg-card rounded-xl border p-4 flex items-center gap-4 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${stat.bg}`}>
              <Icon name={stat.icon} size={20} className={stat.iconColor} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border">
        <div className="p-4 border-b flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {[
              { key: "all", label: "Все" },
              { key: "open", label: "Открытые" },
              { key: "in_progress", label: "В работе" },
              { key: "closed", label: "Закрытые" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                  filter === f.key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск тикетов..."
                className="pl-9 w-64 h-9"
              />
            </div>
            <Button size="sm" className="h-9 gap-2">
              <Icon name="Plus" size={16} />
              Новый тикет
            </Button>
          </div>
        </div>

        <div className="divide-y">
          {filtered.map((ticket, i) => (
            <div
              key={ticket.id}
              className="px-5 py-4 flex items-center gap-4 hover:bg-muted/50 transition-colors cursor-pointer animate-fade-in"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
                  <Icon name="Circle" size={6} className={PRIORITY_MAP[ticket.priority].color} fill="currentColor" />
                  <span className="text-sm font-medium text-foreground truncate">{ticket.subject}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icon name="Building2" size={12} />
                    {ticket.client}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="User" size={12} />
                    {ticket.operator}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Calendar" size={12} />
                    {ticket.date} {ticket.time}
                  </span>
                </div>
              </div>
              <Badge variant="outline" className={STATUS_MAP[ticket.status].className}>
                {STATUS_MAP[ticket.status].label}
              </Badge>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            <Icon name="Inbox" size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Тикеты не найдены</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
