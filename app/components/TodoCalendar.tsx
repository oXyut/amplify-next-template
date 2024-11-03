import { Schema } from "@/amplify/data/resource";
import { Priority } from "../types/priority";
import { FaChevronLeft, FaChevronRight, FaCalendar } from "react-icons/fa";
import { useState } from "react";
import { DayDetailModal } from "./DayDetailModal";
import { getPriorityClasses } from "../utils/priorityUtils";

interface TodoCalendarProps {
  todos: Array<Schema["Todo"]["type"]>;
  onComplete: (todoId: string) => void;
}

export function TodoCalendar({ todos, onComplete }: TodoCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
  const days = [];
  const startDay = startOfMonth.getDay();
  
  // 前月の日を追加
  for (let i = 0; i < startDay; i++) {
    const day = new Date(startOfMonth);
    day.setDate(day.getDate() - (startDay - i));
    days.push({ date: day, isCurrentMonth: false });
  }
  
  // 当月の日を追加
  for (let i = 1; i <= endOfMonth.getDate(); i++) {
    const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    days.push({ date: day, isCurrentMonth: true });
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + offset,
      1
    ));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 選択された日付のtodosを取得
  const selectedDateTodos = selectedDate
    ? todos.filter(todo => {
        if (!todo.dueDate) return false;
        const todoDate = new Date(todo.dueDate);
        return todoDate.toDateString() === selectedDate.toDateString();
      })
    : [];

  const handleComplete = async (todoId: string) => {
    // onCompleteを直接使用する
    onComplete(todoId);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      {/* カレンダーヘッダー */}
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <button
              onClick={() => changeMonth(-1)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FaChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={() => changeMonth(1)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FaChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>

          <button
            onClick={goToToday}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FaCalendar className="w-4 h-4" />
            <span>Today</span>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* カレンダーグリッド */}
      <div className="grid grid-cols-7 p-2 gap-1">
        {days.map(({ date, isCurrentMonth }, index) => {
          const dayTodos = todos.filter(todo => {
            if (!todo.dueDate) return false;
            const todoDate = new Date(todo.dueDate);
            return todoDate.toDateString() === date.toDateString();
          });

          const isToday = date.toDateString() === new Date().toDateString();

          return (
            <div
              key={index}
              className={`
                min-h-[120px] p-1 rounded-lg border transition-colors cursor-pointer
                ${isCurrentMonth
                  ? "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700"
                  : "bg-gray-50 dark:bg-gray-900/50 border-gray-100/50 dark:border-gray-800/50"
                }
                ${isToday ? "ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-gray-800" : ""}
                hover:bg-gray-50 dark:hover:bg-gray-700/50
              `}
              onClick={() => setSelectedDate(date)}
            >
              <div className={`
                text-sm mb-2 font-medium
                ${isCurrentMonth
                  ? "text-gray-700 dark:text-gray-300"
                  : "text-gray-400 dark:text-gray-600"
                }
                ${isToday ? "text-primary-600 dark:text-primary-400" : ""}
              `}>
                {date.getDate()}
              </div>
              <div className="space-y-1">
                {dayTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`
                      text-xs
                      bg-gray-50 dark:bg-gray-900/50
                      flex items-center gap-2 py-1 px-1
                      border-l-2 rounded-md
                      border border-gray-100 dark:border-gray-800
                      ${getPriorityClasses(todo.priority as Priority).border}
                    `}
                  >
                    <div className="flex-1 min-w-0">
                      <p className={`
                        truncate
                        text-gray-900 dark:text-gray-100
                      `}>
                        {todo.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <DayDetailModal
          isOpen={selectedDate !== null}
          onClose={() => setSelectedDate(null)}
          date={selectedDate}
          todos={selectedDateTodos}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
} 