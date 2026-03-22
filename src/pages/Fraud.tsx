import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const FRAUD_ITEMS = [
  { id: "FR-001", type: "Дублирование аккаунтов", client: "ООО «Альфа»", risk: "high", details: "Обнаружено 3 аккаунта с одного IP-адреса", date: "23.03.2026", status: "active" },
  { id: "FR-002", type: "Подозрительная активность", client: "ИП Козлов", risk: "medium", details: "47 запросов за 1 минуту с одного токена", date: "23.03.2026", status: "active" },
  { id: "FR-003", type: "Подмена данных", client: "Неизвестный", risk: "high", details: "Попытка SQL-инъекции в форме обратной связи", date: "22.03.2026", status: "blocked" },
  { id: "FR-004", type: "Массовые возвраты", client: "ЗАО «Бета»", risk: "medium", details: "12 запросов на возврат за 2 дня", date: "22.03.2026", status: "investigating" },
  { id: "FR-005", type: "Брутфорс авторизации", client: "Неизвестный", risk: "high", details: "248 неудачных попыток входа за 10 минут", date: "21.03.2026", status: "blocked" },
  { id: "FR-006", type: "Спам-рассылка", client: "bot@spam.net", risk: "low", details: "Массовая отправка сообщений через форму", date: "21.03.2026", status: "resolved" },
];

const RISK_MAP: Record<string, { label: string; cls: string }> = {
  high: { label: "Высокий", cls: "bg-red-50 text-red-700 border-red-200" },
  medium: { label: "Средний", cls: "bg-amber-50 text-amber-700 border-amber-200" },
  low: { label: "Низкий", cls: "bg-green-50 text-green-700 border-green-200" },
};

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  active: { label: "Активная угроза", cls: "bg-red-50 text-red-700 border-red-200" },
  investigating: { label: "Расследование", cls: "bg-amber-50 text-amber-700 border-amber-200" },
  blocked: { label: "Заблокировано", cls: "bg-blue-50 text-blue-700 border-blue-200" },
  resolved: { label: "Решено", cls: "bg-green-50 text-green-700 border-green-200" },
};

export default function Fraud() {
  return (
    <DashboardLayout title="Фрод-мониторинг" subtitle="Обнаружение подозрительной активности и угроз">
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Активные угрозы", value: FRAUD_ITEMS.filter(f => f.status === "active").length, icon: "ShieldAlert", bg: "bg-red-50", iconColor: "text-red-600" },
          { label: "Расследуется", value: FRAUD_ITEMS.filter(f => f.status === "investigating").length, icon: "Search", bg: "bg-amber-50", iconColor: "text-amber-600" },
          { label: "Заблокировано", value: FRAUD_ITEMS.filter(f => f.status === "blocked").length, icon: "ShieldOff", bg: "bg-blue-50", iconColor: "text-blue-600" },
          { label: "Решено", value: FRAUD_ITEMS.filter(f => f.status === "resolved").length, icon: "ShieldCheck", bg: "bg-green-50", iconColor: "text-green-600" },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-xl border p-4 flex items-center gap-4 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${s.bg}`}>
              <Icon name={s.icon} size={20} className={s.iconColor} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border divide-y">
        {FRAUD_ITEMS.map((item, i) => (
          <div key={item.id} className="px-5 py-4 hover:bg-muted/50 transition-colors cursor-pointer animate-fade-in" style={{ animationDelay: `${i * 40}ms` }}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground">{item.id}</span>
                <span className="text-sm font-medium text-foreground">{item.type}</span>
                <Badge variant="outline" className={RISK_MAP[item.risk].cls}>{RISK_MAP[item.risk].label}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{item.date}</span>
                <Badge variant="outline" className={STATUS_MAP[item.status].cls}>{STATUS_MAP[item.status].label}</Badge>
              </div>
            </div>
            <p className="text-xs text-muted-foreground ml-0">{item.client} — {item.details}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
