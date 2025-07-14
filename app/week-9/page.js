'use client';

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  return (
    <div className="p-6 text-center">
      {!user ? (
        <>
          <h1 className="text-2xl mb-4">Welcome to the Shopping List App</h1>
          <button
            onClick={gitHubSignIn}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Login with GitHub
          </button>
        </>
      ) : (
        <>
          <p className="text-xl mb-2">
            Welcome, {user.displayName} ({user.email})
          </p>
          <button
            onClick={firebaseSignOut}
            className="bg-red-600 text-white px-4 py-2 rounded mb-4"
          >
            Logout
          </button>

          <div className="mt-4">
            <Link href="/week-9/shopping-list">
              <span className="text-blue-500 underline cursor-pointer">
                Go to Shopping List
              </span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
