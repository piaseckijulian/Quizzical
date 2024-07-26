import { cn } from "@/lib/utils"
import Image from "next/image"

type Props = {
  side: "right" | "left"
  isQuiz?: boolean
}

const Blob = ({ side, isQuiz }: Props) => {
  return (
    <Image
      src={`/assets/blob-${side}.svg`}
      alt=""
      className={cn(`blob blob__${side}`, isQuiz && "blob__quiz")}
      width={200}
      height={200}
    />
  )
}

export default Blob
