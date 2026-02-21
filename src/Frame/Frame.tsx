import './Frame.css'
import { useRef, useState } from 'react'
import { ButtonsGrid } from '../ButtonsGrid/ButtonsGrid'
import { Display } from '../Display/Display';
import type { AnswerLine } from '../Types/CalculationTypes';

export const Frame = () => {
  const [expression, setExpression] = useState("");
  const [answerLine, setAnswerLine] = useState<AnswerLine>("Empty expression");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cursorPositionRef = useRef<number | null>(null);

  return (
    <div className='frame'>
      <Display
        expression={expression}
        inputRef={inputRef}
        cursorPositionRef={cursorPositionRef}
        answerLine={answerLine}
      />
      <ButtonsGrid
        expression={expression}
        setExpression={setExpression}
        inputRef={inputRef}
        cursorPositionRef={cursorPositionRef}
        answerLine={answerLine}
        setAnswerLine={setAnswerLine}
      />
    </div>
  )
}