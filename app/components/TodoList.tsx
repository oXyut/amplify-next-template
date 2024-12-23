import type { Schema } from "@/amplify/data/resource";
import { useState } from 'react';
import { Priority, getPriorityValue } from '../types/priority';
import { type SortType, type SortOrder } from '../types/sort';
import { TodoItem } from './TodoItem';
import { TodoSortControls } from './TodoSortControls';

interface TodoListProps {
  todos: Array<Schema["Todo"]["type"]>;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, onDelete }: TodoListProps) {
  const [sortType, setSortType] = useState<SortType>('priority');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const sortedTodos = [...todos].sort((a, b) => {
    let comparison = 0;
    
    switch (sortType) {
      case 'priority':
        comparison = getPriorityValue(a.priority as Priority) - getPriorityValue(b.priority as Priority);
        if (comparison === 0) {
          comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        break;
      
      case 'created':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      
      case 'due':
        if (!a.dueDate && !b.dueDate) comparison = 0;
        else if (!a.dueDate) comparison = 1;
        else if (!b.dueDate) comparison = -1;
        else comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        break;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return (
    <div className="space-y-2">
      <TodoSortControls
        sortType={sortType}
        sortOrder={sortOrder}
        onSortTypeChange={setSortType}
        onSortOrderChange={setSortOrder}
      />

      {sortedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          priority={todo.priority as Priority}
          content={todo.content}
          dueDate={todo.dueDate ? new Date(todo.dueDate) : undefined}
          createdAt={new Date(todo.createdAt)}
          onDelete={() => onDelete(todo.id)}
        />
      ))}
    </div>
  );
}