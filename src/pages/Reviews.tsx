import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const REVIEWS = [
  { author: "Алексей М.", source: "Яндекс.Карты", rating: 5, text: "Отличная поддержка! Решили проблему за 10 минут.", date: "23.03.2026", responded: true },
  { author: "Елена К.", source: "Google", rating: 4, text: "В целом хорошо, но пришлось ждать ответа 2 часа.", date: "22.03.2026", responded: true },
  { author: "Дмитрий В.", source: "2GIS", rating: 2, text: "Проблему не решили, перенаправляли 3 раза.", date: "22.03.2026", responded: false },
  { author: "Марина С.", source: "Яндекс.Карты", rating: 5, text: "Быстро, вежливо, профессионально. Рекомендую!", date: "21.03.2026", responded: true },
  { author: "Игорь П.", source: "Google", rating: 3, text: "Средний уровень поддержки, ожидал большего.", date: "20.03.2026", responded: false },
  { author: "Ольга Н.", source: "Отзовик", rating: 1, text: "Ужасный сервис. Не могу дозвониться уже неделю.", date: "19.03.2026", responded: false },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Icon key={s} name="Star" size={14} className={s <= count ? "text-amber-400" : "text-gray-200"} fill={s <= count ? "currentColor" : "none"} />
      ))}
    </div>
  );
}

const avg = (REVIEWS.reduce((a, r) => a + r.rating, 0) / REVIEWS.length).toFixed(1);
const responded = REVIEWS.filter(r => r.responded).length;

export default function Reviews() {
  return (
    <DashboardLayout title="Отзывы" subtitle="Мониторинг отзывов с внешних площадок">
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-card rounded-xl border p-4 animate-fade-in">
          <p className="text-xs text-muted-foreground">Средний рейтинг</p>
          <p className="text-3xl font-bold text-foreground mt-1">{avg}</p>
          <Stars count={Math.round(Number(avg))} />
        </div>
        <div className="bg-card rounded-xl border p-4 animate-fade-in" style={{ animationDelay: "80ms" }}>
          <p className="text-xs text-muted-foreground">Всего отзывов</p>
          <p className="text-3xl font-bold text-foreground mt-1">{REVIEWS.length}</p>
          <p className="text-xs text-muted-foreground">За последний месяц</p>
        </div>
        <div className="bg-card rounded-xl border p-4 animate-fade-in" style={{ animationDelay: "160ms" }}>
          <p className="text-xs text-muted-foreground">С ответом</p>
          <p className="text-3xl font-bold text-foreground mt-1">{responded}</p>
          <p className="text-xs text-green-600">{Math.round(responded / REVIEWS.length * 100)}% отвечены</p>
        </div>
        <div className="bg-card rounded-xl border p-4 animate-fade-in" style={{ animationDelay: "240ms" }}>
          <p className="text-xs text-muted-foreground">Без ответа</p>
          <p className="text-3xl font-bold text-foreground mt-1">{REVIEWS.length - responded}</p>
          <p className="text-xs text-red-500">Требуют внимания</p>
        </div>
      </div>

      <div className="bg-card rounded-xl border divide-y">
        {REVIEWS.map((review, i) => (
          <div key={i} className="px-5 py-4 animate-fade-in" style={{ animationDelay: `${i * 40}ms` }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <Icon name="User" size={14} className="text-muted-foreground" />
                </div>
                <div>
                  <span className="text-sm font-medium text-foreground">{review.author}</span>
                  <span className="text-xs text-muted-foreground ml-2">{review.source}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Stars count={review.rating} />
                <span className="text-xs text-muted-foreground">{review.date}</span>
                {review.responded ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-[10px]">Отвечено</Badge>
                ) : (
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-[10px]">Без ответа</Badge>
                )}
              </div>
            </div>
            <p className="text-sm text-foreground ml-11">{review.text}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
