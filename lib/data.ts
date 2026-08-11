import type { Movie } from "@/types/movie";
import { createClient } from "@/utils/supabase/server";

export async function getMovies(): Promise<Movie[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("movie")
    .select("*")
    .order("title");
  if (error) throw error;
  return data;
}

export async function getMovieByTitle(title: string): Promise<Movie | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("movie")
    .select("*")
    .eq("title", title)
    .single();
  if (error) return null;
  return data;
}
