import React, { createContext, useReducer, useEffect, useContext } from 'react';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var style = {"toast-wrapper":"_2tzRf","toast":"_2oYpK","light":"_D02k4","toast-btn":"_MiV0i","dark":"_2nbNP","success":"_2cyYG","info":"_3NO6s","danger":"_2ke0x","warning":"_2yadJ"};

var ToastStateContext = createContext();
var ToastDispatchContext = createContext();

function ToastReducer(state, action) {
  switch (action.type) {
    case 'show':
      {
        console.log(action);
        return {
          messages: [].concat(state.messages, [action.toast])
        };
      }

    case 'remove':
      {
        var messages = state.messages;
        var found = messages.filter(function (m) {
          return m.timestamp === action.timestamp;
        });
        var filtered = messages.filter(function (m) {
          return m.timestamp !== action.timestamp;
        });

        if (found.length) {
          var toast = found[0];
          clearTimeout(toast.timer());
        }

        return {
          messages: [].concat(filtered)
        };
      }

    default:
      {
        throw new Error("Unhandled action type: " + action.type);
      }
  }
}

function ToastProvider(_ref) {
  var children = _ref.children;

  var _useReducer = useReducer(ToastReducer, {
    messages: []
  }),
      state = _useReducer[0],
      dispatch = _useReducer[1];

  return /*#__PURE__*/React.createElement(ToastStateContext.Provider, {
    value: state
  }, /*#__PURE__*/React.createElement(ToastDispatchContext.Provider, {
    value: dispatch
  }, /*#__PURE__*/React.createElement(ToastConsumer, null, children)));
}

function useToastState() {
  var context = useContext(ToastStateContext);

  if (context === undefined) {
    throw new Error('useToastState must be used within a ToastProvider');
  }

  return context;
}

function useToastDispatch() {
  var context = useContext(ToastDispatchContext);

  if (context === undefined) {
    throw new Error('useToastDispatch must be used within a ToastProvider');
  }

  return context;
}

function useToastShow() {
  var dispatch = useToastDispatch();
  return function (msg, timeout, theme, className, customStyle) {
    if (!msg) return;
    var timestamp = Date.now();

    var removeTimeout = function removeTimeout() {
      return setTimeout(function () {
        dispatch({
          type: 'remove',
          timestamp: timestamp
        });
      }, timeout || 5000);
    };

    var toastObj = {
      type: 'show',
      toast: {
        msg: msg,
        timer: function timer() {
          return removeTimeout();
        },
        timestamp: timestamp,
        theme: theme,
        customStyle: customStyle,
        className: className
      }
    };
    dispatch(toastObj);
    removeTimeout();
  };
}

function ToastConsumer(_ref2) {
  var children = _ref2.children;
  var state = useToastState();
  console.log(state);
  useEffect(function () {
    var firstChildEl = document.querySelector('.toast-wrapper');

    if (firstChildEl && firstChildEl.lastChild) {
      firstChildEl.lastChild.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [state]);
  return /*#__PURE__*/React.createElement(ToastStateContext.Consumer, null, function (context) {
    if (context === undefined) {
      throw new Error('ToastConsumer must be used within a ToastProvider');
    }

    var messages = context.messages;
    return /*#__PURE__*/React.createElement(ToastDispatchContext.Consumer, null, function (dispatch) {
      return /*#__PURE__*/React.createElement("div", null, children, messages.length ? /*#__PURE__*/React.createElement("div", {
        className: "toast-wrapper " + style['toast-wrapper']
      }, messages.map(function (m) {
        return /*#__PURE__*/React.createElement("div", {
          className: "toast " + style['toast'] + (' ' + style[m.theme] || '') + (' ' + m.className || ''),
          role: "alert",
          key: '_' + Math.random() * m.timestamp,
          style: m.customStyle && m.customStyle.toaster ? m.customStyle.toaster : {}
        }, /*#__PURE__*/React.createElement("span", null, m.msg), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
          className: style['toast-btn'],
          onClick: function onClick() {
            return dispatch({
              type: 'remove',
              timestamp: m.timestamp
            });
          },
          style: m.customStyle && m.customStyle.button ? m.customStyle.button : {}
        }, "\xD7"));
      })) : null);
    });
  });
}

function useToast() {
  return [useToastState(), useToastDispatch()];
}

function withShowToast(WrappedComponent) {
  return function (props) {
    var showToast = useToastShow();
    return /*#__PURE__*/React.createElement(WrappedComponent, _extends({}, props, {
      showToast: showToast
    }));
  };
}

export { ToastConsumer, ToastProvider, useToast, useToastShow, withShowToast };
//# sourceMappingURL=index.modern.js.map
