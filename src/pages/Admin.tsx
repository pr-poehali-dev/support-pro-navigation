import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { useStatuses, type OperatorStatus } from "@/lib/statuses";

const COLORS = ["#22c55e", "#f59e0b", "#3b82f6", "#8b5cf6", "#06b6d4", "#ec4899", "#ef4444", "#9ca3af", "#f97316", "#14b8a6"];
const ICONS = ["CircleDot", "Clock", "Coffee", "UtensilsCrossed", "GraduationCap", "Users", "CircleOff", "Phone", "Headphones", "Pause"];

export default function Admin() {
  const { statuses, addStatus, removeStatus, statusLogs } = useStatuses();
  const [newLabel, setNewLabel] = useState("");
  const [newColor, setNewColor] = useState(COLORS[0]);
  const [newIcon, setNewIcon] = useState(ICONS[0]);

  const handleAdd = () => {
    if (!newLabel.trim()) return;
    const id = newLabel.toLowerCase().replace(/\s+/g, "_").replace(/[^a-zа-яё0-9_]/gi, "");
    addStatus({ id, label: newLabel, color: newColor, icon: newIcon });
    setNewLabel("");
  };

  const operatorStats = statusLogs.reduce<Record<string, { name: string; entries: typeof statusLogs }>>((acc, log) => {
    if (!acc[log.userId]) acc[log.userId] = { name: log.userName, entries: [] };
    acc[log.userId].entries.push(log);
    return acc;
  }, {});

  return (
    <DashboardLayout title="Админка" subtitle="Управление системой и конфигурация">
      <Tabs defaultValue="statuses" className="space-y-6">
        <TabsList>
          <TabsTrigger value="statuses">Статусы операторов</TabsTrigger>
          <TabsTrigger value="status-report">Отчёт по статусам</TabsTrigger>
          <TabsTrigger value="system">Система</TabsTrigger>
        </TabsList>

        <TabsContent value="statuses">
          <div className="max-w-2xl space-y-6">
            <div className="bg-card rounded-xl border">
              <div className="px-5 py-4 border-b">
                <h3 className="text-sm font-semibold text-foreground">Управление статусами</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Создавайте, редактируйте и удаляйте статусы операторов</p>
              </div>
              <div className="divide-y">
                {statuses.map((status) => (
                  <div key={status.id} className="px-5 py-3 flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: status.color + "20" }}>
                      <Icon name={status.icon} size={16} style={{ color: status.color }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{status.label}</p>
                      <p className="text-[10px] text-muted-foreground font-mono">{status.id}</p>
                    </div>
                    <div className="w-4 h-4 rounded-full" style={{ background: status.color }} />
                    <Button variant="ghost" size="sm" className="text-destructive h-7" onClick={() => removeStatus(status.id)}>
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl border p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">Добавить статус</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Название</label>
                  <Input value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="Название статуса" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Цвет</label>
                  <div className="flex gap-2">
                    {COLORS.map((c) => (
                      <button
                        key={c}
                        onClick={() => setNewColor(c)}
                        className={`w-8 h-8 rounded-lg transition-transform ${newColor === c ? "scale-110 ring-2 ring-offset-2 ring-gray-400" : "hover:scale-105"}`}
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Иконка</label>
                  <div className="flex gap-2">
                    {ICONS.map((ic) => (
                      <button
                        key={ic}
                        onClick={() => setNewIcon(ic)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${newIcon === ic ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                      >
                        <Icon name={ic} size={16} />
                      </button>
                    ))}
                  </div>
                </div>
                <Button onClick={handleAdd} className="gap-2"><Icon name="Plus" size={14} />Добавить</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="status-report">
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(operatorStats).map(([userId, data], i) => (
                <div key={userId} className="bg-card rounded-xl border animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="px-5 py-4 border-b flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold text-white" style={{ background: "hsl(220 50% 40%)" }}>
                      {data.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <p className="text-sm font-semibold text-foreground">{data.name}</p>
                  </div>
                  <div className="p-4 space-y-2">
                    {data.entries.map((entry, j) => (
                      <div key={j} className="flex items-center gap-3 text-xs">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: entry.color }} />
                        <span className="text-foreground font-medium flex-1">{entry.statusLabel}</span>
                        <span className="text-muted-foreground">{entry.timestamp}</span>
                        <span className="text-muted-foreground font-mono">{entry.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card rounded-xl border p-5 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <h3 className="text-sm font-semibold text-foreground mb-4">Сводка по статусам за сегодня</h3>
              <div className="grid grid-cols-4 gap-4">
                {statuses.slice(0, 4).map((status, i) => {
                  const count = statusLogs.filter(l => l.statusId === status.id).length;
                  return (
                    <div key={status.id} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: status.color + "10" }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: status.color + "20" }}>
                        <Icon name={status.icon} size={14} style={{ color: status.color }} />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-foreground">{count}</p>
                        <p className="text-[10px] text-muted-foreground">{status.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="system">
          <div className="max-w-2xl space-y-6">
            <div className="bg-card rounded-xl border p-5 animate-fade-in">
              <h3 className="text-sm font-semibold text-foreground mb-4">Информация о системе</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Версия</span>
                  <span className="font-mono text-foreground">1.0.0</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Операторов онлайн</span>
                  <span className="font-semibold text-foreground">3</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Открытых тикетов</span>
                  <span className="font-semibold text-foreground">12</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Uptime</span>
                  <span className="font-mono text-green-600">99.98%</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
