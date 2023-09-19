"use client";
import Button from "@/base-components/Button";
import {
  FormHelp,
  FormInline,
  FormInput,
  FormLabel,
} from "@/base-components/Form";
import FormSwitch from "@/base-components/Form/FormSwitch";
import Lucide from "@/base-components/Lucide";
import Tippy from "@/base-components/Tippy";
import supabase from "@/lib/supabase-browser";
import { generateSlug } from "@/utils/helper";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const metadata = {
  title: "HSEOFGLA :: Add Category",
  description:
    "Provides functionality for admin to add categories to the application.",
};

const AddCategory = () => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const formSteps = [
    { id: 1, name: "Category Image", url: "" },
    { id: 2, name: "Category Information", url: "" },
    { id: 3, name: "Category Management", url: "" },
  ];

  const handleImagePreview = (evt) => {
    const files = evt.currentTarget.files;
    const previews = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        previews.push(e.target.result);
        if (previews.length === files.length) {
          setImagePreviews(previews);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    // create versions of the images
    const updatedImagePreviews = [...imagePreviews];
    const updatedCategoryImages = [...formik.values.categoryImages];

    // remove the selected image
    updatedImagePreviews.splice(index, 1);
    updatedCategoryImages.splice(index, 1);

    // update State and formik values
    setImagePreviews(updatedImagePreviews);
    formik.setFieldValue("categoryImages", updatedCategoryImages);
  };

  // Saving a Category

  const formik = useFormik({
    initialValues: {
      categoryImages: [],
      categoryName: "",
      categoryStatus: false,
      categorySlug: "",
    },
    onSubmit: async (values, { resetForm }) => {
      values.categorySlug = `/${generateSlug(values.categoryName)}`;
      setSubmitting(true);

      try {
        // Upload Images to Supabase Storage

        const imageUrls = await Promise.all(
          values.categoryImages?.map(async (image) => {
            const { data, error } = await supabase.storage
              .from("images")
              .upload(`category_images/${image.name}`, image);

            if (error) {
              console.log(error);
              throw new Error("Error uploading image.");
            }

            // Construct the Public URL from path
            const {
              data: { publicUrl },
            } = supabase.storage.from("images").getPublicUrl(data.path);

            return publicUrl;
          })
        );

        // ACTION: Resolve the issue of code saving an empty array to categories table instead of array from path for bucket images. (09.09.2023)
        // RESOLVED: Added Promise.all to saving of the images to bucket for the second insert to DB to wait for the promises to be fulfilled first.

        // Save the categories details
        const { data: categoryData, error: categoryError } = await supabase
          .from("categories")
          .insert([
            {
              name: values.categoryName,
              image_urls: imageUrls,
              is_active: values.categoryStatus,
              slug: values.categorySlug,
            },
          ]);

        if (categoryError) {
          console.log(categoryError);
          throw new Error("Error saving category data.");
        }
        setImagePreviews([]);
        resetForm();
      } catch (error) {
        console.error("Form submission error:", error);
      }

      setSubmitting(false);
    },
  });

  return (
    <>
      {" "}
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Add Category</h2>
      </div>
      <div
        className="grid grid-cols-11 pb-20 mt-5 gap-x-6"
        onSubmit={formik.handleSubmit}
      >
        <form className="col-span-11 intro-y 2xl:col-span-9">
          {/* BEGIN: Category Image Upload */}
          <div className="p-5 intro-y box">
            <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
              <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" />
                Upload Image
              </div>
              <div className="mt-5">
                <div className="flex items-center text-slate-500"></div>
                <FormInline className="flex-col items-start mt-10 xl:flex-row">
                  <FormLabel className="w-full xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Category Photos</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Optional
                        </div>
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-slate-500">
                        <div>
                          The image format is .jpg .jpeg .png and a minimum size
                          of 300 x 300 pixels (For optimal images use a minimum
                          size of 700 x 700 pixels).
                        </div>
                        <div className="mt-2">
                          Select photos or drag and drop up to 5 photos at once
                          here. This will represent products in this category
                          class.
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full pt-4 mt-3 border-2 border-dashed rounded-md xl:mt-0 dark:border-darkmode-400 cursor-pointer">
                    {!!imagePreviews.length && (
                      <div className="grid grid-cols-10 gap-5 pl-4 pr-5">
                        {imagePreviews.map((previewImg, index) => (
                          <div
                            key={index}
                            className="relative col-span-5 cursor-pointer md:col-span-2 h-28 image-fit zoom-in"
                          >
                            <Image
                              alt={`image preview ${index}`}
                              className="rounded-md"
                              src={previewImg}
                              fill
                            />
                            <Tippy
                              content="Remove this image?"
                              className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 -mt-2 -mr-2 text-white rounded-full bg-danger cursor-pointer"
                            >
                              <Lucide
                                icon="X"
                                className="w-4 h-4"
                                onClick={() => handleRemoveImage(index)}
                              />
                            </Tippy>
                          </div>
                        ))}
                      </div>
                    )}
                    {/* {formik.values.categoryImages.map((image, idx) => (
                        
                          
                        
                      ))} */}

                    <div className="relative flex items-center justify-center px-4 pb-4 mt-5 cursor-pointer">
                      <Lucide icon="Image" className="w-4 h-4 mr-2" />
                      <span className="mr-1 text-primary">
                        Upload a file
                      </span>{" "}
                      or drag and drop
                      <FormInput
                        id="categoryImages"
                        name="categoryImages"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(event) => {
                          const filesArray = Array.from(
                            event.currentTarget.files
                          );
                          formik.setFieldValue("categoryImages", filesArray);
                          handleImagePreview(event);
                        }}
                        className="absolute top-0 left-0 w-full h-full opacity-0"
                      />
                    </div>
                  </div>
                </FormInline>
              </div>
            </div>
          </div>
          {/* END: Category Image Upload */}

          {/* BEGIN:Category Information */}
          <div className="p-5 mt-5 intro-y box">
            <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
              <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" />
                Category Information
              </div>
              <div className="mt-5">
                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Category Name</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div>
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-slate-500">
                        Include a maximum of 15 characters to make it more
                        attractive and easy for buyers to associate with and it
                        should group products in a similar class as possible.
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput
                      id="categoryName"
                      name="categoryName"
                      type="text"
                      placeholder="Category Name"
                      onChange={formik.handleChange}
                      value={formik.values.categoryName}
                    />
                  </div>
                  <FormHelp className="text-right pl-2">
                    Maximum characters 0/15
                  </FormHelp>
                </FormInline>
                {/* TO BE ADDED: Image, name, slug(to be code from name, status (boolean) ) */}
                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Category Slug</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Auto Generated
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    {/* <span
                      className="ml-2 px-5 italic py-2 bg-slate-200  text-slate-600 dark:bg-darkmode-300 dark:text-slate-200 text-md rounded-md"
                      onChange={formik.handleChange}
                      name="categorySlug"
                      value={formik.values.categorySlug}
                    > */}
                    <FormInput
                      id="categorySlug"
                      name="categorySlug"
                      type="text"
                      disabled
                      placeholder="/slug"
                      onChange={formik.handleChange}
                      value={`/${generateSlug(formik.values.categoryName)}`}
                    />
                    {/* </span> */}
                  </div>
                </FormInline>
              </div>
            </div>
          </div>
          {/* END:Category Information */}
          {/* BEGIN: Category Management */}
          <div className="p-5 mt-5 intro-y box">
            <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
              <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" />
                Category Management
              </div>
              <div className="mt-5">
                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Category Status</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div>
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-slate-500">
                        If the status is active, the category can be searched
                        and selected for in the application
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <FormSwitch>
                      <FormSwitch.Input
                        id="categoryStatus"
                        name="categoryStatus"
                        type="checkbox"
                        onChange={formik.handleChange}
                        value={formik.values.categoryStatus}
                      />
                      <FormSwitch.Label htmlFor="category-status">
                        Active
                      </FormSwitch.Label>
                    </FormSwitch>
                  </div>
                </FormInline>
              </div>
            </div>
          </div>
          {/* END: Category Management */}
          <div className="flex flex-col justify-end gap-2 mt-5 md:flex-row">
            <Button
              type="button"
              className="w-full py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 md:w-52"
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="w-full py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 md:w-52"
            >
              Save & Add New Category
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="w-full py-3 md:w-52"
            >
              Save
            </Button>
          </div>
        </form>

        {/* BEGIN:Side Panel for Progress */}
        <div className="hidden col-span-2 intro-y 2xl:block">
          <div className="sticky top-0 pt-10">
            <ul className="text-slate-500 relative before:content-[''] before:w-[2px] before:bg-slate-200 before:dark:bg-darkmode-600 before:h-full before:absolute before:left-0 before:z-[-1]">
              {formSteps.map((stage) => (
                <li
                  key={stage.id}
                  className="pl-5 mb-4 border-1-2 border-transparent dark:border-transparent first:border-primary first:dark:border-primary first:text-primary first:font-medium"
                >
                  <Link href={stage.url}>{stage.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* END:Side Panel for Progress */}
      </div>
    </>
  );
};

export default AddCategory;
