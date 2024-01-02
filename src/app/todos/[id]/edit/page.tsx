import { updateTodo } from "@/app/lib/actions";
import { fetchTodoById } from "@/app/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditTodo({ params }: { params: { id: number } }) {
    const id = Number(params.id);
    const todo = await fetchTodoById(id);
    if (!todo) {
        return notFound();
    }
    return (
        <>
            <Link href="/">All Todos</Link>
            <h1>Edit todo</h1>
            <form action={updateTodo}>
                <label>Title</label>
                <input type="number" name="id" defaultValue={todo?.id} hidden></input>
                <input name="title" defaultValue={todo?.title}></input>
                <input name="isCompleted" defaultValue={todo?.isCompleted}></input>
                <button>Update</button>
            </form>
        </>
    )
}