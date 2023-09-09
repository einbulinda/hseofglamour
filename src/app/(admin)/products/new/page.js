"use client";
import Alert from "@/base-components/Alert";
import {
  FormInline,
  FormInput,
  FormLabel,
  FormHelp,
  FormSelect,
} from "@/base-components/Form";
import Lucide from "@/base-components/Lucide";
import TomSelect from "@/base-components/TomSelect";
import supabase from "@/lib/supabase-browser";
import { useEffect, useState } from "react";

const NewProduct = () => {
  const [categories, setCategories] = useState([]);
  const [subcategory, setSubcategory] = useState(["0"]);

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from("categories")
        .select("id,name")
        .is("is_active", true);

      if (error) {
        console.error(error);
      } else {
        setCategories(data);
      }
    }

    fetchCategories();
  }, []);

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Add Product</h2>
      </div>
      <div className="grid grid-cols-11 pb-20 mt-5 gap-x-6">
        {/* BEGIN: Notification */}
        <Alert
          variant="primary"
          dismissible
          className="col-span-11 mb-6 intro-y box dark:border-darkmode-600"
        >
          <div className="flex items-center">
            <span>
              <Lucide icon="Info" className="w-4 h-4 mr-2" />
            </span>
            <span>
              From here, you can define the product details for the application.
            </span>
          </div>
        </Alert>
        {/* END: Notification */}

        <div className="col-span-11 intro-y 2xl:col-span-9">
          {/* BEGIN: Upload Product */}
          <div className="p-5 intro-y box">
            <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
              <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Upload
                Product
              </div>

              <div className="mt-5">
                <FormInline className="flex-col items-start mt-10 xl:flex-row">
                  <FormLabel className="w-full xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Product Photos</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div>
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-slate-500">
                        <div>
                          The image format is .jpg .jpeg .png and a minimum size
                          of 300 X 300 pixels (For optimal images use a minimum
                          size of 700 X 700 pixels).
                        </div>
                        <div className="mt-2">
                          Select product photos or drag and drop up to 5 photos
                          at once here. Include min. 3 attractive photos to make
                          the product more attractive to buyers.
                        </div>
                      </div>
                    </div>
                  </FormLabel>

                  <div className="flex-1 w-full pt-4 mt-3 border-2 border-dashed rounded-md xl:mt-0 dark:border-darkmode-400">
                    <div className="grid grid-cols-10 gap-5 pl-4 pr-5">
                      {/* Images for the product. */}
                    </div>

                    <div className="relative flex items-center justify-center px-4 pb-4 mt-5 cursor-pointer">
                      <Lucide icon="Image" className="w-4 h-4 mr-2" />
                      <span className="mr-1 text-primary">
                        Upload a file
                      </span>{" "}
                      or drag and drop
                      <FormInput
                        id="horizontal-form-1"
                        type="file"
                        className="absolute top-0 left-0 w-full h-full opacity-0"
                      />
                    </div>
                  </div>
                </FormInline>
              </div>
            </div>
          </div>
          {/* END: Upload Product */}

          {/* BEGIN: Product Information */}
          <div className="p-5 mt-5 intro-y box">
            <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
              <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Product
                Information
              </div>
              <div className="mt-5">
                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Product Name</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div>
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-slate-500">
                        Include min. 40 characters to make it more attractive
                        and easy for buyers to find, consisting of product type,
                        brand, and information such as color, material, or type.
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput
                      id="product-name"
                      type="text"
                      placeholder="Product Name"
                    />
                    <FormHelp className="text-right">
                      Maximum character 0/70
                    </FormHelp>
                  </div>
                </FormInline>

                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Category</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <FormSelect id="category">
                      {/* Dynamic Data added for dropdown @einbulinda#20.08.2023*/}
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </FormSelect>
                  </div>
                </FormInline>

                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Sub Category</div>
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-slate-500">
                        You can add a new subcategory or choose from the
                        existing subcategory list.
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <TomSelect
                      value={subcategory}
                      onChange={setSubcategory}
                      options={{ placeholder: "Duvets" }}
                      className="w-full"
                      multiple
                    >
                      {/* Replace categories with subcategories for selected category. System should also save the entered subcategory */}
                      {categories.map((_subcategory) => (
                        <option key={_subcategory.id} value={_subcategory.name}>
                          {_subcategory.name}
                        </option>
                      ))}
                    </TomSelect>
                  </div>
                </FormInline>
              </div>
            </div>
          </div>
          {/* END: Product Information */}
        </div>
      </div>
    </>
  );
};

export default NewProduct;
