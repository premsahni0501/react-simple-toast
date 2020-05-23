import React from 'react';
import { withShowToast } from 'react-simple-toaster';

class ClassComponent extends React.Component {
  render() {
    const { showToast } = this.props;
    return (
      <div className="container">
        <h1>Class Component</h1>
        <br />
        <button className="btn" onClick={() => showToast('Toast from Class based component')}>ClassComponent Button</button>
      </div>
    )
  }
}
export default withShowToast(ClassComponent)