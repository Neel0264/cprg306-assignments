'use client';

import { useState } from 'react';
import Item from './item';

export default function ItemList({ items }) {
  const [sortBy, setSortBy] = useState('name');

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'category') return a.category.localeCompare(b.category);
    return 0;
  });

  return (
    <div className="text-white">
      <div className="mb-4 flex items-center gap-3">
        <span className="text-white font-medium">Sort by:</span>
        <button
          onClick={() => setSortBy('name')}
          className={`px-7 py-2 text-md font-semibold ${
            sortBy === 'name' ? 'bg-[#FFAC1C] text-black' : 'bg-[#CC5500] text-white'
          }`}
        >
          Name
        </button>
        <button
          onClick={() => setSortBy('category')}
          className={`px-7 py-2 text-md font-semibold ${
            sortBy === 'category' ? 'bg-[#FFAC1C] text-black' : 'bg-[#CC5500] text-white'
          }`}
        >
          Category
        </button>
      </div>

      <div className="space-y-3">
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            category={item.category}
          />
        ))}
      </div>
    </div>
  );
}
