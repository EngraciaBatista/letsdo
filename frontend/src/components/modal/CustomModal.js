import React from "react";
import { Modal } from "antd";

const CustomModal = ({ visible, onClose, title, content }) => {
  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      title={title}
      footer={null} // Set footer to null if you want custom buttons inside content
    >
      {content}
    </Modal>
  );
};

export default CustomModal;
