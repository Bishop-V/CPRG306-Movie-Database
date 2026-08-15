<<<<<<< HEAD
/*
 * Add movie page.
 * This page returns the user to the login page if they are
 * not logged in.
 * Returns MovieForm to add movies through the component.
 */
=======
//Page for the creation of new movies.
//Movies created by the user on this page will be saved to the database via the saveMovie function imported from actions.ts.
// Validation of entered inputs is handled within saveMovie.

"use client";
>>>>>>> origin/Ash

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import MovieForm from "@/components/AddMovie";

export default async function AddMoviePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

<<<<<<< HEAD
  if (!user) {
    redirect("/login");
  }

  return <MovieForm />;
=======
        <form action={formAction} className="mt-7 gap-6 flex flex-col">
          <input
            className={inputStyle}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            placeholder=" Title"
          />

          <input
            className={inputStyle}
            value={year}
            onChange={(e) => setYear(e.target.value)}
            name="release_year"
            placeholder=" Year"
          />

          <input
            className={inputStyle}
            value={actors}
            onChange={(e) => setActors(e.target.value)}
            name="actors"
            placeholder=" Actors"
          />

          {state.error && (
            <p className="text-red-300 text-center">{state.error}</p>
          )}

          <input
            className={inputStyle}
            value={imageURI}
            onChange={(e) => setImageURI(e.target.value)}
            name="imageURI"
            placeholder="Letterboxd poster link or Blank"
          />

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
>>>>>>> origin/Ash
}
