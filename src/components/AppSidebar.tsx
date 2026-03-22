import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth, ROLE_LABELS, ROLE_COLORS } from "@/lib/auth";
import { useStatuses } from "@/lib/statuses";
import Icon from "@/components/ui/icon";

interface NavGroup {
  title: string;
  items: { path: string; label: string; icon: string; roles: string[] }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Каналы",
    items: [
      { path: "/tickets", label: "Тикеты", icon: "Ticket", roles: ["admin", "okk", "operator"] },
      { path: "/chat", label: "Чат", icon: "MessageSquare", roles: ["admin", "okk", "operator"] },
      { path: "/mail", label: "Почта", icon: "Mail", roles: ["admin", "okk", "operator"] },
      { path: "/my-mail", label: "Моя почта", icon: "Inbox", roles: ["admin", "okk", "operator"] },
      { path: "/social", label: "Соц. сети", icon: "Share2", roles: ["admin", "okk", "operator"] },
    ],
  },
  {
    title: "Контроль",
    items: [
      { path: "/reviews", label: "Отзывы", icon: "Star", roles: ["admin", "okk", "operator"] },
      { path: "/fraud", label: "Фрод-мониторинг", icon: "ShieldAlert", roles: ["admin", "okk"] },
      { path: "/quality", label: "ОКК", icon: "ClipboardCheck", roles: ["admin", "okk"] },
    ],
  },
  {
    title: "Управление",
    items: [
      { path: "/tasks", label: "Задания", icon: "ListTodo", roles: ["admin", "okk", "operator"] },
      { path: "/news", label: "Новости", icon: "Megaphone", roles: ["admin", "okk", "operator"] },
      { path: "/schedule", label: "График", icon: "CalendarDays", roles: ["admin", "okk", "operator"] },
      { path: "/knowledge", label: "База знаний", icon: "BookOpen", roles: ["admin", "okk", "operator"] },
    ],
  },
  {
    title: "Аналитика",
    items: [
      { path: "/stats", label: "Статистика", icon: "BarChart3", roles: ["admin", "okk"] },
      { path: "/kpi", label: "KPI", icon: "Target", roles: ["admin", "okk"] },
      { path: "/reports", label: "Отчёты", icon: "FileText", roles: ["admin", "okk"] },
      { path: "/status-report", label: "Отчёт статусов", icon: "Activity", roles: ["admin"] },
    ],
  },
  {
    title: "Система",
    items: [
      { path: "/users", label: "Пользователи", icon: "Users", roles: ["admin"] },
      { path: "/admin", label: "Админка", icon: "Settings2", roles: ["admin"] },
      { path: "/settings", label: "Настройки", icon: "Settings", roles: ["admin"] },
    ],
  },
];

export default function AppSidebar() {
  const { user, logout } = useAuth();
  const { statuses, currentStatus, setCurrentStatus } = useStatuses();
  const navigate = useNavigate();
  const location = useLocation();
  const [statusOpen, setStatusOpen] = useState(false);

  if (!user) return null;

  return (
    <aside className="w-60 min-h-screen flex flex-col shrink-0" style={{ background: "hsl(220 30% 12%)" }}>
      <div className="px-4 py-4 border-b" style={{ borderColor: "hsl(220 25% 18%)" }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(220 70% 55%)" }}>
            <Icon name="Headphones" size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-white tracking-wide">Support Pro</h1>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setStatusOpen(!statusOpen)}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs transition-colors"
            style={{ background: "hsl(220 25% 16%)" }}
          >
            <div className="w-2 h-2 rounded-full" style={{ background: currentStatus.color }} />
            <span style={{ color: currentStatus.color }} className="font-medium flex-1 text-left">{currentStatus.label}</span>
            <Icon name="ChevronDown" size={12} style={{ color: "hsl(220 10% 50%)" }} className={`transition-transform ${statusOpen ? "rotate-180" : ""}`} />
          </button>

          {statusOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 rounded-lg overflow-hidden z-50 shadow-xl animate-fade-in" style={{ background: "hsl(220 25% 16%)", border: "1px solid hsl(220 25% 22%)" }}>
              {statuses.map((status) => (
                <button
                  key={status.id}
                  onClick={() => { setCurrentStatus(status); setStatusOpen(false); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs transition-colors ${currentStatus.id === status.id ? "" : ""}`}
                  style={{ color: currentStatus.id === status.id ? status.color : "hsl(220 10% 65%)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(220 25% 20%)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: status.color }} />
                  <Icon name={status.icon} size={13} />
                  <span className="font-medium">{status.label}</span>
                  {currentStatus.id === status.id && <Icon name="Check" size={12} className="ml-auto" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-2 custom-scrollbar" style={{ scrollbarWidth: "thin", scrollbarColor: "hsl(220 25% 20%) transparent" }}>
        {NAV_GROUPS.map((group) => {
          const visible = group.items.filter(item => item.roles.includes(user.role));
          if (visible.length === 0) return null;
          return (
            <div key={group.title} className="mb-2">
              <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "hsl(220 15% 38%)" }}>
                {group.title}
              </p>
              {visible.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-all duration-150"
                    style={{
                      background: isActive ? "hsl(220 70% 55%)" : "transparent",
                      color: isActive ? "white" : "hsl(220 10% 60%)",
                    }}
                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "hsl(220 10% 85%)"; }}
                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "hsl(220 10% 60%)"; }}
                  >
                    <Icon name={item.icon} size={15} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>

      <div className="px-2 pb-3">
        <div className="rounded-lg p-2.5" style={{ background: "hsl(220 25% 16%)" }}>
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="relative">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-semibold" style={{ background: "hsl(220 50% 35%)" }}>
                {user.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2" style={{ borderColor: "hsl(220 25% 16%)", background: currentStatus.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{user.name}</p>
              <span className={`inline-block text-[9px] px-1 py-0 rounded border font-medium ${ROLE_COLORS[user.role]}`}>
                {ROLE_LABELS[user.role]}
              </span>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-1.5 text-[11px] py-1.5 rounded-md transition-colors"
            style={{ color: "hsl(220 10% 50%)", background: "hsl(220 25% 20%)" }}
          >
            <Icon name="LogOut" size={12} />
            Выйти
          </button>
        </div>
      </div>
    </aside>
  );
}
