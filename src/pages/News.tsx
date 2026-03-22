import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/lib/auth";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  pinned: boolean;
}

const INITIAL_NEWS: NewsItem[] = [
  { id: "1", title: "Обновление SLA-политики", content: "С 1 апреля 2026 года вступают в силу обновлённые SLA-требования. Время первого ответа для высокого приоритета сокращено до 15 минут. Подробности в базе знаний.", author: "Иванов А.С.", date: "23.03.2026", pinned: true },
  { id: "2", title: "Новый интеграционный модуль", content: "Подключён модуль интеграции с Telegram. Теперь обращения из Telegram автоматически попадают в систему тикетов.", author: "Петрова М.В.", date: "22.03.2026", pinned: false },
  { id: "3", title: "График работы на праздничные дни", content: "В период с 29 по 31 марта работаем по сокращённому графику. Дежурная смена — 2 оператора. Подробности в разделе «График».", author: "Иванов А.С.", date: "21.03.2026", pinned: false },
  { id: "4", title: "Результаты обучения за февраль", content: "Все операторы успешно прошли аттестацию. Средний балл — 8.7/10. Лучший результат — Николаева О.А. (10/10).", author: "Петрова М.В.", date: "20.03.2026", pinned: false },
];

export default function News() {
  const { user } = useAuth();
  const [news, setNews] = useState(INITIAL_NEWS);
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const canPublish = user?.role === "admin" || user?.role === "okk";

  const handlePublish = () => {
    if (!newTitle || !newContent || !user) return;
    setNews([{ id: String(news.length + 1), title: newTitle, content: newContent, author: user.name, date: "23.03.2026", pinned: false }, ...news]);
    setNewTitle("");
    setNewContent("");
    setOpen(false);
  };

  return (
    <DashboardLayout title="Новости" subtitle="Важные объявления и обновления">
      {canPublish && (
        <div className="mb-6">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2"><Icon name="PenLine" size={16} />Опубликовать новость</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Новая публикация</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-2">
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Заголовок</label>
                  <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Заголовок новости" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">Содержание</label>
                  <Textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} placeholder="Текст новости..." rows={5} />
                </div>
                <Button onClick={handlePublish} className="w-full">Опубликовать</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}

      <div className="space-y-4">
        {news.map((item, i) => (
          <div key={item.id} className={`bg-card rounded-xl border p-5 animate-fade-in ${item.pinned ? "ring-1 ring-primary/20" : ""}`} style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {item.pinned && <Icon name="Pin" size={14} className="text-primary" />}
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
              </div>
              <span className="text-xs text-muted-foreground">{item.date}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.content}</p>
            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
              <Icon name="User" size={12} />
              {item.author}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
