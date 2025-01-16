import Square from './Square';
import Input from './Input';
import {useState} from 'react'


function App() {
  const [ colorValue, setColorvalue] = useState('')
  const [hexValue, setHexValue] = useState('')
  const [isDarkText, setIsDarkText] = useState(true)
  return (
    <div className="App">
      <Square
        colorValue={colorValue} 
        hexValue={hexValue}
        isDarkText={isDarkText}
      />
      <Input 
        colorValue={colorValue}
        setColorvalue={setColorvalue}
        setHexValue={setHexValue}
        isDarkText={isDarkText}
        setIsDarkText={setIsDarkText}
      />
    </div>
  );
}

export default App;
