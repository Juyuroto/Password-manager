// CSS
import './assets/css/App.css'

// Components
import Header from './components/home/header'
import Main from './components/home/main'
import Footer from './components/home/footer'
import VaultPage from './pages/vault'

function App() {
  const isVaultPage = window.location.pathname === '/vault'

  return (
    <div className='app'>
      <Header />
      {isVaultPage ? <VaultPage /> : <Main />}
      <Footer />
    </div>
  )
}

export default App
