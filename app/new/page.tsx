/*
 * Add movie page.
 * This page returns the user to the login page if they are
 * not logged in.
 * server component that uses the MovieForm component to add movies to the database.
 * Returns MovieForm to add movies through the component.
 */

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
