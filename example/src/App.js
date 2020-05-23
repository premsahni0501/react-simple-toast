import React from 'react'

import { useToastShow, ToastProvider } from 'react-simple-toaster'
import 'react-simple-toaster/dist/index.css'
import ClassComponent from './ClassComponent';

const App = () => {
  const showToast = useToastShow();
  return (
    <div className="container">
      <h1>Functional Component</h1>
      <button
        onClick={() => showToast('Toast from functional component', 1000000)}
        className="btn">
        Show Toast
      </button>
      <button
        onClick={() => showToast('Toast from functional component', 1000000, 'dark')}
        className="btn dark">
        Dark Theme
      </button>
      <button
        onClick={() => showToast('Toast from functional component', 1000000, 'success')}
        className="btn success">
        Success Theme
      </button>
      <button
        onClick={() => showToast('Toast from functional component', 1000000, 'danger')}
        className="btn danger">
        Danger Theme
      </button>
      <button
        onClick={() => showToast('Toast from functional component', 1000000, 'warning')}
        className="btn warning">
        Warning Theme
      </button>
      <button
        onClick={() => showToast('Toast from functional component', 1000000, 'info')}
        className="btn info">
        Info Theme
      </button>
    </div >
  )
}
const ToastWrapper = () => (
  <ToastProvider>
    <div className="App">
      <App />
      <ClassComponent />
    </div>
  </ToastProvider>
)
export default ToastWrapper
