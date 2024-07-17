import React, { Component } from 'react'
import erroSVG from '../../../assets/svgs/404.svg'

export default class Error404 extends Component {
  render() {
    return (
      <div>
        <div className='error-page-container'>
          {/* <div className='error-page-header'>
            <div>
              <div className='Logo-text p-mt-0 p-text-center'>CREVIS</div>
            </div>
            <div>
              <div onClick={() => this.props.history.push('/login')} className='p-d-flex p-ai-center'>
                <span className='p-mr-3'>Login or signup now</span>
                <i className='icon-dashboard text-20'></i>
              </div>
            </div>
          </div> */}
          <div className='error-page-body'>
            <div className='p-grid p-h-100'>
              {/* <div className='p-col-1'></div> */}
              <div className='p-col-12 p-md-6 p-as-center'>
                <img src={erroSVG} alt="errorImage" style={{width: '100%'}}/>
              </div>
              <div className='p-col-12 p-md-6 p-as-center p-pl-5'>
                <div className='error-text'>
                  <h2>Oops.. Page is not found !!</h2>
                  <p>
                    We can't seem to find the page that you're looking for.<br/>
                    Please try again later after sometime!!
                  </p>
                  <b>Error code : 404</b>
                </div>
                <div className='p-mt-4'>
                  <button className='btn-secondary p-d-flex p-ai-center' onClick={() => this.props.history.goBack(1)}>
                    <i className='icon-back-arrow p-mr-2'></i>Go back</button>
                </div>
              </div>
              {/* <div className='p-col-1'></div> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
