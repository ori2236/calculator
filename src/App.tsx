import { useRef, useState } from 'react'
import './App.css'
import { Frame } from './Frame';

const App = () => {
  const [expression, setExpression] = useState<string>("");
  const [answer, setAnswer] = useState<number | null>(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const cursorPositionRef = useRef<number | null>(null);

  return (
    <div className='calculator'>
      <Frame />
    </div>
  )
}

export default App