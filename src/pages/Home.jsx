import { Banner, Header } from "../components"

export const Home = () => {
  return (
    <div className="bg-[#000000E5] min-h-screen">
      <Header/>
      <Banner/>
      <div>
        asd
      </div>

      <div className="border-t-4 border-[#2A7AE4]">
        <div className="flex justify-center mt-2">
        <img src="/LogoMain.png" alt="" />
        </div>
      </div>
    </div>
  )
}
