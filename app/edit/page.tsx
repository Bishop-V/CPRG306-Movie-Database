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
      const {data: movie, error} = await supabase
      .from("movie")
      .select("*")
      .eq("title", id)
      .single();
  
      if(error) {
          console.error(error);
      }

  return <EditMovieForm 
  loadTitle = {movie.title}
  loadActors = {movie.actors}
  loadYear = {movie.release_year}
  loadImageURL = {movie.imageURL}
  />;
}