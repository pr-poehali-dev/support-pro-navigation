import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const success = login(username, password);
      if (success) {
        navigate("/tickets");
      } else {
        setError("Неверный логин или пароль");
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen flex" style={{ background: "hsl(220 20% 97%)" }}>
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center" style={{ background: "hsl(220 30% 12%)" }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 30% 40%, hsl(220 70% 55%) 0%, transparent 50%), radial-gradient(circle at 70% 60%, hsl(220 60% 40%) 0%, transparent 50%)"
        }} />
        <div className="relative z-10 px-16 animate-fade-in">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: "hsl(220 70% 55%)" }}>
              <Icon name="Headphones" size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Support Pro</h1>
              <p className="text-sm" style={{ color: "hsl(220 15% 55%)" }}>Система управления поддержкой</p>
            </div>
          </div>
          <div className="space-y-6 mt-12">
            {[
              { icon: "Shield", text: "Управление тикетами и обращениями" },
              { icon: "BarChart3", text: "Аналитика и отчёты в реальном времени" },
              { icon: "Users", text: "Ролевая система доступа" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 animate-slide-in" style={{ animationDelay: `${(i + 1) * 150}ms` }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(220 25% 18%)" }}>
                  <Icon name={item.icon} size={18} style={{ color: "hsl(220 70% 65%)" }} />
                </div>
                <span className="text-sm" style={{ color: "hsl(220 10% 70%)" }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-sm animate-fade-in">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(220 70% 45%)" }}>
              <Icon name="Headphones" size={20} className="text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">Support Pro</span>
          </div>

          <h2 className="text-2xl font-bold text-foreground">Вход в систему</h2>
          <p className="text-sm text-muted-foreground mt-1 mb-8">Введите логин и пароль для доступа</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Логин</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введите логин"
                className="h-11"
                autoFocus
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Пароль</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                className="h-11"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive bg-red-50 px-3 py-2 rounded-lg">
                <Icon name="AlertCircle" size={16} />
                {error}
              </div>
            )}

            <Button type="submit" className="w-full h-11 font-medium" disabled={loading}>
              {loading ? (
                <Icon name="Loader2" size={18} className="animate-spin" />
              ) : (
                "Войти"
              )}
            </Button>
          </form>

          <div className="mt-8 p-4 rounded-lg border bg-card">
            <p className="text-xs font-medium text-muted-foreground mb-2">Демо-доступ:</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p><span className="font-mono bg-muted px-1 rounded">admin</span> / <span className="font-mono bg-muted px-1 rounded">admin</span> — Администратор</p>
              <p><span className="font-mono bg-muted px-1 rounded">okk</span> / <span className="font-mono bg-muted px-1 rounded">okk</span> — ОКК</p>
              <p><span className="font-mono bg-muted px-1 rounded">operator</span> / <span className="font-mono bg-muted px-1 rounded">operator</span> — Оператор</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
