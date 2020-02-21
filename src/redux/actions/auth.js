import { CALL_API } from '../middleware/api';
import * as ACTION from '../constants/auth';

export const login = (auth) => {
  return {
    [CALL_API]: {
      endpoint: 'User/getAuthTokens',
      init: {
        method: 'POST',
        body: JSON.stringify(auth),
      },
      types: [
        ACTION.LOGIN_REQUEST,
        ACTION.LOGIN_SUCCESS,
        ACTION.LOGIN_FAILURE,
      ],
    }
  };
};

export const register = (info) => {
  return {
    [CALL_API]: {
      endpoint: 'AP/registerUsers',
      init: {
        method: 'POST',
        body: JSON.stringify(info),
      },
      types: [
        ACTION.REGISTER_REQUEST,
        ACTION.REGISTER_SUCCESS,
        ACTION.REGISTER_FAILURE,
      ],
    }
  };
};


export const ForgotPassword = (data) => {
  return {
    [CALL_API]: {
      endpoint: 'User/forgotPassword',
      init: {
        method: 'POST',
        body: JSON.stringify(data),
      },
      types: ["FORGOTPASSWORD_REQUEST", "FORGOTPASSWORD_SUCCESS", "FORGOTPASSWORD_FAILURE"],
    }
  };
};


export const changepassword = (data) => {
  return {
    [CALL_API]: {
      endpoint: 'User/changePassword',
      init: {
        method: 'POST',
        body: JSON.stringify(data),
      },
      types: ["CHANGEPASSWORD_REQUEST", "CHANGEPASSWORD_SUCCESS", "CHANGEPASSWORD_FAILURE"],
    }
  };
};


export const getUser = (id) => {
  return {
    [CALL_API]: {
      endpoint: 'User/currentUser',
      init: {
        method: 'POST',
        body: JSON.stringify({id: id}),
      },
      types: ["PROFILE_REQUEST", "PROFILE_SUCCESS", "PROFILE_FAILURE"],
    }
  };
};

export const avatarUpload = (data) => {
  console.log("avatarUpload data", data)
  return {
    [CALL_API]: {
      endpoint: 'User/uploadUserImage',
      init: {
        method: 'POST',
        body: JSON.stringify(data),
      },
      types: ["AVATAR_REQUEST", "AVATAR_SUCCESS", "AVATAR_FAILURE"],
    }
  };
};

export const updateprofile = (data) => {
  console.log("updateprofile data", data)
  return {
    [CALL_API]: {
      endpoint: 'User/updateUserDetailsById',
      init: {
        method: 'POST',
        body: JSON.stringify(data),
      },
      types: ["UPDATE_PROFILE_REQUEST", "UPDATE_PROFILE_SUCCESS", "UPDATE_PROFILE_FAILURE"],
    }
  };
};

export const getUserRoleId = (data) => {
  return {
    [CALL_API]: {
      endpoint: 'UserRole/searchUserRole',
      init: {
        method: 'POST',
        body: JSON.stringify(data),
      },
      types: ["SEARCHUSERROLEID_REQUEST", "SEARCHUSERROLEID_SUCCESS", "SEARCHUSERROLEID_FAILURE"],
    }
  };
};


export const removeImage = (data) => {
  return {
    [CALL_API]: {
      endpoint: 'Employee/removeEmployeeIcon',
      init: {
        method: 'POST',
        body: JSON.stringify(data),
      },
      types: ["REMOVEUSERIMAGE_REQUEST", "REMOVEUSERIMAGE_SUCCESS", "REMOVEUSERIMAGE_FAILURE"],
    }
  };
};

export const removeDocumentImage = (data) => {
  return {
    [CALL_API]: {
      endpoint: 'Document/removeDocumentImage',
      init: {
        method: 'POST',
        body: JSON.stringify(data),
      },
      types: ["REMOVEDOCUMENTUSER_REQUEST", "REMOVEDOCUMENTUSER_SUCCESS", "REMOVEDOCUMENTUSER_FAILURE"],
    }
  };
};

export const removeAdharCardBackDocumentImage = (data) => {
  return {
    [CALL_API]: {
      endpoint: 'Document/removeAdharCardBackDocumentImage',
      init: {
        method: 'POST',
        body: JSON.stringify(data),
      },
      types: ["REMOVEDOCUMENTUSER_REQUEST", "REMOVEDOCUMENTUSER_SUCCESS", "REMOVEDOCUMENTUSER_FAILURE"],
    }
  };
};

