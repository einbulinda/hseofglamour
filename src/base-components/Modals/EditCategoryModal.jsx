import React from "react";
import { Dialog, Panel } from "../Dialog";
import Lucide from "../Lucide";
import { FormHelp, FormInline, FormInput, FormLabel } from "../Form";
import { useFormik } from "formik";
import { generateSlug } from "@/utils/helper";
import FormSwitch from "../Form/FormSwitch";
import Button from "../Button";

const EditCategoryModal = ({ isOpen, onClose, onConfirm, data }) => {
  const initialValues = {
    categoryName: data?.name || "",
    categoryImages: data?.image_urls,
    categorySlug: data?.slug || "/slug",
    categoryStatus: data?.is_active || false,
  };

  console.log(initialValues);

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      onConfirm(values);
    },
  });

  return (
    <Dialog open={isOpen} onClose={onClose} size="xl">
      <Panel>
        <div className="flex items-center mt-8 intro-y">
          <h2 className="mr-auto text-lg font-medium">Edit Category Details</h2>
        </div>
        <div className="pb-20 mt-5 gap-x-6">
          {data && (
            <form className="intro-y" onSubmit={formik.handleSubmit}>
              {/* BEGIN:Image Details */}
              <div className="p-5 intro-y box">
                <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                  <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                    <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" />
                    Upload Image
                  </div>
                  <div className="mt-5">
                    <div className="flex items-center text-slate-500">
                      <FormInline className="flex-col items-start mt-10 xl:flex-row">
                        <FormLabel className="w-full xl:w-64 xl:!mr-10">
                          <div className="text-left">
                            <div className="flex items-center">
                              <div className="font-medium">Category Photos</div>
                              <div className="ml-2 px-2 py-0 5 bg-slate-500 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                optional
                              </div>
                            </div>
                            <div className="mt-3 text-xs leading-relaxed text-slate-500">
                              <div>
                                The image format is .jpg .jpeg .png and a
                                minimum size of 300 x 300 pixels (For optimal
                                images use a minimum size of 700 x 700 pixels).
                              </div>
                              <div className="mt-2">
                                Select photos or drag and drop up to 5 photos at
                                once here. This will represent products in this
                                category class.
                              </div>
                            </div>
                          </div>
                        </FormLabel>
                        <div className="flex-1 w-full pt-4 mt-3 border-2 border-dashed rounded-md xl:mt-0 dark:border-darkmode-400 cursor-pointer">
                          Images
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
                              attractive and easy for buyers to associate with
                              and it should group products in a similar class as
                              possible.
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
                            onBlur={formik.handleBlur}
                            value={formik.values?.categoryName}
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
                            onBlur={formik.handleBlur}
                            value={formik.values.categorySlug}
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
                              If the status is active, the category can be
                              searched and selected for in the application
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
                              onBlur={formik.handleBlur}
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
                <div className="flex flex-col justify-center gap-2 mt-5 md:flex-row">
                  <Button
                    type="button"
                    className="w-full py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 md:w-52"
                    onClick={onClose}
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
              </div>
            </form>
          )}
        </div>
      </Panel>
    </Dialog>
  );
};

export default EditCategoryModal;
