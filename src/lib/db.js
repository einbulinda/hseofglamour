import supabase from "./supabase-browser";

export async function fetchCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("id,name,slug,is_active, image_urls");
  //.is("is_active", true);

  if (error) {
    console.log(error);
  } else {
    return data;
  }
}

export async function deactivateCategory(categoryId) {
  const {} = await supabase
    .from("categories")
    .update({ is_active: false })
    .match({ id: categoryId });
}
