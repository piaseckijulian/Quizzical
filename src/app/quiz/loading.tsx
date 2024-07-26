"use client"

import { TailSpin } from "react-loader-spinner"

const Loading = () => {
  return (
    <main className="quiz__loading">
      <TailSpin height={550} width={80} color="#404c82" />
    </main>
  )
}

export default Loading
