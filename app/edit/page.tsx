/*Server side edit movie page. Redirects the user if they are not logged in to the login page.
 * Interacts with supabase to change the current movie.
 * server component that communicates with supabase to check log in status and grab movie details
 * movie id (title) is passed to this page via url search params
 * Grabs information about the movie to use as the default form values, which are passed to the EditMovieForm component.
 *
 */
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import EditMovieForm from "@/components/EditMovie";

export default async function EditMoviePage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { id } = await searchParams;

  if (!id) {
    redirect("/");
  }
  const { data: movie, error } = await supabase
    .from("movie")
    .select("*")
    .eq("title", id)
    .single();

  if (error) {
    console.error(error);
  }

  const imageURI = movie.imageURI ?? "";
  return (
    <EditMovieForm
      loadTitle={movie.title}
      loadActors={movie.actors}
      loadYear={movie.release_year}
      loadImageURL={imageURI}
    />
  );
}
