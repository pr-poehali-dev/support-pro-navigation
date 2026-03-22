import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";

const CONNECTED_ACCOUNTS = [
  { email: "operator@company.ru", provider: "Яндекс", status: "connected", lastSync: "5 мин назад", unread: 3 },
];

export default function MyMail() {
  const [showConnect, setShowConnect] = useState(false);

  return (
    <DashboardLayout title="Моя почта" subtitle="Подключение и управление рабочей почтой оператора">
      <div className="max-w-2xl space-y-6">
        <div className="bg-card rounded-xl border animate-fade-in">
          <div className="px-5 py-4 border-b flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Подключённые аккаунты</h3>
            <Button size="sm" className="h-8 gap-2 text-xs" onClick={() => setShowConnect(!showConnect)}>
              <Icon name="Plus" size={14} />
              Добавить
            </Button>
          </div>

          {CONNECTED_ACCOUNTS.length > 0 ? (
            <div className="divide-y">
              {CONNECTED_ACCOUNTS.map((acc, i) => (
                <div key={i} className="px-5 py-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Icon name="Mail" size={18} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{acc.email}</p>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-50 text-green-600 font-medium">Подключено</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{acc.provider} · Синхронизация: {acc.lastSync} · {acc.unread} непрочитанных</p>
                  </div>
                  <Button variant="ghost" size="sm"><Icon name="RefreshCw" size={14} /></Button>
                  <Button variant="ghost" size="sm" className="text-destructive"><Icon name="Trash2" size={14} /></Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Icon name="MailX" size={40} className="mx-auto mb-3 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">Нет подключённых аккаунтов</p>
            </div>
          )}
        </div>

        {showConnect && (
          <div className="bg-card rounded-xl border p-5 animate-fade-in">
            <h3 className="text-sm font-semibold text-foreground mb-4">Подключить почтовый ящик</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Почтовый провайдер</label>
                <Select defaultValue="yandex">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yandex">Яндекс Почта</SelectItem>
                    <SelectItem value="gmail">Gmail</SelectItem>
                    <SelectItem value="mailru">Mail.ru</SelectItem>
                    <SelectItem value="imap">IMAP (другой)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Email</label>
                <Input placeholder="your@email.com" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Пароль приложения</label>
                <Input type="password" placeholder="Пароль приложения" />
              </div>
              <div className="flex gap-3">
                <Button className="gap-2"><Icon name="Link" size={14} />Подключить</Button>
                <Button variant="outline" onClick={() => setShowConnect(false)}>Отмена</Button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-card rounded-xl border p-5 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="flex items-start gap-3">
            <Icon name="Info" size={18} className="text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Как подключить почту?</p>
              <p className="text-xs text-muted-foreground mt-1">Создайте пароль приложения в настройках вашего почтового сервиса. Для Яндекс: Настройки &rarr; Безопасность &rarr; Пароли приложений. Для Gmail: аккаунт Google &rarr; Безопасность &rarr; Пароли приложений.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
