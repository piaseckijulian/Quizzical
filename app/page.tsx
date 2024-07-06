import Blob from "@/components/Blob"
import HomeButton from "@/components/HomeButton"
import SelectCategory from "@/components/SelectCategory"
import { getCategories } from "@/lib/queries"

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
