# React Simple Toast message

> Simple Toast message React package

[![NPM](https://img.shields.io/npm/v/react-simple-toaster.svg)](https://www.npmjs.com/package/react-simple-toaster) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-simple-toaster
```

## Usage

### Functional Component

```jsx
import React from 'react'

import { useToastShow, ToastProvider } from 'react-simple-toaster'
import 'react-simple-toaster/dist/index.css'

const App = () => {
  const showToast = useToastShow()
  return (
    <button onClick={() => showToast('This is a cool toast message', 10000)}>
      Show Toast
    </button>
  )
}
const ToastWrapper = () => (
  <ToastProvider>
    <App />
  </ToastProvider>
)
export default ToastWrapper
```

### Class based component

```jsx
import React from 'react'
import { withShowToast } from 'react-simple-toaster'

class ClassComponent extends React.Component {
  render() {
    const { showToast } = this.props
    return (
      <div className='container'>
        <h1>Class Component</h1>
        <br />
        <button
          className='btn'
          onClick={() => showToast('Toast from Class based component')}
        >
          ClassComponent Button
        </button>
      </div>
    )
  }
}
export default withShowToast(ClassComponent)
```

#### Params

```js
showToast(msg, timeout, theme, className, customStyle)
```

| Param       | Value                                                |
| ----------- | ---------------------------------------------------- |
| msg         | string                                               |
| timeout     | miliseconds                                          |
| theme       | light(default), dark, danger, success, warning, info |
| className   | custom class name                                    |
| customStyle | `{ toaster: {}, button: {}}`                         |

## Demo

Check demo [here](https://premsahni0501.github.io/react-simple-toast/)

## License

MIT © [premsahni0501](https://github.com/premsahni0501)
