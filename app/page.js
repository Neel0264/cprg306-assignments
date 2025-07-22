// app/page.js
'use client';

export default function Home() {
  return (
    <main className="p-4 text-white bg-slate-900 min-h-screen">
      <h1 className="text-3xl font-bold">Welcome to CPRG306 Assignments</h1>
      <p className="mt-2">
        Go to{' '}
        <a
          href="/week-10/shopping-list"
          className="underline text-blue-400 hover:text-blue-300"
        >
          Week 10 Shopping List
        </a>
      </p>
    </main>
  );
}
