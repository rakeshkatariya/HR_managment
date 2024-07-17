import React, { Component } from 'react'

export default class FallbackComponent extends Component {
  render() {
    return (
      <div>
          <div className='p-d-flex p-ai-center p-jc-center p-h-full'>
            <div className='p-text-center'>
              <div className="triple-spinner"></div>
              <label className='p-mt-3 text-20'>Please wait ...</label>
            </div>
          </div>
      </div>
    )
  }
}
