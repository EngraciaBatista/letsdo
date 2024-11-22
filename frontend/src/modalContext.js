import React, { createContext, useContext, useState, useCallback } from "react";

// Create Modal Context
const ModalContext = createContext();

// Modal Provider
export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

// Custom Hook to use Modal context
export const useModal = () => useContext(ModalContext);
