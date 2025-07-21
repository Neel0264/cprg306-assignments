'use client';

import { useState, useEffect } from 'react';
import { useUserAuth } from '../../_utils/auth-context';
import { getItems, addItem } from '../_services/shopping-list-service';
import ItemList from './item-list';
import NewItem from './new-item';
import MealIdeas from './meal-ideas';

export default function Page() {
  const { user } = useUserAuth();
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState('');

  useEffect(() => {
    async function loadItems() {
      const loadedItems = await getItems(user.uid);
      setItems(loadedItems);
    }

    if (user) {
      loadItems();
    }
  }, [user]);

  const handleAddItem = async (newItem) => {
    if (!user) return;
  
    const id = await addItem(user.uid, newItem);     // Save to Firestore
    const newItemWithId = { ...newItem, id };        // Add Firestore ID
    setItems((prevItems) => [...prevItems, newItemWithId]); // Add to list
  };
  
  

  const handleItemSelect = (item) => {
    const cleanedItemName = item.name
      .split(',')[0]
      .trim()
      .replace(/[^a-zA-Z\s]/g, '');

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
