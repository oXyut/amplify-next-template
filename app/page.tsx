"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { TodoList } from "./components/TodoList";
import { ActionButton } from "./components/ActionButton";
import { TutorialMessage } from "./components/TutorialMessage";
import { CreateTodoModal } from "./components/CreateTodoModal";
import { Priority } from "@/app/types/priority";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const {user, signOut} = useAuthenticator();
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo(
    content: string,
    dueDate?: string,
    includeTime: boolean = false,
    priority: Priority = Priority.Medium
  ) {
    let dueDateValue = null;
    if (dueDate) {
      const date = new Date(dueDate);
      if (!includeTime) {
        date.setHours(0, 0, 0, 0);
      }
      dueDateValue = date.toISOString();
    }

    client.models.Todo.create({
      content,
      createdAt: new Date().toISOString(),
      dueDate: dueDateValue,
      priority
    });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary-400 to-white dark:from-primary-900 dark:to-gray-900 p-4">
      <div className="w-full max-w-md flex flex-col items-stretch gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {user?.signInDetails?.loginId}'s todos
        </h1>
        
        <ActionButton onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="w-6 h-6 mr-2" />
          <span>Create a new todo</span>
        </ActionButton>
        
        <TodoList todos={todos} onDelete={deleteTodo} />
        
        <TutorialMessage />
        
        <ActionButton onClick={signOut}>Sign out</ActionButton>
      </div>

      <CreateTodoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={createTodo}
      />
    </main>
  );
}
