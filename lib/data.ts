import type { Movie } from "./types";
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
