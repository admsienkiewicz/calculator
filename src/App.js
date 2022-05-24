import { useReducer } from 'react'
import './App.css'

const defaultState = {
  prevDigit: '',
  currDigit: '',
  operand: '',
  afterEqual: false,
}
const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'DIGIT_CLICK':
      if (state.afterEqual) {
        return {
          ...state,
          currDigit: payload,
          afterEqual: false,
        }
      }
      const newCurrDigit =
        state.currDigit.length < 15
          ? state.currDigit + payload
          : state.currDigit
      console.log(state)
      return {
        ...state,
        currDigit: newCurrDigit,
      }
    case 'CLEAR_ALL':
      return defaultState
    case 'DELETE':
      return {
        ...state,
        currDigit: state.currDigit.slice(0, -1),
      }
    case 'OPERAND_CLICK':
      if (state.currDigit === '') return defaultState
      if (state.operand) {
        return {
          ...state,
          currDigit: '',
          prevDigit: evaluateResult(state),
          operand: payload,
        }
      }
      return {
        ...state,
        currDigit: '',
        prevDigit: state.currDigit,
        operand: payload,
      }
    case 'EVALUATE':
      if (state.currDigit === '') return { ...state }
      return {
        ...state,
        currDigit: evaluateResult(state),
        prevDigit: '',
        operand: '',
        afterEqual: true,
      }
    default:
      throw new Error('Reducer Type error')
  }
}

const evaluateResult = (state) => {
  let result
  switch (state.operand) {
    case '/':
      result = parseFloat(state.prevDigit) / parseFloat(state.currDigit)
      break
    case '*':
      result = parseFloat(state.prevDigit) * parseFloat(state.currDigit)
      break
    case '+':
      result = parseFloat(state.prevDigit) + parseFloat(state.currDigit)
      break
    case '-':
      result = parseFloat(state.prevDigit) - parseFloat(state.currDigit)
      break
    default:
      return { ...state }
  }
  return '' + +(Math.round(result + 'e+5') + 'e-5')
}

function App() {
  const [state, dispatch] = useReducer(reducer, defaultState)

  const { prevDigit, currDigit, operand } = state
  return (
    <>
      <h1>Calculator</h1>
      <div className="calculator">
        <div className="output">
          <div className="prev-input">{prevDigit + operand}</div>
          <div className="curr-input">{currDigit}</div>
        </div>
        <button
          className="span-2"
          onClick={() => dispatch({ type: 'CLEAR_ALL' })}
        >
          AC
        </button>
        <button onClick={() => dispatch({ type: 'DELETE' })}>DEL</button>
        <button
          onClick={() => dispatch({ type: 'OPERAND_CLICK', payload: '/' })}
        >
          /
        </button>

        <button onClick={() => dispatch({ type: 'DIGIT_CLICK', payload: '1' })}>
          1
        </button>
        <button onClick={() => dispatch({ type: 'DIGIT_CLICK', payload: '2' })}>
          2
        </button>
        <button onClick={() => dispatch({ type: 'DIGIT_CLICK', payload: '3' })}>
          3
        </button>
        <button
          onClick={() => dispatch({ type: 'OPERAND_CLICK', payload: '*' })}
        >
          *
        </button>

        <button onClick={() => dispatch({ type: 'DIGIT_CLICK', payload: '4' })}>
          4
        </button>
        <button onClick={() => dispatch({ type: 'DIGIT_CLICK', payload: '5' })}>
          5
        </button>
        <button onClick={() => dispatch({ type: 'DIGIT_CLICK', payload: '6' })}>
          6
        </button>
        <button
          onClick={() => dispatch({ type: 'OPERAND_CLICK', payload: '+' })}
        >
          +
        </button>

        <button onClick={() => dispatch({ type: 'DIGIT_CLICK', payload: '7' })}>
          7
        </button>
        <button onClick={() => dispatch({ type: 'DIGIT_CLICK', payload: '8' })}>
          8
        </button>
        <button onClick={() => dispatch({ type: 'DIGIT_CLICK', payload: '9' })}>
          9
        </button>
        <button
          onClick={() => dispatch({ type: 'OPERAND_CLICK', payload: '-' })}
        >
          -
        </button>

        <button onClick={() => dispatch({ type: 'DIGIT_CLICK', payload: '.' })}>
          .
        </button>
        <button onClick={() => dispatch({ type: 'DIGIT_CLICK', payload: '0' })}>
          0
        </button>
        <button
          className="span-2"
          onClick={() => dispatch({ type: 'EVALUATE' })}
        >
          =
        </button>
      </div>
      <footer className="footer">
        Adam Sienkiewicz @2022
        <a href="https://github.com/admsienkiewicz">
          <AiFillGithub className="footer-icon" />
        </a>
        <a href="https://www.linkedin.com/in/adam-sienkiewicz-0429a2214/">
          <AiFillLinkedin className="footer-icon" />
        </a>
      </footer>
    </>
  )
}

export default App
