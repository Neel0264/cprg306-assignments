import React from 'react';

export default function Item({ name, quantity, category, onSelect }) {
  return (
    <li
      className="p-2 m-2  max-w-sm bg-gray-700 hover:bg-orange-800 cursor-pointer"
      onClick={() => onSelect({ name, quantity, category })}
    >
      <h3 className="text-xl font-bold">{name}</h3>
      <div className="text-sm">Buy {quantity} in {category}</div>
    </li>
  );
}