"use client";

import { createTodo } from "@/app/lib/actions";

export default function CreateTodo() {
    return (
        <>
            <h1>Create a new Todo</h1>
            <form action={createTodo}>
                <label>Title</label>
                <input name="title"></input>
                <button>Create</button>
            </form>
        </>
    )
}
