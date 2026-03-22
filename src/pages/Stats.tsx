import DashboardLayout from "@/components/DashboardLayout";
import Icon from "@/components/ui/icon";

const STATS = [
  { label: "Среднее время ответа", value: "12 мин", change: "-8%", positive: true, icon: "Clock" },
  { label: "Удовлетворённость", value: "94.2%", change: "+2.1%", positive: true, icon: "ThumbsUp" },
  { label: "Решено за день", value: "47", change: "+12%", positive: true, icon: "CheckCircle2" },
  { label: "Просрочено SLA", value: "3", change: "+1", positive: false, icon: "AlertTriangle" },
];

const WEEKLY = [
  { day: "Пн", tickets: 42 },
  { day: "Вт", tickets: 58 },
  { day: "Ср", tickets: 35 },
  { day: "Чт", tickets: 67 },
  { day: "Пт", tickets: 52 },
  { day: "Сб", tickets: 18 },
  { day: "Вс", tickets: 12 },
];

const TOP_OPERATORS = [
  { name: "Сидоров К.Н.", resolved: 156, avgTime: "8 мин", satisfaction: "96%" },
  { name: "Николаева О.А.", resolved: 132, avgTime: "11 мин", satisfaction: "94%" },
  { name: "Фёдоров Д.С.", resolved: 118, avgTime: "14 мин", satisfaction: "91%" },
];

const maxTickets = Math.max(...WEEKLY.map(w => w.tickets));

export default function Stats() {
  return (
    <DashboardLayout title="Статистика" subtitle="Показатели работы службы поддержки">
      <div className="grid grid-cols-4 gap-4 mb-6">
        {STATS.map((stat, i) => (
          <div key={i} className="bg-card rounded-xl border p-5 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Icon name={stat.icon} size={18} className="text-muted-foreground" />
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${stat.positive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-card rounded-xl border p-5 animate-fade-in" style={{ animationDelay: "350ms" }}>
          <h3 className="text-sm font-semibold text-foreground mb-6">Тикеты за неделю</h3>
          <div className="flex items-end gap-3 h-48">
            {WEEKLY.map((w, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-medium text-foreground">{w.tickets}</span>
                <div
                  className="w-full rounded-t-md transition-all duration-500"
                  style={{
                    height: `${(w.tickets / maxTickets) * 100}%`,
                    background: `hsl(220 70% ${45 + (i * 3)}%)`,
                    animationDelay: `${400 + i * 80}ms`,
                  }}
                />
                <span className="text-xs text-muted-foreground">{w.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl border p-5 animate-fade-in" style={{ animationDelay: "450ms" }}>
          <h3 className="text-sm font-semibold text-foreground mb-4">Топ операторов</h3>
          <div className="space-y-4">
            {TOP_OPERATORS.map((op, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold text-white" style={{ background: `hsl(220 ${60 - i * 15}% ${40 + i * 8}%)` }}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{op.name}</p>
                  <p className="text-xs text-muted-foreground">{op.resolved} решено · {op.avgTime}</p>
                </div>
                <span className="text-xs font-medium text-green-600">{op.satisfaction}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