export const removePassportPhotoDocumentImage = (data) => {
  return {
    [CALL_API]: {
      endpoint: 'Document/removePassportPhotoDocumentImage',
      init: {
        method: 'POST',
        body: JSON.stringify(data),
      },
      types: ["REMOVEDOCUMENTUSER_REQUEST", "REMOVEDOCUMENTUSER_SUCCESS", "REMOVEDOCUMENTUSER_FAILURE"],
    }
  };
};

export const removePassportDocumentImage = (data) => {
  return {
    [CALL_API]: {
      endpoint: 'Document/removePassportDocumentImage',
      init: {
        method: 'POST',
        body: JSON.stringify(data),
      },
      types: ["REMOVEDOCUMENTUSER_REQUEST", "REMOVEDOCUMENTUSER_SUCCESS", "REMOVEDOCUMENTUSER_FAILURE"],
    }
  };
};

export const removePancardDocumentImage = (data) => {
  return {
    [CALL_API]: {
      endpoint: 'Document/removePancardDocumentImage',
      init: {
        method: 'POST',
        body: JSON.stringify(data),
      },
      types: ["REMOVEDOCUMENTUSER_REQUEST", "REMOVEDOCUMENTUSER_SUCCESS", "REMOVEDOCUMENTUSER_FAILURE"],
    }
  };
};

export const removeOriginalCertificateDocumentImage = (data) => {
  return {
    [CALL_API]: {
      endpoint: 'Document/removeOriginalCertificateDocumentImage',
      init: {
        method: 'POST',
        body: JSON.stringify(data),
      },
      types: ["REMOVEDOCUMENTUSER_REQUEST", "REMOVEDOCUMENTUSER_SUCCESS", "REMOVEDOCUMENTUSER_FAILURE"],
    }
  };
};

export const removeLeavingLetterDocumentImage = (data) => {
  return {
    [CALL_API]: {
      endpoint: 'Document/removeLeavingLetterDocumentImage',
      init: {
        method: 'POST',
        body: JSON.stringify(data),
      },
      types: ["REMOVEDOCUMENTUSER_REQUEST", "REMOVEDOCUMENTUSER_SUCCESS", "REMOVEDOCUMENTUSER_FAILURE"],
    }
  };
};

export const removeBankStatementDocumentImage = (data) => {
  return {
    [CALL_API]: {
      endpoint: 'Document/removeBankStatementDocumentImage',
      init: {
        method: 'POST',
        body: JSON.stringify(data),
      },
      types: ["REMOVEDOCUMENTUSER_REQUEST", "REMOVEDOCUMENTUSER_SUCCESS", "REMOVEDOCUMENTUSER_FAILURE"],
    }
  };
};

export const updateProfileData = () => {
  return {
    types: ["UPDATEPROFILE"]
  };
};

export const countuser = (data) => {
  return {
    [CALL_API]: {
      endpoint: 'Employee/countEmployee',
      init: {
        method: 'POST',
        body: JSON.stringify(data),
      },
      types: ["GETUSERSCOUNTS_REQUEST", "GETUSERSCOUNTS_SUCCESS", "GETUSERSCOUNTS_FAILURE"],
    }
  };
};

export const usersPGData = (obj) => {
  return {
    [CALL_API]: {
      endpoint: 'Employee/employeeByPg',
      init: {
        method: 'POST',
        body: JSON.stringify(obj)
      },
      types: ["GETUSERSPG_REQUEST", "GETUSERSPG_SUCCESS", "GETUSERSPG_FAILURE"],
    }
  };
};

export const searchUsersData = (data) => {
  return {
    [CALL_API]: {
      endpoint: 'Employee/searchEmployeeData',
      init: {
        method: 'POST',
        body: JSON.stringify(data),
      },
      types: ["SEARCHUSERS_REQUEST", "SEARCHUSERS_SUCCESS", "SEARCHUSERS_FAILURE"],
    }
  };
};

export const blockUser = (data) => {
  return {
    [CALL_API]: {
      endpoint: 'Employee/deleteEmployee',
      init: {
        method: 'POST',
        body: JSON.stringify(data),
      },
      types: ["INACTIVEUSER_REQUEST", "INACTIVEUSER_SUCCESS", "INACTIVEUSER_FAILURE"],
    }
  };
};





export const logout = () => {
  return {
    [CALL_API]: {
      endpoint: '/auth/logout',
      init: {
        method: 'GET',
      },
      types: [
        ACTION.LOGOUT_REQUEST,
        ACTION.LOGOUT_SUCCESS,
        ACTION.LOGOUT_FAILURE,
      ],
    }
  };
};
