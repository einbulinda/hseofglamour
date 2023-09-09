"use client";
import Button from "@/base-components/Button";
import { FormInput } from "@/base-components/Form";
import Menu from "@/base-components/Headless/Menu";
import Lucide from "@/base-components/Lucide";
import Table from "@/base-components/Table";

const ProductsList = () => {
  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Products</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          <Button variant="primary" className="mr-2 shadow-md">
            Add New Product
          </Button>

          {/* BEGIN: Exporting Product Listing @einbulinda #05/08/2023 */}
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
          {/* END: Exporting Product Listing @einbulinda #05/08/2023*/}

          {/* TODO: To be transformed to dynamic values based on pagination settings */}
          <div className="hidden mx-auto md:block text-slate-500">
            Showing 1 to 10 of 150 entries
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
          <Table>
            <Table.Thead></Table.Thead>
          </Table>
        </div>
        {/* END: Data List */}
      </div>
    </>
  );
};

export default ProductsList;
