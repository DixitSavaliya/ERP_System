import { CALL_API } from '../middleware/api';

export const createEmployee = (data) => {
    return {
      [CALL_API]: {
        endpoint: 'Employee/registerEmployee',
        init: {
          method: 'POST',
          body: JSON.stringify(data),
        },
        types: ["CREATEAPP_REQUEST", "CREATEAPP_SUCCESS", "CREATEAPP_FAILURE"],
      }
    };
  };

  export const createDocument = (data) => {
    return {
      [CALL_API]: {
        endpoint: 'Document/createDocument',
        init: {
          method: 'POST',
          body: JSON.stringify(data)
        },
        types: ["APPCOUNT_REQUEST", "APPCOUNT_SUCCESS", "APPCOUNT_FAILURE"],
      }
    };
  };


  export const applicationPGData = (data) => {
    return {
      [CALL_API]: {
        endpoint: 'Application/applicationByPg',
        init: {
          method: 'POST',
          body: JSON.stringify(data)
        },
        types: ["APPPGDATA_REQUEST", "APPPGDATA_SUCCESS", "APPPGDATA_FAILURE"],
      }
    };
  };

  export const getEmployeeDataById = (data) => {
    return {
      [CALL_API]: {
        endpoint: 'Employee/getEmployee',
        init: {
          method: 'POST',
          body: JSON.stringify(data)
        },
        types: ["APPDATABYID_REQUEST", "APPDATABYID_SUCCESS", "APPDATABYID_FAILURE"],
      }
    };
  };

  export const getViewEmployeeDetailsById = (data) => {
    return {
      [CALL_API]: {
        endpoint: 'Employee/getViewEmployeeDetailsById',
        init: {
          method: 'POST',
          body: JSON.stringify(data)
        },
        types: ["APPDATABYID_REQUEST", "APPDATABYID_SUCCESS", "APPDATABYID_FAILURE"],
      }
    };
  };
  

  export const updateEmployee = (data) => {
    return {
      [CALL_API]: {
        endpoint: 'Employee/updateEmployee',
        init: {
          method: 'POST',
          body: JSON.stringify(data)
        },
        types: ["UPDATEAPP_REQUEST", "UPDATEAPP_SUCCESS", "UPDATEAPP_FAILURE"],
      }
    };
  };


  export const deleteApp = (data) => {
    return {
      [CALL_API]: {
        endpoint: 'Application/deleteApplication',
        init: {
          method: 'POST',
          body: JSON.stringify(data)
        },
        types: ["DELETEAPP_REQUEST", "DELETEAPP_SUCCESS", "DELETEAPP_FAILURE"],
      }
    };
  };

  export const searchApplicationData = (data) => {
    return {
      [CALL_API]: {
        endpoint: 'Application/applicationBySearch',
        init: {
          method: 'POST',
          body: JSON.stringify(data)
        },
        types: ["SEARCHAPP_REQUEST", "SEARCHAPP_SUCCESS", "SEARCHAPP_FAILURE"],
      }
    };
  };

  

  

  

  
  

