import { createContext, useContext, useState, ReactNode, useCallback } from "react";

export interface OperatorStatus {
  id: string;
  label: string;
  color: string;
  icon: string;
}

const DEFAULT_STATUSES: OperatorStatus[] = [
  { id: "online", label: "На линии", color: "#22c55e", icon: "CircleDot" },
  { id: "busy", label: "Занят", color: "#f59e0b", icon: "Clock" },
  { id: "break", label: "Перерыв", color: "#3b82f6", icon: "Coffee" },
  { id: "lunch", label: "Обед", color: "#8b5cf6", icon: "UtensilsCrossed" },
  { id: "training", label: "Обучение", color: "#06b6d4", icon: "GraduationCap" },
  { id: "meeting", label: "Совещание", color: "#ec4899", icon: "Users" },
  { id: "offline", label: "Не в сети", color: "#9ca3af", icon: "CircleOff" },
];

export interface StatusLog {
  userId: string;
  userName: string;
  statusId: string;
  statusLabel: string;
  color: string;
  timestamp: string;
  duration?: string;
}

interface StatusContextType {
  statuses: OperatorStatus[];
  currentStatus: OperatorStatus;
  setCurrentStatus: (status: OperatorStatus) => void;
  addStatus: (status: OperatorStatus) => void;
  removeStatus: (id: string) => void;
  updateStatus: (id: string, updates: Partial<OperatorStatus>) => void;
  statusLogs: StatusLog[];
}

const StatusContext = createContext<StatusContextType | null>(null);

const DEMO_LOGS: StatusLog[] = [
  { userId: "3", userName: "Сидоров К.Н.", statusId: "online", statusLabel: "На линии", color: "#22c55e", timestamp: "09:00", duration: "2ч 15м" },
  { userId: "3", userName: "Сидоров К.Н.", statusId: "break", statusLabel: "Перерыв", color: "#3b82f6", timestamp: "11:15", duration: "15м" },
  { userId: "3", userName: "Сидоров К.Н.", statusId: "online", statusLabel: "На линии", color: "#22c55e", timestamp: "11:30", duration: "1ч 30м" },
  { userId: "3", userName: "Сидоров К.Н.", statusId: "lunch", statusLabel: "Обед", color: "#8b5cf6", timestamp: "13:00", duration: "1ч" },
  { userId: "4", userName: "Николаева О.А.", statusId: "online", statusLabel: "На линии", color: "#22c55e", timestamp: "09:00", duration: "3ч" },
  { userId: "4", userName: "Николаева О.А.", statusId: "meeting", statusLabel: "Совещание", color: "#ec4899", timestamp: "12:00", duration: "45м" },
  { userId: "4", userName: "Николаева О.А.", statusId: "online", statusLabel: "На линии", color: "#22c55e", timestamp: "12:45", duration: "1ч 15м" },
  { userId: "5", userName: "Фёдоров Д.С.", statusId: "online", statusLabel: "На линии", color: "#22c55e", timestamp: "10:00", duration: "2ч" },
  { userId: "5", userName: "Фёдоров Д.С.", statusId: "training", statusLabel: "Обучение", color: "#06b6d4", timestamp: "12:00", duration: "2ч" },
];

export function StatusProvider({ children }: { children: ReactNode }) {
  const [statuses, setStatuses] = useState<OperatorStatus[]>(() => {
    const saved = localStorage.getItem("sp_statuses");
    return saved ? JSON.parse(saved) : DEFAULT_STATUSES;
  });

  const [currentStatus, setCurrentStatusState] = useState<OperatorStatus>(() => {
    const saved = localStorage.getItem("sp_current_status");
    return saved ? JSON.parse(saved) : DEFAULT_STATUSES[0];
  });

  const [statusLogs] = useState<StatusLog[]>(DEMO_LOGS);

  const setCurrentStatus = useCallback((status: OperatorStatus) => {
    setCurrentStatusState(status);
    localStorage.setItem("sp_current_status", JSON.stringify(status));
  }, []);

  const persist = (list: OperatorStatus[]) => {
    setStatuses(list);
    localStorage.setItem("sp_statuses", JSON.stringify(list));
  };

  const addStatus = useCallback((status: OperatorStatus) => {
    persist([...statuses, status]);
  }, [statuses]);

  const removeStatus = useCallback((id: string) => {
    persist(statuses.filter(s => s.id !== id));
  }, [statuses]);

  const updateStatus = useCallback((id: string, updates: Partial<OperatorStatus>) => {
    persist(statuses.map(s => s.id === id ? { ...s, ...updates } : s));
  }, [statuses]);

  return (
    <StatusContext.Provider value={{ statuses, currentStatus, setCurrentStatus, addStatus, removeStatus, updateStatus, statusLogs }}>
      {children}
    </StatusContext.Provider>
  );
}

export function useStatuses() {
  const ctx = useContext(StatusContext);
  if (!ctx) throw new Error("useStatuses must be used within StatusProvider");
  return ctx;
}

export default StatusProvider;