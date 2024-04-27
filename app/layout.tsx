import { createMetadata } from '@/lib/utils';
import '@/styles/main.scss';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { type Metadata } from 'next';
import { type PropsWithChildren } from 'react';

export const metadata: Metadata = createMetadata(
  'Quizzical',
  'Test your knowledge with our engaging Quiz App. Challenge yourself with a wide range of categories. Start playing now and become a quiz master!',
  '/thumbnail.png',
  new URL('https://julian-quizzical.vercel.app')
);

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang="en">
    <body>
      {children}
      <Analytics />
      <SpeedInsights />
    </body>
  </html>
);

export default RootLayout;
