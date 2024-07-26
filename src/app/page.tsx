import { Blob } from "@/components/blob"
import { getCategories } from "@/lib/queries"
import { HomeButton } from "./home-button"
import { SelectCategory } from "./select-category"

const Home = async () => {
  const categories = await getCategories()

  return (
    <main className="home">
      <Blob side="left" />
      <Blob side="right" />

      <h1>Quizzical</h1>
      <p>Test your knowledge!</p>

      <SelectCategory categories={categories} />

      <HomeButton />
    </main>
  )
}

export default Home
