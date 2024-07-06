import blobLeft from "@/app/assets/blob-left.svg"
import blobRight from "@/app/assets/blob-right.svg"
import { cn } from "@/lib/utils"
import Image from "next/image"

type Props = {
  side: "right" | "left"
  quiz?: boolean
}

const Blob = ({ side, quiz }: Props) => {
  return (
    <Image
      src={side === "left" ? blobLeft : blobRight}
      alt=""
      className={cn(`blob blob__${side}`, quiz && "blob__quiz")}
    />
  )
}

export default Blob
