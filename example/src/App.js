import React from 'react'

import { useToastShow, ToastProvider } from 'react-simple-toaster'
import 'react-simple-toaster/dist/index.css'

const App = () => {
  const showToast = useToastShow();
  return <button onClick={() => showToast('This is a cool toast message', 10000)}>Show Toast</button>
}
const ToastWrapper = () => (
  <ToastProvider>
    <App />
  </ToastProvider>
)
export default ToastWrapper
