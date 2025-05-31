export default function Item({ name, quantity, category }) {
  return (
    <li className="bg-[#1a1f36] p-4 rounded-none shadow-sm max-w-sm w-full">
      <p className="text-white text-lg font-bold">{name}</p>
      <p className="text-gray-300 text-sm">Buy {quantity} in {category}</p>
    </li>
  );
}
