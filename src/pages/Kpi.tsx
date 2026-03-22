import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const KPI_DATA = [
  {
    name: "Сидоров К.Н.",
    metrics: {
      resolved: 156,
      avgResponseTime: "8 мин",
      avgResolutionTime: "45 мин",
      satisfaction: 96,
      slaCompliance: 98,
      qualityScore: 8.5,
      firstContactResolution: 82,
    },
    trend: "up",
  },
  {
    name: "Николаева О.А.",
    metrics: {
      resolved: 132,
      avgResponseTime: "11 мин",
      avgResolutionTime: "52 мин",
      satisfaction: 94,
      slaCompliance: 95,
      qualityScore: 9.2,
      firstContactResolution: 78,
    },
    trend: "up",
  },
  {
    name: "Фёдоров Д.С.",
    metrics: {
      resolved: 98,
      avgResponseTime: "18 мин",
      avgResolutionTime: "1ч 10м",
      satisfaction: 87,
      slaCompliance: 82,
      qualityScore: 6.5,
      firstContactResolution: 65,
    },
    trend: "down",
  },
];

function TrendIcon({ trend }: { trend: string }) {
  return trend === "up"
    ? <Icon name="TrendingUp" size={14} className="text-green-600" />
    : <Icon name="TrendingDown" size={14} className="text-red-600" />;
}

function ProgressBar({ value, max = 100, color }: { value: number; max?: number; color: string }) {
  return (
    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(value / max) * 100}%`, background: color }} />
    </div>
  );
}

export default function Kpi() {
  return (
    <DashboardLayout title="KPI" subtitle="Ключевые показатели эффективности операторов">
      <div className="space-y-6">
        {KPI_DATA.map((op, i) => (
          <div key={i} className="bg-card rounded-xl border animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white" style={{ background: "hsl(220 50% 40%)" }}>
                  {op.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{op.name}</p>
                  <p className="text-xs text-muted-foreground">Март 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendIcon trend={op.trend} />
                <Badge variant="outline" className={op.trend === "up" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}>
                  {op.trend === "up" ? "Рост" : "Снижение"}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 p-5">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Решено тикетов</p>
                <p className="text-xl font-bold text-foreground">{op.metrics.resolved}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Время ответа</p>
                <p className="text-xl font-bold text-foreground">{op.metrics.avgResponseTime}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Время решения</p>
                <p className="text-xl font-bold text-foreground">{op.metrics.avgResolutionTime}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Оценка ОКК</p>
                <p className="text-xl font-bold text-foreground">{op.metrics.qualityScore}/10</p>
              </div>
            </div>

            <div className="px-5 pb-5 space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Удовлетворённость клиентов</span>
                  <span className="font-medium text-foreground">{op.metrics.satisfaction}%</span>
                </div>
                <ProgressBar value={op.metrics.satisfaction} color="hsl(152 60% 42%)" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Соблюдение SLA</span>
                  <span className="font-medium text-foreground">{op.metrics.slaCompliance}%</span>
                </div>
                <ProgressBar value={op.metrics.slaCompliance} color="hsl(220 70% 55%)" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Решено с первого обращения</span>
                  <span className="font-medium text-foreground">{op.metrics.firstContactResolution}%</span>
                </div>
                <ProgressBar value={op.metrics.firstContactResolution} color="hsl(38 92% 50%)" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
