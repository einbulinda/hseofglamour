import supabase from "./supabase-browser";

export async function fetchCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("id,name,is_active")
    .is("is_active", true);

  if (error) {
    console.error(error);
  } else {
    return data;
  }
}
