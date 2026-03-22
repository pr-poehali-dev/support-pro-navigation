import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { ROLE_LABELS, ROLE_COLORS, type UserRole } from "@/lib/auth";

interface SystemUser {
  id: string;
  name: string;
  login: string;
  role: UserRole;
  status: "active" | "inactive";
  lastActive: string;
}

const INITIAL_USERS: SystemUser[] = [
  { id: "1", name: "Иванов А.С.", login: "admin", role: "admin", status: "active", lastActive: "Сейчас в сети" },
  { id: "2", name: "Петрова М.В.", login: "okk", role: "okk", status: "active", lastActive: "15 мин назад" },
  { id: "3", name: "Сидоров К.Н.", login: "operator", role: "operator", status: "active", lastActive: "2 мин назад" },
  { id: "4", name: "Николаева О.А.", login: "nikolaeva", role: "operator", status: "active", lastActive: "1 час назад" },
  { id: "5", name: "Фёдоров Д.С.", login: "fedorov", role: "operator", status: "inactive", lastActive: "3 дня назад" },
];

export default function Users() {
  const [users, setUsers] = useState<SystemUser[]>(INITIAL_USERS);
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", login: "", password: "", role: "operator" as UserRole });

  const handleCreate = () => {
    if (!newUser.name || !newUser.login || !newUser.password) return;
    setUsers([...users, {
      id: String(users.length + 1),
      name: newUser.name,
      login: newUser.login,
      role: newUser.role,
      status: "active",
      lastActive: "Только что создан",
    }]);
    setNewUser({ name: "", login: "", password: "", role: "operator" });
    setOpen(false);
  };

  return (
    <DashboardLayout title="Пользователи" subtitle="Управление учётными записями системы">
      <div className="bg-card rounded-xl border">
        <div className="p-4 border-b flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Всего пользователей: <span className="font-semibold text-foreground">{users.length}</span></p>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-9 gap-2">
                <Icon name="UserPlus" size={16} />
                Создать пользователя
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Новый пользователь</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">ФИО</label>
                  <Input value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} placeholder="Иванов И.И." />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Логин</label>
                  <Input value={newUser.login} onChange={(e) => setNewUser({ ...newUser, login: e.target.value })} placeholder="ivanov" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Пароль</label>
                  <Input type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} placeholder="Минимум 6 символов" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Роль</label>
                  <Select value={newUser.role} onValueChange={(v) => setNewUser({ ...newUser, role: v as UserRole })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Администратор</SelectItem>
                      <SelectItem value="okk">ОКК</SelectItem>
                      <SelectItem value="operator">Оператор</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleCreate} className="w-full">Создать</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="divide-y">
          {users.map((u, i) => (
            <div key={u.id} className="px-5 py-4 flex items-center gap-4 hover:bg-muted/50 transition-colors animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white" style={{ background: u.status === "active" ? "hsl(220 50% 40%)" : "hsl(220 10% 65%)" }}>
                {u.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <p className="text-sm font-medium text-foreground">{u.name}</p>
                  <Badge variant="outline" className={ROLE_COLORS[u.role]}>{ROLE_LABELS[u.role]}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  <span className="font-mono">{u.login}</span> · {u.lastActive}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${u.status === "active" ? "bg-green-500" : "bg-gray-300"}`} />
                <span className="text-xs text-muted-foreground">{u.status === "active" ? "Активен" : "Неактивен"}</span>
              </div>
              <Button variant="ghost" size="sm">
                <Icon name="MoreHorizontal" size={16} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
