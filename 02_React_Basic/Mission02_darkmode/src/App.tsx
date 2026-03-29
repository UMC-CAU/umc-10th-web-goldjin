import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Contents from './components/Contents'
import { useTheme } from './contexts/ThemeContext'

function App() {
  const {theme} = useTheme()

  const divClassName = `flex items-center flex-col h-screen ${
    theme == 'dark'
    ? 'bg-black text-white'
    : 'bg-white text-black'}
  }`

  return (
    <div className={divClassName}>
      <Header />
      <Contents />
      <Footer />
    </div>
  )
}

export default App
