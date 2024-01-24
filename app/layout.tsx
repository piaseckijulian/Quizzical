import '@/styles/main.scss';
import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Quizzical',
  description:
    'Test your knowledge with our engaging Quiz App. Challenge yourself with a wide range of categories. Start playing now and become a quiz master!'
};

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang="en">
    <body>{children}</body>
  </html>
);

export default RootLayout;
