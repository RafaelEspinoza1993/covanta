import axios from 'axios';

const handleErrorResponse = {
  'status': 401,
  'title': 'Internal Error',
  'detail': 'Internal error, check response log.',
};

export const postRequestHandler = async (url, data, headers = {}) => {
  return await axios.post(url, data, headers)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
      return handleErrorResponse;
    });

};

export const getRequestHandler = async (url, headers = {}) => {
  return await axios.get(url, headers)
    .then(response => {
      console.log(response);

    }).catch(error => {
      console.log(error);
      return handleErrorResponse;
    });
};
