import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import MovieForm from "@/components/AddMovie";

export default async function AddMoviePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <MovieForm />;
}