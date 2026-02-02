import './Frame.css'
import { useRef, useState } from 'react'
import { ButtonsGrid } from '../ButtonsGrid/ButtonsGrid'
import { Display } from '../Display/Display';

export const Frame = () => {
  const [expression, setExpression] = useState("");
  const [answer, setAnswer] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cursorPositionRef = useRef<number | null>(null);

  return (
    <div className='frame'>
        <Display
          expression={expression}
          inputRef={inputRef}
          cursorPositionRef={cursorPositionRef}
          answer={answer}
        />
        <ButtonsGrid
          expression={expression}
          setExpression={setExpression}
          inputRef={inputRef}
          cursorPositionRef={cursorPositionRef}
          answer={answer}
          setAnswer={setAnswer}
        />
    </div>
  )
}