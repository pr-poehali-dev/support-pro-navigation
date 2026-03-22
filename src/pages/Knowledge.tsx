import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const CATEGORIES = [
  {
    name: "Начало работы",
    icon: "Rocket",
    articles: [
      { title: "Как войти в систему", views: 234 },
      { title: "Первичная настройка профиля", views: 187 },
      { title: "Обзор интерфейса", views: 156 },
    ],
  },
  {
    name: "Работа с тикетами",
    icon: "Ticket",
    articles: [
      { title: "Создание тикета", views: 312 },
      { title: "Приоритеты и SLA", views: 298 },
      { title: "Шаблоны ответов", views: 245 },
      { title: "Переназначение тикетов", views: 189 },
    ],
  },
  {
    name: "Частые вопросы клиентов",
    icon: "MessageCircleQuestion",
    articles: [
      { title: "Восстановление пароля", views: 456 },
      { title: "Изменение тарифа", views: 367 },
      { title: "Возврат средств", views: 289 },
    ],
  },
  {
    name: "Технические инструкции",
    icon: "Wrench",
    articles: [
      { title: "Настройка интеграции API", views: 145 },
      { title: "Подключение виджета на сайт", views: 123 },
    ],
  },
];

export default function Knowledge() {
  const [search, setSearch] = useState("");

  const filteredCategories = CATEGORIES.map(cat => ({
    ...cat,
    articles: cat.articles.filter(a => a.title.toLowerCase().includes(search.toLowerCase())),
  })).filter(cat => cat.articles.length > 0);

  return (
    <DashboardLayout title="База знаний" subtitle="Справочные материалы и инструкции">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск по базе знаний..." className="pl-9" />
        </div>
        <Button className="gap-2">
          <Icon name="Plus" size={16} />
          Новая статья
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {filteredCategories.map((cat, i) => (
          <div key={i} className="bg-card rounded-xl border p-5 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                <Icon name={cat.icon} size={18} className="text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{cat.name}</h3>
                <p className="text-xs text-muted-foreground">{cat.articles.length} статей</p>
              </div>
            </div>
            <div className="space-y-1">
              {cat.articles.map((article, j) => (
                <div key={j} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group">
                  <span className="text-sm text-foreground group-hover:text-primary transition-colors">{article.title}</span>
                  <span className="text-[11px] text-muted-foreground">{article.views} просм.</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
