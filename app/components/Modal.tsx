import React from "react";
import Button from "@/app/components/Button";
import { labels } from "../data/label";

interface IModal {
  isModalOpen: boolean;
  closeModal: () => void;
  handleDelete: () => void;
}

const Modal: React.FC<IModal> = ({ isModalOpen, closeModal, handleDelete }) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-[var(--orange)] p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold">{labels.deleteMessageModal}</h2>
        <div className="flex justify-around mt-4">
          <Button
            label="Cancel"
            style="bg-[var(--blue)] text-white px-4 py-2 rounded-xl"
            action={closeModal}
          />
          <Button
            label="Confirm"
            style="bg-red-600 text-white px-4 py-2 rounded-xl"
            action={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
