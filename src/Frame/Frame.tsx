import './Frame.css'
import { useRef, useState } from 'react'
import { ButtonsGrid } from '../ButtonsGrid/ButtonsGrid'
import { Display } from '../Display/Display';

export const Frame = () => {
  const [expression, setExpression] = useState<string>("");
  const [answer, setAnswer] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cursorPositionRef = useRef<number | null>(null);

  return (
    <div className='frame'>
      <div className='display'>
        <Display
          expression={expression}
          inputRef={inputRef}
          cursorPositionRef={cursorPositionRef}
          answer={answer}
        />
      </div>
      <div className='buttons'>
        <ButtonsGrid
          expression={expression}
          setExpression={setExpression}
          inputRef={inputRef}
          cursorPositionRef={cursorPositionRef}
          expressionLength={expression.length}
          answer={answer}
          setAnswer={setAnswer}
        />
      </div>
    </div>
  )
}