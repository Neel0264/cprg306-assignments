"use client";

import React, { useState } from 'react';
import Item from './item';

export default function ItemList({ items, onItemSelect }) {
  const [sortBy, setSortBy] = useState('name');

  const sortedItems = [...items];

  if (sortBy === 'name') {
    sortedItems.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'category') {
    sortedItems.sort((a, b) => a.category.localeCompare(b.category));
  }

  return (
    <div className="w-full">
      <div className="flex mb-4 items-center">
        <span className="text-xl font-bold mr-4">Sort by:</span>
        <button
          className={`px-4 py-2  transition-colors duration-200 mr-2
                      bg-orange-400 text-white ${ 
                        sortBy === 'name' ? 'font-bold' : '' 
                      }`}
          onClick={() => setSortBy('name')}
        >
          Name
        </button>
        <button
          className={`px-4 py-2  transition-colors duration-200
                      bg-orange-800 text-white ${ 
                        sortBy === 'category' ? 'font-bold' : '' 
                      }`}
          onClick={() => setSortBy('category')}
        >
          Category
        </button>
      </div>
      <ul>
        {sortedItems.map(item => (
          <Item
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            category={item.category}
            onSelect={onItemSelect}
          />
        ))}
      </ul>
    </div>
  );
}