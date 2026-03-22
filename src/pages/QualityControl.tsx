import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const EVALUATIONS = [
  { id: "TK-001", subject: "Не работает авторизация", operator: "Сидоров К.Н.", client: "ООО «Альфа»", closedDate: "23.03.2026", score: null, evaluator: null },
  { id: "TK-004", subject: "Запрос на интеграцию с 1С", operator: "Сидоров К.Н.", client: "ООО «Гамма»", closedDate: "22.03.2026", score: 9, evaluator: "Петрова М.В." },
  { id: "TK-007", subject: "Запрос на выгрузку данных", operator: "Сидоров К.Н.", client: "АО «Эпсилон»", closedDate: "21.03.2026", score: 7, evaluator: "Петрова М.В." },
  { id: "TK-010", subject: "Ошибка при экспорте отчёта", operator: "Николаева О.А.", client: "ИП Козлов", closedDate: "21.03.2026", score: 10, evaluator: "Петрова М.В." },
  { id: "TK-012", subject: "Вопрос по API документации", operator: "Фёдоров Д.С.", client: "ЗАО «Бета»", closedDate: "20.03.2026", score: 5, evaluator: "Петрова М.В." },
  { id: "TK-015", subject: "Проблема с уведомлениями", operator: "Николаева О.А.", client: "ООО «Дельта»", closedDate: "20.03.2026", score: null, evaluator: null },
];

function ScoreBadge({ score }: { score: number | null }) {
  if (score === null) return <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">Не оценено</Badge>;
  if (score >= 9) return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{score}/10</Badge>;
  if (score >= 7) return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">{score}/10</Badge>;
  return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">{score}/10</Badge>;
}

const evaluated = EVALUATIONS.filter(e => e.score !== null);
const avgScore = evaluated.length > 0 ? (evaluated.reduce((a, e) => a + (e.score || 0), 0) / evaluated.length).toFixed(1) : "—";

export default function QualityControl() {
  return (
    <DashboardLayout title="ОКК" subtitle="Оценка качества закрытых обращений операторами">
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Всего закрыто", value: EVALUATIONS.length, icon: "FileCheck", bg: "bg-blue-50", iconColor: "text-blue-600" },
          { label: "Оценено", value: evaluated.length, icon: "CheckSquare", bg: "bg-green-50", iconColor: "text-green-600" },
          { label: "Ожидают оценки", value: EVALUATIONS.length - evaluated.length, icon: "Clock", bg: "bg-amber-50", iconColor: "text-amber-600" },
          { label: "Средний балл", value: avgScore, icon: "Star", bg: "bg-purple-50", iconColor: "text-purple-600" },
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

      <div className="bg-card rounded-xl border">
        <div className="px-5 py-3 border-b flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Закрытые обращения</h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="Filter" size={14} />
            Показать только неоценённые
          </div>
        </div>
        <div className="divide-y">
          {EVALUATIONS.map((ev, i) => (
            <div key={ev.id} className="px-5 py-4 flex items-center gap-4 hover:bg-muted/50 transition-colors animate-fade-in" style={{ animationDelay: `${i * 40}ms` }}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-mono text-muted-foreground">{ev.id}</span>
                  <span className="text-sm font-medium text-foreground">{ev.subject}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Icon name="User" size={12} />{ev.operator}</span>
                  <span className="flex items-center gap-1"><Icon name="Building2" size={12} />{ev.client}</span>
                  <span className="flex items-center gap-1"><Icon name="Calendar" size={12} />{ev.closedDate}</span>
                  {ev.evaluator && <span className="flex items-center gap-1"><Icon name="UserCheck" size={12} />{ev.evaluator}</span>}
                </div>
              </div>
              <ScoreBadge score={ev.score} />
              {ev.score === null && (
                <Button size="sm" className="h-8 text-xs gap-1">
                  <Icon name="ClipboardCheck" size={14} />
                  Оценить
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
