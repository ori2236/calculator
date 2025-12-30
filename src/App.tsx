import './App.css'
import { Buttons } from './Buttons'
import { Display } from './Display'

const App = () => {
  return (
    <div className='calculator'>
      <div className='frame'>
        <div className='display'> <Display /></div>
        <div className='buttons'><Buttons /></div>

      </div>
    </div>
  )
}

export default App