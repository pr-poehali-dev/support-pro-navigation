import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/lib/auth";

const DAYS = ["Пн 24", "Вт 25", "Ср 26", "Чт 27", "Пт 28", "Сб 29", "Вс 30"];

const OPERATORS = [
  {
    name: "Сидоров К.Н.",
    shifts: [
      { day: 0, start: "09:00", end: "18:00", type: "full" },
      { day: 1, start: "09:00", end: "18:00", type: "full" },
      { day: 2, start: "09:00", end: "18:00", type: "full" },
      { day: 3, start: "09:00", end: "18:00", type: "full" },
      { day: 4, start: "09:00", end: "18:00", type: "full" },
      { day: 5, start: "", end: "", type: "off" },
      { day: 6, start: "", end: "", type: "off" },
    ],
  },
  {
    name: "Николаева О.А.",
    shifts: [
      { day: 0, start: "10:00", end: "19:00", type: "full" },
      { day: 1, start: "10:00", end: "19:00", type: "full" },
      { day: 2, start: "", end: "", type: "off" },
      { day: 3, start: "10:00", end: "19:00", type: "full" },
      { day: 4, start: "10:00", end: "19:00", type: "full" },
      { day: 5, start: "10:00", end: "16:00", type: "short" },
      { day: 6, start: "", end: "", type: "off" },
    ],
  },
  {
    name: "Фёдоров Д.С.",
    shifts: [
      { day: 0, start: "", end: "", type: "off" },
      { day: 1, start: "12:00", end: "21:00", type: "full" },
      { day: 2, start: "12:00", end: "21:00", type: "full" },
      { day: 3, start: "12:00", end: "21:00", type: "full" },
      { day: 4, start: "", end: "", type: "off" },
      { day: 5, start: "10:00", end: "16:00", type: "short" },
      { day: 6, start: "10:00", end: "16:00", type: "short" },
    ],
  },
];

const SHIFT_STYLES: Record<string, { bg: string; text: string }> = {
  full: { bg: "bg-blue-50", text: "text-blue-700" },
  short: { bg: "bg-amber-50", text: "text-amber-700" },
  off: { bg: "bg-gray-50", text: "text-gray-400" },
};

export default function Schedule() {
  const { user } = useAuth();
  const canEdit = user?.role === "admin" || user?.role === "okk";

  return (
    <DashboardLayout title="График" subtitle="Расписание смен операторов — неделя 24–30 марта 2026">
      {canEdit && (
        <div className="flex gap-3 mb-6">
          <Button className="gap-2"><Icon name="Plus" size={16} />Назначить смену</Button>
          <Button variant="outline" className="gap-2"><Icon name="Download" size={16} />Экспорт</Button>
        </div>
      )}

      <div className="bg-card rounded-xl border overflow-hidden animate-fade-in">
        <div className="grid" style={{ gridTemplateColumns: "200px repeat(7, 1fr)" }}>
          <div className="px-4 py-3 border-b border-r font-medium text-xs text-muted-foreground uppercase tracking-wider flex items-center">Оператор</div>
          {DAYS.map((day, i) => (
            <div key={i} className="px-3 py-3 border-b text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {day}
            </div>
          ))}

          {OPERATORS.map((op, oi) => (
            <>
              <div key={`name-${oi}`} className="px-4 py-4 border-b border-r flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold text-white" style={{ background: "hsl(220 50% 40%)" }}>
                  {op.name.split(" ").map(n => n[0]).join("")}
                </div>
                <span className="text-sm font-medium text-foreground">{op.name}</span>
              </div>
              {op.shifts.map((shift, si) => {
                const style = SHIFT_STYLES[shift.type];
                return (
                  <div key={`${oi}-${si}`} className={`px-2 py-4 border-b text-center ${canEdit ? "cursor-pointer hover:bg-muted/50" : ""} transition-colors`}>
                    {shift.type !== "off" ? (
                      <div className={`rounded-lg px-2 py-1.5 ${style.bg}`}>
                        <p className={`text-xs font-medium ${style.text}`}>{shift.start}</p>
                        <p className={`text-[10px] ${style.text} opacity-70`}>{shift.end}</p>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-300">Выходной</span>
                    )}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6 mt-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-50 border border-blue-200" />Полная смена</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-50 border border-amber-200" />Сокращённая</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-gray-50 border border-gray-200" />Выходной</span>
      </div>
    </DashboardLayout>
  );
}
