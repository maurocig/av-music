"use client";
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";

type UploadModalProps = {};

export default function UploadModal({}: UploadModalProps) {
  const uploadModal = useUploadModal();

  const onChange = (open: boolean) => {
    if (!open) {
      // Reset the form
      uploadModal.onClose();
    }
  };

  return (
    <Modal
      title="'Upload modal title"
      description="Upload modal description"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      UploadModal
    </Modal>
  );
}
