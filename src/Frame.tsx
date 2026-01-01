import { useRef, useState } from 'react'
import './Frame.css'
import { Buttons } from './Buttons'
import { Display } from './Display';

export const Frame = () => {
  const [expression, setExpression] = useState<string>("");
  const [answer, setAnswer] = useState<number | null>(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const cursorPositionRef = useRef<number | null>(null);

  return (
      <div className='frame'>
        <div className='display'>
          <Display
            expression={expression}
            setExpression={setExpression}
            inputRef={inputRef}
            cursorPositionRef={cursorPositionRef}
            answer={answer}
          />
        </div>
        <div className='buttons'>
          <Buttons
            setExpression={setExpression}
            inputRef={inputRef}
            cursorPositionRef={cursorPositionRef}
            expressionLength={expression.length}
            answer={answer}
            setAnswer={setAnswer} />
        </div>
      </div>
  )
}