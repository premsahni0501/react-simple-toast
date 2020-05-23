import React, { createContext, useReducer, useContext, useEffect } from 'react';
import style from './Toaster.scss'

const ToastStateContext = createContext();
const ToastDispatchContext = createContext();

function ToastReducer(state, action) {
  switch (action.type) {
    case 'show': {
      console.log(action);
      return {
        messages: [...state.messages, action.toast],
      }
    }
    case 'remove': {
      const { messages } = state;
      const found = messages.filter(m => m.timestamp === action.timestamp);
      const filtered = messages.filter(m => m.timestamp !== action.timestamp);
      if (found.length) {
        const toast = found[0];
        clearTimeout(toast.timer());
      }
      return {
        messages: [...filtered]
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}
function ToastProvider({ children }) {
  const [state, dispatch] = useReducer(ToastReducer, { messages: [] });
  return (
    <ToastStateContext.Provider value={state}>
      <ToastDispatchContext.Provider value={dispatch}>
        <ToastConsumer>{children}</ToastConsumer>
      </ToastDispatchContext.Provider>
    </ToastStateContext.Provider>
  )
}

function useToastState() {
  const context = useContext(ToastStateContext);
  if (context === undefined) {
    throw new Error('useToastState must be used within a ToastProvider')
  }
  return context
}
function useToastDispatch() {
  const context = useContext(ToastDispatchContext);
  if (context === undefined) {
    throw new Error('useToastDispatch must be used within a ToastProvider')
  }
  return context
}
function useToastShow() {
  const dispatch = useToastDispatch();

  return (msg, timeout, theme, className, customStyle) => {
    if (!msg) return;
    const timestamp = Date.now();
    const removeTimeout = () => setTimeout(() => {
      dispatch({ type: 'remove', timestamp });
    }, timeout || 5000);
    const toastObj = {
      type: 'show',
      toast: {
        msg,
        timer() {
          return removeTimeout();
        },
        timestamp,
        theme,
        customStyle,
        className
      },
    }
    dispatch(toastObj);
    removeTimeout()
  }
}
function ToastConsumer({ children }) {
  const state = useToastState()
  console.log(state)
  useEffect(() => {
    const firstChildEl = document.querySelector('.toast-wrapper');
    if (firstChildEl && firstChildEl.lastChild) {
      firstChildEl.lastChild.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }, [state])
  return (
    <ToastStateContext.Consumer>
      {
        context => {
          if (context === undefined) {
            throw new Error('ToastConsumer must be used within a ToastProvider')
          }
          const { messages } = context;
          return (
            <ToastDispatchContext.Consumer>
              {dispatch => (
                <div>
                  {children}
                  {messages.length ? (
                    <div
                      className={`toast-wrapper ${style['toast-wrapper']}`}>
                      {
                        messages.map(m => (
                          <div
                            className={`toast ${style['toast']}${' ' + style[m.theme] || ''}${' ' + m.className || ''}`}
                            role="alert"
                            key={'_' + Math.random() * m.timestamp}
                            style={m.customStyle && m.customStyle.toaster ? m.customStyle.toaster : {}}>
                            <span>{m.msg}</span>
                            <br></br>
                            <button
                              className={style['toast-btn']}
                              onClick={() => dispatch({ type: 'remove', timestamp: m.timestamp })}
                              style={m.customStyle && m.customStyle.button ? m.customStyle.button : {}}>
                              &times;
                              </button>
                          </div>
                        ))
                      }
                    </div>
                  ) : null}
                </div>
              )}
            </ToastDispatchContext.Consumer>
          )
        }
      }
    </ToastStateContext.Consumer>
  )
}
function useToast() {
  return [useToastState(), useToastDispatch()]
}

function withShowToast(WrappedComponent) {
  return function (props) {
    const showToast = useToastShow();
    return <WrappedComponent {...props} showToast={showToast} />
  }
}
export { useToast, ToastProvider, ToastConsumer, useToastShow, withShowToast };