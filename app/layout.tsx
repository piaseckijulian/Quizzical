import { createMetadata } from "@/lib/utils"
import "@/styles/main.scss"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { PropsWithChildren } from "react"

export const metadata = createMetadata()

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang="en">
    <body>
      {children}
      <Analytics />
      <SpeedInsights />
    </body>
  </html>
)

export default RootLayout
