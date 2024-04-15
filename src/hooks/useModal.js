import {useState} from 'react';

export const useModal = () => {
    const [isActive, setActive] = useState(false);
    const [isEditActive, setEditActive] = useState(false);

    const openHandler = () => {
      setActive(true);
      setEditActive(false);
    };
    const openEditHandler = () => {
      setEditActive(true);
      setActive(false);
    };

    return {
      isActive,
      isEditActive,
      setActive,
      setEditActive,
      openHandler,
      openEditHandler,
    };
  }
;