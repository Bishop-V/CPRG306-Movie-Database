import Image from "next/image";
import { getMovies } from "@/lib/data";
import MovieCard from "@/components/MovieCard";

export default async function Home() {
  const movies = await getMovies();

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
          <MovieCard movie={movie} />
        ))}
      </div>
    </main>
  );
}
