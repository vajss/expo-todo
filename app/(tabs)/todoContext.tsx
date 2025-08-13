// ItemsContext.tsx
import React, { createContext, ReactNode, useState } from 'react';

type ItemsType = { id: number; text: string };

type ItemsContextType = {
  items: ItemsType[];
  addItem: (item: string) => void;
  deleteItem: (item: ItemsType) => void;
};

export const ItemsContext = createContext<ItemsContextType>({
  items: [],
  addItem: () => {},
  deleteItem: () => {},
});

export function ItemsProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<{ id: number; text: string }[]>([]);

  const addItem = (item: string) => {
    const fullItem = { id: items?.length, text: item };

    setItems((prev) => [...prev, fullItem]);
  };

  const deleteItem = (item: ItemsType) => {
    const filteredItems = items.filter((i) => i.id !== item.id);
    setItems(() => filteredItems);
  };

  return (
    <ItemsContext.Provider value={{ items, addItem, deleteItem }}>{children}</ItemsContext.Provider>
  );
}
