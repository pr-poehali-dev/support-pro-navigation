import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const REPORTS = [
  { name: "Отчёт по тикетам за март 2026", type: "Ежемесячный", date: "23.03.2026", size: "2.4 МБ", icon: "FileSpreadsheet" },
  { name: "Показатели SLA за Q1 2026", type: "Квартальный", date: "20.03.2026", size: "1.8 МБ", icon: "FileBarChart" },
  { name: "Анализ обращений по категориям", type: "Аналитический", date: "18.03.2026", size: "3.1 МБ", icon: "FilePieChart" },
  { name: "Эффективность операторов — март", type: "Ежемесячный", date: "15.03.2026", size: "1.2 МБ", icon: "FileText" },
  { name: "Среднее время решения по приоритетам", type: "Аналитический", date: "10.03.2026", size: "0.9 МБ", icon: "FileBarChart" },
];

export default function Reports() {
  return (
    <DashboardLayout title="Отчёты" subtitle="Формирование и выгрузка отчётов">
      <div className="flex gap-4 mb-6">
        <Button className="gap-2">
          <Icon name="FilePlus" size={16} />
          Создать отчёт
        </Button>
        <Button variant="outline" className="gap-2">
          <Icon name="Download" size={16} />
          Экспорт данных
        </Button>
      </div>

      <div className="bg-card rounded-xl border divide-y">
        {REPORTS.map((report, i) => (
          <div key={i} className="px-5 py-4 flex items-center gap-4 hover:bg-muted/50 transition-colors cursor-pointer animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Icon name={report.icon} size={18} className="text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{report.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{report.type} · {report.date} · {report.size}</p>
            </div>
            <Button variant="ghost" size="sm" className="gap-1 text-xs">
              <Icon name="Download" size={14} />
              Скачать
            </Button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
