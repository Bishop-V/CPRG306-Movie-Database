//This is the generic layour for each movie card that can be mapped to with the dataset
import { deleteMovie } from "@/lib/actions";
import { Movie } from "@/types/movie";
import Link from "next/link";
import Image from "next/image";

type MovieCardProps = {
  movie: Movie;
  isLoggedIn?: boolean;
};

export default function MovieCard({
  movie,
  isLoggedIn = false,
}: MovieCardProps) {
  const buttonStyle =
    "inline-flex bg-purple-400 cursor-pointer rounded-lg text-purple-100 w-60 justify-center";

  return (
    
      <div className="bg-gray-700 rounded-md p-4 flex flex-row">
        <div className ="flex flex-col">
        <h2 className="text-xl text-purple-200">{movie.title}</h2>
        <p className="text-purple-100">Released: {movie.release_year}</p>

        <p className="italic text-purple-100">
          Featuring: {movie.actors.join(", ")}
        </p>
        {/*edit and delete buttons for logged in users*/}
        {isLoggedIn && (
          <div className="gap-2 flex mt-auto pt-3 ">
            <Link href="/" className={buttonStyle}>
              Edit
            </Link>
            <form action={deleteMovie.bind(null, movie.title)}>
              <button className={buttonStyle} type="submit">
                Delete
              </button>
            </form>
          </div>
        )}
      </div>
      {movie.imageURI && (
        <div className="h-20 w-15 self-start ml-5">
        <Image
      src={movie.imageURI}
      alt={movie.title}
      height={480}
      width={380}
      />
      </div>)}
    </div>
  );
}
