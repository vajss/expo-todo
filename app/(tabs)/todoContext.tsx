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
    console.log('Adding item:', item);
    const fullItem = { id: items?.length, text: item };

    setItems((prev) => [...prev, fullItem]);
  };

  const deleteItem = (item: ItemsType) => {
    console.log('>> index:', item.id);
    console.log(items);
    const filteredItems = items.filter((i) => i.id !== item.id);
    console.log('>> filteredItems:', filteredItems);
    setItems(() => filteredItems);

    console.log('NEW ITREMS:', items);
    console.log('###################');
  };

  return (
    <ItemsContext.Provider value={{ items, addItem, deleteItem }}>{children}</ItemsContext.Provider>
  );
}
