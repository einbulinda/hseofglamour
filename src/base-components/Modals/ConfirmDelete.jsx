"use client";
import { Dialog, Panel } from "@/base-components/Dialog";
import Lucide from "../Lucide";
import Button from "../Button";
import { useRef } from "react";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, data }) => {
  const deleteButtonRef = useRef(null);

  return (
    <Dialog open={isOpen} onClose={onClose} initialFocus={deleteButtonRef}>
      <Panel>
        <div className="p-5 text-center">
          <Lucide
            icon="XCircle"
            className="w-16 h-16 mx-auto mt-3 text-danger"
          />
          <div className="mt-5 text-3xl">Are you sure?</div>
          <div className="mt-2 text-slate-500">
            Do you want to delete this record? <br />
            The record will not be displayed in the application.
          </div>
        </div>

        <div className="px-5 pb-8 text-center">
          <Button
            variant="outline-secondary"
            type="button"
            onClick={onClose}
            className="w-24 mr-1"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            type="button"
            className="w-24"
            ref={deleteButtonRef}
            onClick={() => {
              onConfirm(data);
              onClose();
            }}
          >
            Delete
          </Button>
        </div>
      </Panel>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
