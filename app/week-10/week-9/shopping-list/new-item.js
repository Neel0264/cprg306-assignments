'use client';
import { useState } from 'react';

export default function NewItem({ onAddItem }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState('Produce');

  function handleSubmit(event) {
    event.preventDefault();

    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      quantity,
      category,
    };

    onAddItem(newItem);
    setName('');
    setQuantity(1);
    setCategory('Produce');
  }

  function increaseQty() {
    setQuantity(prev => prev + 1);
  }

  function decreaseQty() {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm p-4 bg-[#0f172a] rounded-lg space-y-4"
    >
      <input
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item name"
        className="w-full p-2 rounded border border-gray-300 text-black bg-white"
      />

      <div className="flex space-x-4">
        <div className="flex items-center justify-between bg-white rounded px-3 py-1 text-black w-1/2">
          <span className="font-medium">{quantity}</span>
          <div className="flex space-x-1">
            <button
              type="button"
              onClick={decreaseQty}
              className="text-white bg-gray-400 rounded px-3 py-0.5"
            >
              -
            </button>
            <button
              type="button"
              onClick={increaseQty}
              className="text-white bg-blue-500 rounded px-3 py-0.5"
            >
              +
            </button>
          </div>
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1 p-2 rounded border border-gray-300 bg-white text-black"
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Bakery">Bakery</option>
          <option value="Meat">Meat</option>
          <option value="Frozen Foods">Frozen Foods</option>
          <option value="Canned Goods">Canned Goods</option>
          <option value="Dry Goods">Dry Goods</option>
          <option value="Beverages">Beverages</option>
          <option value="Snacks">Snacks</option>
          <option value="Household">Household</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded text-xl hover:bg-blue-600"
      >
        +
      </button>
    </form>
  );
}
