import React from 'react'
// import coverImg from './assets/cover.jpg'
import light from './assets/light.png'
import dark from './assets/dark.png'
import Input from "./Components/Input"


function App() {
  const [darkMode, setDarkMode] = React.useState(true)

  if (darkMode) {
    document.body.classList.add("dark")
    document.body.classList.remove("light")
  } else {
    document.body.classList.add("light")
    document.body.classList.remove("dark")
  }

  function changeMode() {
    setDarkMode(prevMode => !prevMode)
  }
  return (
    <main>
      <div className='feature'>
        <h1>TODO APP</h1>
        <div className='modes'>
          <img
            onClick={changeMode}
            className="mode1"
            style={{ display: darkMode ? "block" : "none" }}
            src={dark}
            alt="icon8-moon" />
          <img
            onClick={changeMode}
            style={{ display: !darkMode ? "block" : "none" }}
            className="mode2"
            src={light}
            alt="icon8-moon" />
        </div>
      </div>
      <Input
        darkMode={darkMode} />
    </main >
  )
}

export default App
