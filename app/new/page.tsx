"use client";

import { useActionState, useState } from "react";
import { saveMovie } from "@/lib/actions";

export default function MovieForm() {
  const [state, formAction] = useActionState(saveMovie.bind(null, null), {});
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [actors, setActors] = useState("");
  const inputStyle =
    "border-2 border-purple-200 rounded-2xl placeholder:text-gray-400 text-center";

  return (
    <main className="w-full min-h-screen flex items-center justify-center">
      <div className="bg-gray-700 rounded-lg p-8 w-[90%] max-w-md flex flex-col items-center">
        <h2 className="text-purple-400 text-3xl font-bold">Add a movie</h2>

        <form action={formAction}
        
         className="mt-7 gap-6 flex flex-col">
          <input className={inputStyle} 
          value = {title}
          onChange = {(e)=> setTitle(e.target.value)}
          name="title" 
          placeholder=" Title" />

          <input
            className={inputStyle}
            value={year}
            onChange ={(e)=> setYear(e.target.value)}
            name="release_year"
            placeholder=" Year"
          />

          <input className={inputStyle} 
          value={actors}
          onChange = {(e)=> setActors(e.target.value)}
          name="actors" 
          placeholder=" Actors" />

          {state.error && (
            <p className="text-red-300 text-center">{state.error}</p>
          )}

          <button
            type="submit"
            className="bg-purple-300 px-2 py-1 rounded-lg hover:bg-purple-200 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
