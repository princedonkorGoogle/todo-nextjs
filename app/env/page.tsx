'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function EnvPage() {
  const [envVars, setEnvVars] = useState<Record<string, string>>({});

  useEffect(() => {
    // In Next.js, environment variables available to the browser
    // need to be prefixed with NEXT_PUBLIC_.
    // To show all variables for debugging purposes on the server-side,
    // this page would ideally have a server-side component
    // or an API route to fetch process.env.

    // This client-side example will only show NEXT_PUBLIC_ vars.
    const vars: Record<string, string> = {};
    for (const key in process.env) {
      if (key.startsWith('NEXT_PUBLIC_')) {
        vars[key] = process.env[key] || '';
      }
    }
    // To make this more useful for the bug bash,
    // we'll add a placeholder for server-side vars.
    // Replace this with an actual API call in a real scenario.
    vars['MY_VAR_FROM_YAML'] = 'yaml_value (client-side placeholder)';
    vars['NEW_VAR_FROM_BACKEND'] = 'backend_value (client-side placeholder)';

    // Simulate fetching all env vars from an API route
    fetch('/api/env')
      .then(res => res.json())
      .then(data => {
        setEnvVars(data);
      })
      .catch(() => {
        setEnvVars({ 'Error': 'Could not fetch server-side environment variables.' });
      });
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center gap-12 py-16 px-8 bg-white dark:bg-black">
        <header className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-semibold text-black dark:text-zinc-50">
            Environment Variables
          </h1>
          <Link href="/" className="text-blue-600 hover:underline dark:text-blue-400">
            &larr; Back to Todo App
          </Link>
        </header>

        <section className="w-full rounded-md border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-900">
          <h2 className="text-2xl font-medium text-black dark:text-zinc-50 mb-4">Detected Environment Variables</h2>
          {Object.keys(envVars).length > 0 ? (
            <ul className="space-y-2">
              {Object.entries(envVars).sort(([keyA], [keyB]) => keyA.localeCompare(keyB)).map(([key, value]) => (
                <li key={key} className="flex flex-wrap items-center justify-between border-b border-zinc-100 dark:border-zinc-800 py-2 last:border-b-0">
                  <code className="text-sm text-green-700 dark:text-green-400 break-all">{key}</code>
                  <code className="text-sm text-black dark:text-zinc-50 break-all text-right ml-4">{value}</code>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-zinc-500 dark:text-zinc-400">
              Loading environment variables...
            </p>
          )}
        </section>

        <footer className="text-center text-zinc-500 dark:text-zinc-400 mt-auto">
          <p>Environment variable inspector</p>
        </footer>
      </main>
    </div>
  );
}
