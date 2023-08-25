import '@/styles/main.scss';

import type { Metadata } from 'next';

import { childrenInterface } from '@/types';
import { Providers } from '@/redux/provider';

export const metadata: Metadata = {
  title: 'Quizzical',
  description:
    'Test your knowledge with our engaging Quiz App. Challenge yourself with a wide range of categories. Start playing now and become a quiz master!'
};

export default function RootLayout({ children }: childrenInterface) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
