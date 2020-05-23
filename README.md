# React Simple Toast message

> Simple Toast message React package

[![NPM](https://img.shields.io/npm/v/react-simple-toast.svg)](https://www.npmjs.com/package/react-simple-toast) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-react-simple-toast
```

## Usage

```jsx
import React from 'react'

import { useToastShow, ToastProvider } from 'react-simple-toast'
import 'react-simple-toast/dist/index.css'

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

## License

MIT © [premsahni0501](https://github.com/premsahni0501)
