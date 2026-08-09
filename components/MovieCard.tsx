import { Movie } from "@/types/movie";

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="bg-purple-400 rounded-md p-4">
      <h2 className="text-xl text-purple-50">{movie.title}</h2>
      <p className="text-purple-50">Released: {movie.release_year}</p>

      <p className="italic text-purple-100">
        Featuring: {movie.actors.join(", ")}
      </p>
    </div>
  );
}
