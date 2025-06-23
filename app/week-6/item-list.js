'use client';

import { useState } from 'react';
import Item from './item';
import items from './items.json';

export default function ItemList() {
  const [sortBy, setSortBy] = useState('name');

  let sortedItems = [...items];

  if (sortBy === 'name') {
    sortedItems.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'category') {
    sortedItems.sort((a, b) => a.category.localeCompare(b.category));
  }

  const groupedItems = sortedItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="text-white">
      {/* 🛒 Heading with extra space below */}
      <h1 className="text-3xl font-bold mb-8">Shopping List</h1>

      {/* 🔘 Sort Buttons */}
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
        <button
          onClick={() => setSortBy('grouped')}
          className={`px-7 py-2 text-md font-semibold leading-tight text-center ${
            sortBy === 'grouped' ? 'bg-[#FFAC1C] text-black' : 'bg-[#CC5500] text-white'
          }`}
        >
          Grouped<br />Category
        </button>
      </div>

      {/* 📦 Item List */}
      <div className="space-y-3">
        {sortBy === 'grouped' ? (
          Object.keys(groupedItems)
            .sort()
            .map((category) => (
              <div key={category}>
                <h2 className="capitalize font-semibold text-lg mt-4 mb-2">{category}</h2>
                {groupedItems[category].map((item) => (
                  <Item
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    category={item.category}
                  />
                ))}
              </div>
            ))
        ) : (
          sortedItems.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))
        )}
      </div>
    </div>
  );
}
