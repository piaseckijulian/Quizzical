import { type ClassValue, clsx } from "clsx"
import type { Metadata } from "next"
import { twMerge } from "tailwind-merge"

const title = "Quizzical"
const description =
  "Quizzical is a fun and easy-to-use trivia quiz app where you can test your knowledge on various topics."
const image = "/thumbnail.png"
const url = new URL("https://julian-quizzical.vercel.app")

export const createMetadata = (): Metadata => ({
  title,
  description,
  twitter: {
    title,
    description,
    images: image,
    card: "summary_large_image"
  },
  openGraph: {
    title,
    description,
    url,
    images: image,
    siteName: title
  },
  metadataBase: url
})

export const shuffle = <T>(array: T[]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    array.push(array[randomIndex])
    array.splice(randomIndex, 1)
  }

  return array
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
