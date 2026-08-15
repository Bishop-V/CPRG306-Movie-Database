//Server actions for creating, updating, and deleting movies via Supabase.
//validateMovie validates form data that saveMovie receives, returning an error or the cleaned up inputs from the form.
//saveMovie handles editing and adding of movies.

"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
//Delete movie
export async function deleteMovie(title: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("movie").delete().eq("title", title);
  if (error) throw error;
  revalidatePath("/");
}
//Movie form validation for add and edit
export type MovieFormState = { error?: string };
function validateMovie(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const actorsInput = String(formData.get("actors") ?? "").trim();
  const releaseYear = Number(String(formData.get("release_year") ?? "").trim());
  const imageURI = String(formData.get("imageURI") ?? "").trim();
  if (!title) return { error: "Title is required." };
  if (title.length > 50)
    return { error: "Title must be 50 characters or fewer." };
  if (!Number.isInteger(releaseYear))
    return { error: "Release year must be a whole number." };
  const actors = actorsInput
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);
  if (actors.length === 0) return { error: "Enter at least one actor." };
  if (!imageURI.includes("film-poster") || !imageURI.includes("ltrbxd")) {
    return {
      error:
        "Please link to a letterboxd poster.\n Example https://a.ltrbxd.com/resized/film-poster/1/4/1/8/6/6/141866-fateful-findings-0-1000-0-1500-crop.jpg?v=e6a020c8e1",
    };
  }

  return { data: { title, release_year: releaseYear, actors, imageURI } };
}
//Add/edit movie.
export async function saveMovie(
  ogTitle: string | null,
  _prevState: MovieFormState,
  formData: FormData,
): Promise<MovieFormState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "You must be logged in." };
  const result = validateMovie(formData);
  if (!result.data) return { error: result.error };
  //if ogTitle is null, no movie with that name exists. Add the movie. Otherwise, update where ogTitle
  const { error } = ogTitle
    ? await supabase.from("movie").update(result.data).eq("title", ogTitle)
    : await supabase.from("movie").insert(result.data);
  if (error) return { error: error.message };
  revalidatePath("/");
  redirect("/");
}
