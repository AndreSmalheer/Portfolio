import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import landingPage from './pages/landingPage/landingPage'

function App() {
    const [isLoaded, setIsLoaded] = useState(false);

    return(
        <>
        {!isLoaded && <LoadingScreen NextPage={landingPage} />}
        </>
    )

}

export default App
