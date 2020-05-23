function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

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

var style = {"toast-wrapper":"_2tzRf","toast":"_2oYpK","toast-btn":"_MiV0i"};

var ToastStateContext = React.createContext();
var ToastDispatchContext = React.createContext();

function ToastReducer(state, action) {
  switch (action.type) {
    case 'show':
      {
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

  var _useReducer = React.useReducer(ToastReducer, {
    messages: []
  }),
      state = _useReducer[0],
      dispatch = _useReducer[1];

  return /*#__PURE__*/React__default.createElement(ToastStateContext.Provider, {
    value: state
  }, /*#__PURE__*/React__default.createElement(ToastDispatchContext.Provider, {
    value: dispatch
  }, /*#__PURE__*/React__default.createElement(ToastConsumer, null, children)));
}

function useToastState() {
  var context = React.useContext(ToastStateContext);

  if (context === undefined) {
    throw new Error('useToastState must be used within a ToastProvider');
  }

  return context;
}

function useToastDispatch() {
  var context = React.useContext(ToastDispatchContext);

  if (context === undefined) {
    throw new Error('useToastDispatch must be used within a ToastProvider');
  }

  return context;
}

function useToastShow() {
  var dispatch = useToastDispatch();
  return function (msg, timeout) {
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
        timestamp: timestamp
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
  React.useEffect(function () {
    var lastChild = document.querySelector('.toast-wrapper .toast:last-child');

    if (lastChild) {
      lastChild.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [state]);
  return /*#__PURE__*/React__default.createElement(ToastStateContext.Consumer, null, function (context) {
    if (context === undefined) {
      throw new Error('ToastConsumer must be used within a ToastProvider');
    }

    var messages = context.messages;
    return /*#__PURE__*/React__default.createElement(ToastDispatchContext.Consumer, null, function (dispatch) {
      return /*#__PURE__*/React__default.createElement("div", null, children, messages.length ? /*#__PURE__*/React__default.createElement("div", {
        className: 'toast-wrapper ' + style['toast-wrapper']
      }, messages.map(function (m) {
        return /*#__PURE__*/React__default.createElement("div", {
          className: 'toast ' + style['toast'],
          role: "alert",
          key: '_' + Math.random() * m.timestamp
        }, /*#__PURE__*/React__default.createElement("span", null, m.msg), /*#__PURE__*/React__default.createElement("br", null), /*#__PURE__*/React__default.createElement("button", {
          className: style['toast-btn'],
          onClick: function onClick() {
            return dispatch({
              type: 'remove',
              timestamp: m.timestamp
            });
          }
        }, "\xD7"));
      }).reverse()) : null);
    });
  });
}

function useToast() {
  return [useToastState(), useToastDispatch()];
}

function withShowToast(WrappedComponent) {
  return function (props) {
    var showToast = useToastShow();
    return /*#__PURE__*/React__default.createElement(WrappedComponent, _extends({}, props, {
      showToast: showToast
    }));
  };
}

exports.ToastConsumer = ToastConsumer;
exports.ToastProvider = ToastProvider;
exports.useToast = useToast;
exports.useToastShow = useToastShow;
exports.withShowToast = withShowToast;
//# sourceMappingURL=index.js.map
