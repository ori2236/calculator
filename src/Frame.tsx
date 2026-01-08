import './Frame.css'
import { useLayoutEffect, useRef, useState } from 'react'
import { Buttons } from './Buttons'
import { Display } from './Display';
import { validateExpression } from './calcExpression';

export const Frame = () => {
  const [expression, setExpression] = useState<string>("");
  const [answer, setAnswer] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cursorPositionRef = useRef<number | null>(null);

  //we are using useLayoutEffect because we want the expression will be set after
  //the DOM is rendering and before the browser paints the screen
  useLayoutEffect(() => {
    //the expression is empty or contain only numbers
    if (expression) {
      const { canBeCalc, validExpression } = validateExpression(expression);
      const validExpressionString = validExpression.join("");
      const deltaLengthExpressions = validExpressionString.length - expression.length;
      cursorPositionRef.current ? cursorPositionRef.current += deltaLengthExpressions : null;
      canBeCalc ? setAnswer(1) : setAnswer(null);
      setExpression(validExpression.join(""))
    } else {
      setAnswer(null);
    }
  }, [expression]);

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
        />
      </div>
    </div>
  )
}