import DashboardLayout from "@/components/DashboardLayout";
import Icon from "@/components/ui/icon";
import { useStatuses } from "@/lib/statuses";

const DAILY_TIMELINE = [
  { operator: "Сидоров К.Н.", timeline: [
    { status: "На линии", color: "#22c55e", start: 0, width: 25 },
    { status: "Перерыв", color: "#3b82f6", start: 25, width: 5 },
    { status: "На линии", color: "#22c55e", start: 30, width: 20 },
    { status: "Обед", color: "#8b5cf6", start: 50, width: 10 },
    { status: "На линии", color: "#22c55e", start: 60, width: 30 },
    { status: "Не в сети", color: "#9ca3af", start: 90, width: 10 },
  ]},
  { operator: "Николаева О.А.", timeline: [
    { status: "На линии", color: "#22c55e", start: 0, width: 35 },
    { status: "Совещание", color: "#ec4899", start: 35, width: 8 },
    { status: "На линии", color: "#22c55e", start: 43, width: 15 },
    { status: "Обед", color: "#8b5cf6", start: 58, width: 10 },
    { status: "На линии", color: "#22c55e", start: 68, width: 22 },
    { status: "Не в сети", color: "#9ca3af", start: 90, width: 10 },
  ]},
  { operator: "Фёдоров Д.С.", timeline: [
    { status: "Не в сети", color: "#9ca3af", start: 0, width: 12 },
    { status: "На линии", color: "#22c55e", start: 12, width: 25 },
    { status: "Обучение", color: "#06b6d4", start: 37, width: 20 },
    { status: "На линии", color: "#22c55e", start: 57, width: 20 },
    { status: "Перерыв", color: "#3b82f6", start: 77, width: 5 },
    { status: "На линии", color: "#22c55e", start: 82, width: 18 },
  ]},
];

const HOURS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

export default function StatusReport() {
  const { statuses, statusLogs } = useStatuses();

  const statusTotals = statuses.map(s => ({
    ...s,
    count: statusLogs.filter(l => l.statusId === s.id).length,
  }));

  return (
    <DashboardLayout title="Отчёт по статусам" subtitle="Детальный отчёт по статусам операторов за сегодня">
      <div className="grid grid-cols-4 gap-4 mb-6">
        {statusTotals.slice(0, 4).map((s, i) => (
          <div key={s.id} className="bg-card rounded-xl border p-4 flex items-center gap-3 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: s.color + "15" }}>
              <Icon name={s.icon} size={18} style={{ color: s.color }} />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{s.count}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border p-5 mb-6 animate-fade-in" style={{ animationDelay: "350ms" }}>
        <h3 className="text-sm font-semibold text-foreground mb-5">Таймлайн за сегодня</h3>

        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-40" />
            <div className="flex-1 flex justify-between text-[10px] text-muted-foreground px-1">
              {HOURS.map(h => <span key={h}>{h}</span>)}
            </div>
          </div>

          {DAILY_TIMELINE.map((op, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-40 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold text-white" style={{ background: "hsl(220 50% 40%)" }}>
                  {op.operator.split(" ").map(n => n[0]).join("")}
                </div>
                <span className="text-xs font-medium text-foreground truncate">{op.operator}</span>
              </div>
              <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden flex relative">
                {op.timeline.map((seg, j) => (
                  <div
                    key={j}
                    className="h-full transition-all duration-500 group relative"
                    style={{ width: `${seg.width}%`, background: seg.color, opacity: 0.85 }}
                    title={`${seg.status}`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[9px] font-medium text-white drop-shadow-sm whitespace-nowrap">{seg.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-5 mt-5 pt-4 border-t">
          {[
            { label: "На линии", color: "#22c55e" },
            { label: "Перерыв", color: "#3b82f6" },
            { label: "Обед", color: "#8b5cf6" },
            { label: "Совещание", color: "#ec4899" },
            { label: "Обучение", color: "#06b6d4" },
            { label: "Не в сети", color: "#9ca3af" },
          ].map((item) => (
            <span key={item.label} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className="w-2.5 h-2.5 rounded" style={{ background: item.color }} />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-xl border animate-fade-in" style={{ animationDelay: "450ms" }}>
        <div className="px-5 py-3 border-b">
          <h3 className="text-sm font-semibold text-foreground">Журнал переключений</h3>
        </div>
        <div className="divide-y">
          {statusLogs.map((log, i) => (
            <div key={i} className="px-5 py-3 flex items-center gap-4 text-sm">
              <span className="text-xs text-muted-foreground w-12">{log.timestamp}</span>
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: log.color }} />
              <span className="font-medium text-foreground">{log.userName}</span>
              <span className="text-muted-foreground">&rarr;</span>
              <span className="text-foreground">{log.statusLabel}</span>
              {log.duration && <span className="text-xs text-muted-foreground ml-auto font-mono">{log.duration}</span>}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
