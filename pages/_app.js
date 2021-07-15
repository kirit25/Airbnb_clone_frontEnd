import '../styles/globals.css'
import NavBar from '../Component/NavBar'

const MyApp= ({ Component, pageProps })=> {
  return (
  <>
    <NavBar/>
    <Component {...pageProps} />
    </>
  )  
}

export default MyApp
