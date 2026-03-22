import { useNavigate, useLocation } from "react-router-dom";
import { useAuth, ROLE_LABELS, ROLE_COLORS } from "@/lib/auth";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { path: "/tickets", label: "Тикеты", icon: "Ticket", roles: ["admin", "okk", "operator"] },
  { path: "/stats", label: "Статистика", icon: "BarChart3", roles: ["admin", "okk"] },
  { path: "/users", label: "Пользователи", icon: "Users", roles: ["admin"] },
  { path: "/reports", label: "Отчёты", icon: "FileText", roles: ["admin", "okk"] },
  { path: "/knowledge", label: "База знаний", icon: "BookOpen", roles: ["admin", "okk", "operator"] },
  { path: "/settings", label: "Настройки", icon: "Settings", roles: ["admin"] },
];

export default function AppSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const visibleItems = NAV_ITEMS.filter((item) =>
    item.roles.includes(user.role)
  );

  return (
    <aside className="w-64 min-h-screen flex flex-col" style={{ background: "hsl(220 30% 12%)" }}>
      <div className="px-5 py-6 border-b" style={{ borderColor: "hsl(220 25% 18%)" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "hsl(220 70% 55%)" }}>
            <Icon name="Headphones" size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-white tracking-wide">Support Pro</h1>
            <p className="text-[11px]" style={{ color: "hsl(220 15% 50%)" }}>Служба поддержки</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {visibleItems.map((item, i) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 animate-slide-in ${
                isActive
                  ? "text-white"
                  : "hover:text-white"
              }`}
              style={{
                background: isActive ? "hsl(220 70% 55%)" : "transparent",
                color: isActive ? "white" : "hsl(220 10% 65%)",
                animationDelay: `${i * 50}ms`,
              }}
            >
              <Icon name={item.icon} size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="px-3 pb-4">
        <div className="rounded-lg p-3" style={{ background: "hsl(220 25% 16%)" }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold" style={{ background: "hsl(220 50% 35%)" }}>
              {user.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <span className={`inline-block text-[10px] px-1.5 py-0.5 rounded border font-medium ${ROLE_COLORS[user.role]}`}>
                {ROLE_LABELS[user.role]}
              </span>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 text-xs py-2 rounded-md transition-colors"
            style={{ color: "hsl(220 10% 55%)", background: "hsl(220 25% 20%)" }}
          >
            <Icon name="LogOut" size={14} />
            Выйти
          </button>
        </div>
      </div>
    </aside>
  );
}
