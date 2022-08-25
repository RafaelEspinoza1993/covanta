import axios from 'axios';

const handleErrorResponse = {
  'status': 401,
  'title': 'Internal Error',
  'detail': 'Internal error, check response log.',
};

export const postRequestHandler = async (url, data, headers = {}) => {
  return await axios.post(url, data, headers)
    .then(response => {
      if (response.data.status === 401) {
        userService.logout();
      }
      

      return response;
    })
    .catch(error => {
      return handleErrorResponse;
    });

};

export const getRequestHandler = async (url, headers = {}) => {
  return await axios.get(url, headers)
    .then(response => {
      if (response.data.status === 401) {
        userService.logout();
      }
      

      return response;

    }).catch(error => {
      return handleErrorResponse;
    });
};


export const paginationRequestHandler = async (navigationHttpMethod, navigationParams = {}, headers = {}) => {
  return await axios[navigationHttpMethod](...navigationParams, headers)
    .then(response => {
      return response;
    }).catch(error => {
      return handleErrorResponse;
    });
};
