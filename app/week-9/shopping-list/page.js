"use client";

import { useState } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json"; 
import MealIdeas from "./meal-ideas";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleItemSelect = (item) => {
    const cleanedItemName = item.name
      .split(",")[0] 
      .trim() 
      .replace(/[^a-zA-Z\s]/g, ""); 

    setSelectedItemName(cleanedItemName);
  };

  return (
    <main className="min-h-screen bg-slate-900 flex">
      <div className="flex-1 max-w-sm m-2">
        <h1 className="text-3xl font-bold m-2 text-white">Shopping List</h1>
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} onItemSelect={handleItemSelect} />
      </div>
      <MealIdeas ingredient={selectedItemName} />
    </main>
  );
}