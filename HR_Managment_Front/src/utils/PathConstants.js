//=============PATH=================//
import { apiBase } from "./config";
const SERVER_PATH = apiBase;
export default class APIConstant {
  static path = {
    // Auth API
    login: `${SERVER_PATH}/authentication/login`,
    RegisterUser: `${SERVER_PATH}/authentication/RegisterUser`,
    ChangePassword: `${SERVER_PATH}/authentication/ChangePassword`,
    ForgotPassword: `${SERVER_PATH}/authentication/forgotPassword`,
    SessionInActive: `${SERVER_PATH}/authentication/SessionInActive`,
    AllSessionInActive: `${SERVER_PATH}/authentication/AllSessionInActive`,

    // Company Employee API
    AddUpdateCompanyEmployee: `${SERVER_PATH}/companyEmployee/AddUpdateCompanyEmployee`,
    getCompanyEmployeeDataList: `${SERVER_PATH}/companyEmployee/getCompanyEmployeeDataList`,
    getEmployeeDataById: `${SERVER_PATH}/companyEmployee/getEmployeeDataById`,
    DeleteCompanyEmployee: `${SERVER_PATH}/companyEmployee/DeleteCompanyEmployee`,

    //Attendance API
    AddUpdateUserAttendance: `${SERVER_PATH}/Attendance/AddUpdateUserAttendance`,
    getAttendanceDataList: `${SERVER_PATH}/Attendance/getAttendanceDataList`,

    // User Profile
    getUserProfileByID: `${SERVER_PATH}/userProfile/getUserProfileByID`,
    updateUserProfile: `${SERVER_PATH}/userProfile/updateUserProfile`,
    GetUserList: `${SERVER_PATH}/userProfile/GetUserList`,
    EmployeeKYC: `${SERVER_PATH}/userProfile/EmployeeKYC`,

    // HoliDay API
    AddUpdateHoliday: `${SERVER_PATH}/holiday/AddUpdateHoliday`,
    getHolidayDataList: `${SERVER_PATH}/holiday/getHolidayDataList`,
    DeleteHoliday: `${SERVER_PATH}/holiday/DeleteHoliday`,

    // Leave API
    AddUpdateLeave: `${SERVER_PATH}/leave/AddUpdateLeave`,
    getLeaveDataList: `${SERVER_PATH}/leave/getLeaveDataList`,
    DeleteLeave: `${SERVER_PATH}/leave/DeleteLeave`,
    getLeaveRequestList: `${SERVER_PATH}/leave/getLeaveRequestList`,
    LeaveApprovalByAdmin: `${SERVER_PATH}/leave/LeaveApprovalByAdmin`,

    // Expenses API
    AddUpdateExpenses: `${SERVER_PATH}/expenses/AddUpdateExpenses`,
    getExpensesDataList: `${SERVER_PATH}/expenses/getExpensesDataList`,
    DeleteExpenses: `${SERVER_PATH}/expenses/DeleteExpenses`,

    // Hiring Employee API
    AddHiringEmployee: `${SERVER_PATH}/hiringDetails/AddHiringEmployee`,
    GetHiringEmployeeDataList: `${SERVER_PATH}/hiringDetails/GetHiringEmployeeDataList`,
    DeleteHiringEmployee: `${SERVER_PATH}/hiringDetails/DeleteHiringEmployee`,

    // Event API
    AddUpdateEvent: `${SERVER_PATH}/event/AddUpdateEvent`,
    getEventDataList: `${SERVER_PATH}/event/getEventDataList`,
    DeleteEvent: `${SERVER_PATH}/event/DeleteEvent`,

    // Over Time API
    AddUpdateOverTime: `${SERVER_PATH}/overTime/AddUpdateOverTime`,
    getOverTimeDataList: `${SERVER_PATH}/overTime/getOverTimeDataList`,
    DeleteOverTime: `${SERVER_PATH}/overTime/DeleteOverTime`,

    // Time sheet API 
    getTimeSheetDataList: `${SERVER_PATH}/timeSheet/getTimeSheetDataList`,
  };
}
