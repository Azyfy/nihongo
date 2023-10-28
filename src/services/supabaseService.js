import { supabase } from "../config/supabaseClient";

export async function getAllWords() {
  const { data, error } = await supabase.from("words").select();

  if (error) {
    console.log("Error:", error);
    return [];
  }

  return data;
}
