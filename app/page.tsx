import { getMovies } from "@/lib/data";
import MovieCard from "@/components/MovieCard";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const movies = await getMovies();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="m-4 mt-5">
      {/*Top area*/}
      <div>
        <p className="text-purple-200 text-4xl italic">
          Find your new favourite!
        </p>
      </div>

      {/*Movies*/}

      <div className="grid grid-cols-3 gap-4 mx-auto my-4">
        {movies.map((movie) => (
          <MovieCard key={movie.title} movie={movie} isLoggedIn={!!user} />
        ))}
      </div>
    </main>
  );
}
