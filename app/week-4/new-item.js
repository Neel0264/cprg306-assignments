'use client';
import { useState } from 'react';

export default function NewItem() {
  const [qty, updateQty] = useState(1);

  const increase = () => {
    if (qty < 20) updateQty(qty + 1);
  };

  const decrease = () => {
    if (qty > 1) updateQty(qty - 1);
  };

  return (
    
    <div className="flex justify-center mt-0.2">
      <div className="flex items-center justify-between bg-white border border-gray-300 px-2 py-2 w-[150px] shadow-sm">
        <span className="text-sm text-black">{qty}</span>

        <div className="flex gap-1.5">
          <button
            onClick={decrease}
            disabled={qty === 1}
            className={`bg-blue-500 text-white text-sm w-8 h-6 rounded-md shadow-sm flex items-center justify-center ${
              qty === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
          >
            -
          </button>

          <button
            onClick={increase}
            disabled={qty === 20}
            className={`bg-blue-500 text-white text-sm w-8 h-6 rounded-md shadow-sm flex items-center justify-center ${
              qty === 20 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
