import ItemList from "./item-list";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0e111d] px-6 py-10">
      <h1 className="text-white text-3xl font-bold mb-6">Shopping List</h1>
      <ItemList />
    </main>
  );
}
