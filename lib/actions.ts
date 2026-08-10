"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteMovie(title: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("movie").delete().eq("title", title);

  if (error) throw error;

  revalidatePath("/");
}
