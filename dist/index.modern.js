import React, { createContext, useReducer, useEffect, useContext } from 'react';

var style = {"toast-wrapper":"_Toaster__toast-wrapper__2tzRf","toast":"_Toaster__toast__2oYpK","light":"_Toaster__light__D02k4","toast-btn":"_Toaster__toast-btn__MiV0i","dark":"_Toaster__dark__2nbNP","success":"_Toaster__success__2cyYG","info":"_Toaster__info__3NO6s","danger":"_Toaster__danger__2ke0x","warning":"_Toaster__warning__2yadJ"};

const ToastStateContext = createContext();
const ToastDispatchContext = createContext();

function ToastReducer(state, action) {
  switch (action.type) {
    case 'show':
      {
        console.log(action);
        return {
          messages: [...state.messages, action.toast]
        };
      }

    case 'remove':
      {
        const {
          messages
        } = state;
        const found = messages.filter(m => m.timestamp === action.timestamp);
        const filtered = messages.filter(m => m.timestamp !== action.timestamp);

        if (found.length) {
          const toast = found[0];
          clearTimeout(toast.timer());
        }

        return {
          messages: [...filtered]
        };
      }

    default:
      {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
  }
}

function ToastProvider({
  children
}) {
  const [state, dispatch] = useReducer(ToastReducer, {
    messages: []
  });
  return /*#__PURE__*/React.createElement(ToastStateContext.Provider, {
    value: state
  }, /*#__PURE__*/React.createElement(ToastDispatchContext.Provider, {
    value: dispatch
  }, /*#__PURE__*/React.createElement(ToastConsumer, null, children)));
}

function useToastState() {
  const context = useContext(ToastStateContext);

  if (context === undefined) {
    throw new Error('useToastState must be used within a ToastProvider');
  }

  return context;
}

function useToastDispatch() {
  const context = useContext(ToastDispatchContext);

  if (context === undefined) {
    throw new Error('useToastDispatch must be used within a ToastProvider');
  }

  return context;
}

function useToastShow() {
  const dispatch = useToastDispatch();
  return (msg, timeout, theme, className, customStyle) => {
    if (!msg) return;
    const timestamp = Date.now();

    const removeTimeout = () => setTimeout(() => {
      dispatch({
        type: 'remove',
        timestamp
      });
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
      }
    };
    dispatch(toastObj);
    removeTimeout();
  };
}

function ToastConsumer({
  children
}) {
  const state = useToastState();
  console.log(state);
  useEffect(() => {
    const firstChildEl = document.querySelector('.toast-wrapper');

    if (firstChildEl && firstChildEl.lastChild) {
      firstChildEl.lastChild.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [state]);
  return /*#__PURE__*/React.createElement(ToastStateContext.Consumer, null, context => {
    if (context === undefined) {
      throw new Error('ToastConsumer must be used within a ToastProvider');
    }

    const {
      messages
    } = context;
    return /*#__PURE__*/React.createElement(ToastDispatchContext.Consumer, null, dispatch => /*#__PURE__*/React.createElement("div", null, children, messages.length ? /*#__PURE__*/React.createElement("div", {
      className: `toast-wrapper ${style['toast-wrapper']}`
    }, messages.map(m => /*#__PURE__*/React.createElement("div", {
      className: `toast ${style['toast']}${' ' + style[m.theme] || ''}${' ' + m.className || ''}`,
      role: "alert",
      key: '_' + Math.random() * m.timestamp,
      style: m.customStyle && m.customStyle.toaster ? m.customStyle.toaster : {}
    }, /*#__PURE__*/React.createElement("span", null, m.msg), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
      className: style['toast-btn'],
      onClick: () => dispatch({
        type: 'remove',
        timestamp: m.timestamp
      }),
      style: m.customStyle && m.customStyle.button ? m.customStyle.button : {}
    }, "\xD7")))) : null));
  });
}

function useToast() {
  return [useToastState(), useToastDispatch()];
}

function withShowToast(WrappedComponent) {
  return function (props) {
    const showToast = useToastShow();
    return /*#__PURE__*/React.createElement(WrappedComponent, Object.assign({}, props, {
      showToast: showToast
    }));
  };
}

export { ToastConsumer, ToastProvider, useToast, useToastShow, withShowToast };
//# sourceMappingURL=index.modern.js.map
