import Image from 'next/image'
import Footer from '../components/common/Footer'
import Header from '../components/common/Head'
import Main from '../components/home/main'

export default function Home() {



  return (
    <div>
      <Header title={"D-Link"} />
      <Main />
      <Footer />
    </div>
  )
}
