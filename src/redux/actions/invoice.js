import { CALL_API } from '../middleware/api';

export const createInvoice = (data) => {
    return {
      [CALL_API]: {
        endpoint: 'Invoice/createInvoice',
        init: {
          method: 'POST',
          body: JSON.stringify(data),
        },
        types: ["CREATEINVOICE_REQUEST", "CREATEINVOICE_SUCCESS", "CREATEINVOICE_FAILURE"],
      }
    };
  };

  export const getInvoice = (data) => {
    return {
      [CALL_API]: {
        endpoint: 'Invoice/getInvoice',
        init: {
          method: 'POST',
          body: JSON.stringify(data),
        },
        types: ["GETINVOICE_REQUEST", "GETINVOICE_SUCCESS", "GETINVOICE_FAILURE"],
      }
    };
  };

  
  

  

  

  
  

