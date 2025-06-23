export default function Item({ name, quantity, category }) {
  return (
    <div className="bg-[#1e293b] px-2 py-2 w-2/5">
      <h3 className="font-bold text-xl">{name}</h3>
      <p className="text-md">Buy {quantity} in {category}</p>
    </div>
  );
}
