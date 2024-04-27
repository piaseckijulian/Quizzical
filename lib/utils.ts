import { type Metadata } from 'next';

export const createMetadata = (
  title: string,
  description: string,
  image: string,
  url: URL
): Metadata => ({
  title,
  description,
  openGraph: { title, description, images: [{ url: image }], url },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [image],
    creator: '@piaseckijulian'
  },
  icons: ['/favicon.ico'],
  metadataBase: url
});

export const shuffle = (array: any[]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    array.push(array[randomIndex]);
    array.splice(randomIndex, 1);
  }
  return array;
};
