import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";

interface Task {
  id: string;
  title: string;
  assignee: string;
  priority: "high" | "medium" | "low";
  deadline: string;
  completed: boolean;
}

const INITIAL_TASKS: Task[] = [
  { id: "1", title: "Обновить шаблоны ответов по тарифам", assignee: "Сидоров К.Н.", priority: "high", deadline: "24.03.2026", completed: false },
  { id: "2", title: "Провести обучение новых операторов", assignee: "Петрова М.В.", priority: "high", deadline: "25.03.2026", completed: false },
  { id: "3", title: "Подготовить отчёт по SLA за март", assignee: "Николаева О.А.", priority: "medium", deadline: "31.03.2026", completed: false },
  { id: "4", title: "Настроить автоответы для ночных обращений", assignee: "Сидоров К.Н.", priority: "medium", deadline: "26.03.2026", completed: false },
  { id: "5", title: "Проверить базу знаний на актуальность", assignee: "Фёдоров Д.С.", priority: "low", deadline: "28.03.2026", completed: true },
  { id: "6", title: "Обновить контактные данные на сайте", assignee: "Николаева О.А.", priority: "low", deadline: "27.03.2026", completed: true },
];

const PRIORITY_MAP: Record<string, { label: string; cls: string }> = {
  high: { label: "Срочно", cls: "bg-red-50 text-red-700 border-red-200" },
  medium: { label: "Обычно", cls: "bg-amber-50 text-amber-700 border-amber-200" },
  low: { label: "Низкий", cls: "bg-green-50 text-green-700 border-green-200" },
};

export default function Tasks() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const toggle = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const active = tasks.filter(t => !t.completed);
  const done = tasks.filter(t => t.completed);

  return (
    <DashboardLayout title="Задания" subtitle="Управление задачами команды">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Активных: <strong className="text-foreground">{active.length}</strong></span>
          <span>Выполнено: <strong className="text-foreground">{done.length}</strong></span>
        </div>
        <Button className="gap-2"><Icon name="Plus" size={16} />Новое задание</Button>
      </div>

      <div className="space-y-3">
        {tasks.map((task, i) => (
          <div key={task.id} className={`bg-card rounded-xl border px-5 py-4 flex items-center gap-4 transition-all animate-fade-in ${task.completed ? "opacity-60" : ""}`} style={{ animationDelay: `${i * 40}ms` }}>
            <Checkbox checked={task.completed} onCheckedChange={() => toggle(task.id)} />
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>{task.title}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Icon name="User" size={12} />{task.assignee}</span>
                <span className="flex items-center gap-1"><Icon name="Calendar" size={12} />до {task.deadline}</span>
              </div>
            </div>
            <Badge variant="outline" className={PRIORITY_MAP[task.priority].cls}>{PRIORITY_MAP[task.priority].label}</Badge>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
