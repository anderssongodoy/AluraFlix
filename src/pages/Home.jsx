import { Banner, Footer, Header, Sliders } from "../components"

export const Home = () => {


  return (
    <div className="bg-[#000000E5] min-h-screen">
      <Header/>
      <Banner/>
      <div>
        <Sliders />
      </div>
      <Footer/>
    </div>
  )
}
