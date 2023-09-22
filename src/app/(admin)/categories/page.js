"use client";
import Button from "@/base-components/Button";
import { FormInput } from "@/base-components/Form";
import Menu from "@/base-components/Headless/Menu";
import Lucide from "@/base-components/Lucide";
import ConfirmDeleteModal from "@/base-components/Modals/ConfirmDelete";
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from "@/base-components/Table";
import Tippy from "@/base-components/Tippy";
import { deactivateCategory, fetchCategories } from "@/lib/db";
import { isArrayWithElements } from "@/utils/helper";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedCategory(null);
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Categories</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          <Button variant="primary" className="mr-2 shadow-md">
            Add New Category
          </Button>
          <Menu>
            <Menu.Button as={Button} className="px-2 !box">
              <span className="flex items-center justify-center w-5 h-5">
                <Lucide icon="Plus" className="w-4 h-4" />
              </span>
            </Menu.Button>
            <Menu.Items className="w-40">
              <Menu.Item>
                <Lucide icon="Printer" className="w-4 h-4 mr-2" />
                Print
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                Export to Excel
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                Export to PDF
              </Menu.Item>
            </Menu.Items>
          </Menu>
          <div className="hidden mx-auto md:block text-slate-500">
            Showing 1 to 10 of 150 rows
          </div>
          <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
            <div className="relative w-56 text-slate-500">
              <FormInput
                type="text"
                className="w-56 pr-10 !box"
                placeholder="Search..."
              />
              <Lucide
                icon="Search"
                className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
              />
            </div>
          </div>
        </div>

        {/* BEGIN: Data List */}
        <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
          <Table className="border-spacing-y-[10px] border-separate -mt-2">
            <TableHeader>
              <TableRow>
                <TableHead className="border-b-0 whitespace-nowrap">
                  IMAGES
                </TableHead>
                <TableHead className="border-b-0 whitespace-nowrap">
                  CATEGORY NAME
                </TableHead>
                <TableHead className="border-b-0 whitespace-nowrap">
                  SLUG
                </TableHead>
                <TableHead className="text-center border-b-0 whitespace-nowrap">
                  STATUS
                </TableHead>
                <TableHead className="text-center border-b-0 whitespace-nowrap">
                  ACTION
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id} className="intro-x">
                  <TableData className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="flex">
                      {isArrayWithElements(category.image_urls) ? (
                        category.image_urls.map((imageUrl, index) => {
                          console.log(imageUrl);
                          return (
                            <div
                              key={index}
                              className="w-10 h-10 image-fit zoom-in"
                            >
                              <Tippy
                                as="img"
                                alt={imageUrl}
                                src={imageUrl}
                                className="rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                              />
                            </div>
                          );
                        })
                      ) : (
                        <div className="w-10 h-10 image-fit zoom-in">
                          <Tippy
                            as="img"
                            alt={category.name}
                            src="/rsz_400dpilogo-black.png"
                            content="date"
                            className="rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                          />
                        </div>
                      )}
                    </div>
                  </TableData>
                  <TableData className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <Link href="" className="font-medium whitespace-nowrap">
                      {category.name}
                    </Link>
                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      Tags: {category.name}
                    </div>
                  </TableData>
                  <TableData className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <Link
                      href=""
                      className="flex items-center mr-3 text-slate-500"
                    >
                      <Lucide icon="ExternalLink" className="w-4 h-4 mr-2" />
                      {category.slug}
                    </Link>
                  </TableData>
                  <TableData className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div
                      className={clsx([
                        "flex items-center justify-center",
                        { "text-success": category.is_active },
                        { "text-danger": !category.is_active },
                      ])}
                    >
                      <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                      {category.is_active ? "Active" : "Inactive"}
                    </div>
                  </TableData>
                  <TableData className="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                    <div className="flex items-center justify-center">
                      <Link className="flex items-center mr-3" href="">
                        <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center text-danger cursor-pointer"
                        href="#"
                        onClick={(event) => {
                          event.preventDefault();
                          openDeleteModal(category.id);
                        }}
                      >
                        <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
                      </Link>
                    </div>
                  </TableData>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* END: Data List */}
      </div>

      {/* BEGIN:Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={deactivateCategory}
        itemData={selectedCategory}
      />
      {/* END:Delete Confirmation Modal */}
    </>
  );
};

export default CategoriesList;
