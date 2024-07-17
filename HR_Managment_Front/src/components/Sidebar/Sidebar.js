/* eslint-disable no-useless-concat */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import api from '../../utils/apiClient';
import CommonConfig from '../../utils/constant';
import APIConstant from '../../utils/PathConstants';
import Toast from '../Shared/Toast/Toast';
// import crevisLogo from '../../assets/images/Crevis_Logo.svg'
// import crevisLogo from '../../assets/svgs/logoWhite.svg';
const initialState = {
  sidebarMenus: [],
  Name: '',
  Email: ''
}
export default class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount = async () => {
    this.setState({
      Email: CommonConfig.loginData().Username, Name: CommonConfig.loginData().Name
    })
    // await this.getUserMenu();
  }

  // getUserMenu = async () => {
  //   try {
  //     if (!CommonConfig.getUserAccess()) {
  //       let data = {
  //         UserID: CommonConfig.loginData().SecurityUserID
  //       }
  //       await api.post(APIConstant.path.getUserMenu, data)
  //         .then(async (res) => {
  //           let response = await res;
  //           if (response.success) {
  //             this.setState({ sidebarMenus: response.data })
  //             localStorage.setItem('userModuleAccess', JSON.stringify(response.data))
  //           } else {
  //             this.setState({ sidebarMenus: response.data })
  //           }
  //         })
  //         .catch((err) => {
  //           // console.log("error", err);
  //         })
  //     }
  //     else {
  //       let userModuleAccess = CommonConfig.getUserAccess() && CommonConfig.getUserAccess().length ? CommonConfig.getUserAccess() : [];
  //       if (userModuleAccess.length) {
  //         userModuleAccess = userModuleAccess.map(x => {
  //           let IsCollapseActive = x.SubMenus.length && x.SubMenus.filter(child => child.Path.includes(this.props.location.pathname)).length ? true : false;
  //           return { ...x, IsCollapseActive: IsCollapseActive }
  //         })
  //       }
  //       this.setState({ sidebarMenus: userModuleAccess })
  //     }
  //   } catch (err) {
  //     // console.log("error", err);
  //   }
  // }

  manageSidebarWidth = () => {
    document.getElementById("sidebar-area").classList.toggle("sidebar-mini");
  }

  handleLogout = () => {
    Toast.success({ message: 'Logged out success' });
    this.props.history.push('/login');
    localStorage.clear();
  }

  render() {
    const { Name, Email, sidebarMenus } = this.state;
    console.log("Login history",);
    return (
      <div className='sidebar-container' id='sidebar-area'>
        <div onClick={() => this.manageSidebarWidth()} className='sidebar-close cursor-pointer'>
          <i className='icon-back-arrow'></i>
        </div>
        {/* <div className='sidebar-header'>
          <div className='sidebar-logo'>
            <img src={crevisLogo} alt="" />
          </div>
        </div> */}
        <div className='sidebar-body'>

          <ul className='parent-sidebar-options'>
            <li className={this.props.location && (this.props.location.pathname === "/dashboard") ? `parent-sidebar-option solo-active p-flex-wrap` : `parent-sidebar-option p-flex-wrap`} onClick={() => {
              this.props.history.push("/dashboard")
            }}>
              <div className='p-d-flex p-ai-center p-jc-between p-w-100 parent-sidebar-content'>
                <div className='p-d-flex p-ai-center'>
                <i className={`${'Dashboard' + ` sidebar-icon`}`}></i>
                  {/* <i className='icon-dashboard'></i> */}
                  <span>Dashboard</span>
                </div>
              </div>
            </li>
            <li className={this.props.location && (this.props.location.pathname === "/employee") ? `parent-sidebar-option solo-active p-flex-wrap` : `parent-sidebar-option p-flex-wrap`} onClick={() => {
              this.props.history.push("/employee")
            }}>
              <div className='p-d-flex p-ai-center p-jc-between p-w-100 parent-sidebar-content'>
                <div className='p-d-flex p-ai-center'>
                <i className={`${'Dashboard' + ` sidebar-icon`}`}></i>
                  {/* <i className='icon-user'></i> */}
                  <span>Company Employee</span>
                </div>
              </div>
            </li>
            <li className={this.props.location && (this.props.location.pathname === "/employee-kyc") ? `parent-sidebar-option solo-active p-flex-wrap` : `parent-sidebar-option p-flex-wrap`} onClick={() => {
              this.props.history.push("/employee-kyc")
            }}>
              <div className='p-d-flex p-ai-center p-jc-between p-w-100 parent-sidebar-content'>
                <div className='p-d-flex p-ai-center'>
                  <i className={`${'Dashboard' + ` sidebar-icon`}`}></i>
                  <span>Employee KYC</span>
                </div>
              </div>
            </li>
            <li className={this.props.location && (this.props.location.pathname === "/time-sheet") ? `parent-sidebar-option solo-active p-flex-wrap` : `parent-sidebar-option p-flex-wrap`} onClick={() => {
              this.props.history.push("/time-sheet")
            }}>
              <div className='p-d-flex p-ai-center p-jc-between p-w-100 parent-sidebar-content'>
                <div className='p-d-flex p-ai-center'>
                  <i className={`${'Dashboard' + ` sidebar-icon`}`}></i>
                  <span>Time Sheet</span>
                </div>
              </div>
            </li>
            <li className={this.props.location && (this.props.location.pathname === "/hiring-details") ? `parent-sidebar-option solo-active p-flex-wrap` : `parent-sidebar-option p-flex-wrap`} onClick={() => {
              this.props.history.push("/hiring-details")
            }}>
              <div className='p-d-flex p-ai-center p-jc-between p-w-100 parent-sidebar-content'>
                <div className='p-d-flex p-ai-center'>
                  <i className={`${'Dashboard' + ` sidebar-icon`}`}></i>
                  <span>Hiring Details</span>
                </div>
              </div>
            </li>
            <li className={this.props.location && (this.props.location.pathname === "/expenses") ? `parent-sidebar-option solo-active p-flex-wrap` : `parent-sidebar-option p-flex-wrap`} onClick={() => {
              this.props.history.push("/expenses")
            }}>
              <div className='p-d-flex p-ai-center p-jc-between p-w-100 parent-sidebar-content'>
                <div className='p-d-flex p-ai-center'>
                  <i className={`${'Dashboard' + ` sidebar-icon`}`}></i>
                  <span>Expenses</span>
                </div>
              </div>
            </li>
            <li className={this.props.location && (this.props.location.pathname === "/leave") ? `parent-sidebar-option solo-active p-flex-wrap` : `parent-sidebar-option p-flex-wrap`} onClick={() => {
              this.props.history.push("/leave")
            }}>
              <div className='p-d-flex p-ai-center p-jc-between p-w-100 parent-sidebar-content'>
                <div className='p-d-flex p-ai-center'>
                  <i className={`${'Dashboard' + ` sidebar-icon`}`}></i>
                  <span>Leave</span>
                </div>
              </div>
            </li>
            <li className={this.props.location && (this.props.location.pathname === "/announcement") ? `parent-sidebar-option solo-active p-flex-wrap` : `parent-sidebar-option p-flex-wrap`} onClick={() => {
              this.props.history.push("/announcement")
            }}>
              <div className='p-d-flex p-ai-center p-jc-between p-w-100 parent-sidebar-content'>
                <div className='p-d-flex p-ai-center'>
                  <i className={`${'Dashboard' + ` sidebar-icon`}`}></i>
                  <span>Announcement</span>
                </div>
              </div>
            </li>
            <li className={this.props.location && (this.props.location.pathname === "/attendance") ? `parent-sidebar-option solo-active p-flex-wrap` : `parent-sidebar-option p-flex-wrap`} onClick={() => {
              this.props.history.push("/attendance")
            }}>
              <div className='p-d-flex p-ai-center p-jc-between p-w-100 parent-sidebar-content'>
                <div className='p-d-flex p-ai-center'>
                  <i className={`${'Dashboard' + ` sidebar-icon`}`}></i>
                  <span>Attendance</span>
                </div>
              </div>
            </li>
            <li className={this.props.location && (this.props.location.pathname === "/over-time") ? `parent-sidebar-option solo-active p-flex-wrap` : `parent-sidebar-option p-flex-wrap`} onClick={() => {
              this.props.history.push("/over-time")
            }}>
              <div className='p-d-flex p-ai-center p-jc-between p-w-100 parent-sidebar-content'>
                <div className='p-d-flex p-ai-center'>
                  <i className={`${'Dashboard' + ` sidebar-icon`}`}></i>
                  <span>Over Time</span>
                </div>
              </div>
            </li>
            <li className={this.props.location && (this.props.location.pathname === "/holiday") ? `parent-sidebar-option solo-active p-flex-wrap` : `parent-sidebar-option p-flex-wrap`} onClick={() => {
              this.props.history.push("/holiday")
            }}>
              <div className='p-d-flex p-ai-center p-jc-between p-w-100 parent-sidebar-content'>
                <div className='p-d-flex p-ai-center'>
                  <i className={`${'Dashboard' + ` sidebar-icon`}`}></i>
                  <span>Holiday</span>
                </div>
              </div>
            </li>
            <li className={this.props.location && (this.props.location.pathname === "/pay-slip") ? `parent-sidebar-option solo-active p-flex-wrap` : `parent-sidebar-option p-flex-wrap`} onClick={() => {
              this.props.history.push("/pay-slip")
            }}>
              <div className='p-d-flex p-ai-center p-jc-between p-w-100 parent-sidebar-content'>
                <div className='p-d-flex p-ai-center'>
                  <i className={`${'Dashboard' + ` sidebar-icon`}`}></i>
                  <span>Pay Slip</span>
                </div>
              </div>
            </li>
            
            
          </ul>

          {/* <ul className='parent-sidebar-options'>
            {sidebarMenus.length ?
              sidebarMenus.map((x, idx) => {
                return (
                  <li className={this.props.location && (this.props.location.pathname == x.Path || x.SubMenus.filter(child => child.Path.includes(this.props.location.pathname)).length) ? (x.Path ? `parent-sidebar-option solo-active p-flex-wrap ${x.IsCollapseActive ? 'isParentActive' : ''}` : `parent-sidebar-option active p-flex-wrap ${x.IsCollapseActive ? 'isParentActive' : ''}`) : (x.Path ? `parent-sidebar-option  p-flex-wrap ${x.IsCollapseActive ? 'isParentActive' : ''}` : `parent-sidebar-option p-flex-wrap ${x.IsCollapseActive ? 'isParentActive' : ''}`)} key={idx} onClick={() => {
                    if (x.Path) {
                      this.props.history.push(x.Path);
                    }
                    else {
                      let tempSidebarMenus = sidebarMenus;
                      tempSidebarMenus[idx]['IsCollapseActive'] = !tempSidebarMenus[idx]['IsCollapseActive'];
                      this.setState({ sidebarMenus: tempSidebarMenus })
                    }
                  }}>
                    <div className='p-d-flex p-ai-center p-jc-between p-w-100 parent-sidebar-content'>
                      <div className='p-d-flex p-ai-center'>
                        <i className={`${x.Icon + ` sidebar-icon`}`}></i>
                        <span>{x.MenuName}</span>
                      </div>
                      {x.Path ?
                        null
                        :
                        <i className={x.IsCollapseActive ? 'icon-chevron-down text-14 sidebar-tail-icon active' : 'icon-chevron-down text-14 sidebar-tail-icon'}></i>
                      }
                    </div>
                    {x.IsCollapseActive ?
                      <ul className='child-sidebar-options'>
                        {x.SubMenus.length ?
                          x.SubMenus.map((child, childIdx) => {
                            return (
                              <li className={this.props.location && this.props.location.pathname == child.Path ? 'child-sidebar-option active' : 'child-sidebar-option'} key={childIdx} onClick={() => {
                                if (child.Path) {
                                  this.props.history.push(child.Path);
                                }
                              }}>
                                <div className='p-d-flex p-ai-center p-w-100'>
                                  <div className='p-d-flex  p-ai-center p-w-100' >
                                    <i className={`${child.Icon + ` sidebar-icon`}`}></i>
                                    <span>{child.MenuName}</span>
                                  </div>
                                </div>
                              </li>
                            )
                          })
                          : null
                        }
                      </ul>
                      : null}
                  </li>
                )
              })
              :
              null /** Add svg for no menu accessible 
  } </div>
          </ul> */}
        </div>
        <div className='sidebar-footer'>
          <span className='sidebar-footer-text'>Need help? Please contact us.</span>
        </div>
      </div>
    )
  }
}
