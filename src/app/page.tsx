import Link from "next/link";

import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchTodos } from "@/app/lib/data";
import { redirect } from 'next/navigation';
import { DeleteTodo, UpdateTodo } from "@/app/ui/buttons";
import { LogoutButton } from "./ui/logout";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  const todos = await fetchTodos();

  return (
    <>
      <h1>Todos</h1>
      <LogoutButton></LogoutButton>
      <p>Here are your all todos...</p>
      <Link href="/todos/create">Create a todo</Link>
      <div>
        {
          todos.map((todo, i) => {
            return (
              <div key={i}>
                <h3>{todo.title}</h3>
                <label>Completed</label>
                {
                  todo.isCompleted === "1" ? <h3>Yes</h3> : <h3>No</h3>
                }
                <UpdateTodo id={todo.id}></UpdateTodo>
                <DeleteTodo id={todo.id}></DeleteTodo>
              </div>
            );
          })
        }
      </div>
    </>
  )
};
