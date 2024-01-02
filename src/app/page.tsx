import Link from "next/link";
import { fetchTodos } from "@/app/lib/data";
import { DeleteTodo, UpdateTodo } from "./ui/buttons";

export default async function Home() {

  const todos = await fetchTodos();

  return (
    <>
      <h1>Todos</h1>
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
}
