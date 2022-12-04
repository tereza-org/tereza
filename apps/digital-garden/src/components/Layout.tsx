import * as React from 'react';
import Link from 'next/link';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>
        <h1>My Zettelkasten</h1>
        <nav>
          <Link href="/">Home</Link>
          {' | '}
          <Link href="/graph">Graph</Link>
          {' | '}
          <Link href="/flashcard">Flashcard</Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};
