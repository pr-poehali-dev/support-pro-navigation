import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import Icon from "@/components/ui/icon";

const SETTINGS_SECTIONS = [
  {
    title: "Общие настройки",
    icon: "Settings2",
    items: [
      { label: "Название компании", type: "input", value: "Support Pro" },
      { label: "Email для уведомлений", type: "input", value: "support@company.ru" },
    ],
  },
  {
    title: "SLA и приоритеты",
    icon: "Timer",
    items: [
      { label: "Высокий приоритет (мин)", type: "input", value: "30" },
      { label: "Средний приоритет (мин)", type: "input", value: "120" },
      { label: "Низкий приоритет (мин)", type: "input", value: "480" },
    ],
  },
  {
    title: "Уведомления",
    icon: "Bell",
    items: [
      { label: "Email-уведомления о новых тикетах", type: "toggle", value: true },
      { label: "Уведомления о просрочке SLA", type: "toggle", value: true },
      { label: "Ежедневная сводка на email", type: "toggle", value: false },
    ],
  },
];

export default function Settings() {
  return (
    <DashboardLayout title="Настройки" subtitle="Конфигурация системы">
      <div className="max-w-2xl space-y-6">
        {SETTINGS_SECTIONS.map((section, i) => (
          <div key={i} className="bg-card rounded-xl border animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="px-5 py-4 border-b flex items-center gap-3">
              <Icon name={section.icon} size={18} className="text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
            </div>
            <div className="p-5 space-y-4">
              {section.items.map((item, j) => (
                <div key={j} className="flex items-center justify-between gap-4">
                  <label className="text-sm text-foreground">{item.label}</label>
                  {item.type === "input" ? (
                    <Input defaultValue={String(item.value)} className="max-w-xs h-9" />
                  ) : (
                    <Switch defaultChecked={item.value as boolean} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        <Button className="gap-2">
          <Icon name="Save" size={16} />
          Сохранить изменения
        </Button>
      </div>
    </DashboardLayout>
  );
}
