import axios from 'axios'

let API_ROOT = 'http://localhost:9004'
if (process.env.NODE_ENV === 'production') {
  API_ROOT = '/apps/auth/'
  // API_ROOT = 'https://rex.mskcc.org/apps/auth/'
}

export const REQUEST_COLUMNS = 'REQUEST_COLUMNS'

export const RECEIVE_COLUMNS_SUCCESS = 'RECEIVE_COLUMNS_SUCCESS'
// export const RECEIVE_COLUMNS_INVALID_COMBINATION = 'RECEIVE_COLUMNS_INVALID_COMBINATION'

export const RECEIVE_COLUMNS_FAIL = 'RECEIVE_COLUMNS_FAIL'

export function getInitialColumns(application, material) {
  return dispatch => {
    dispatch({ type: REQUEST_COLUMNS })
    material = material.replace('/', '_PIPI_SLASH_')
    application = application.replace('/', '_PIPI_SLASH_')
    return axios
      .get(API_ROOT + '/columnDefinition?', {
        params: {
          type: material,
          recipe: application,
        },
      })
      .then(response => {
        dispatch({
          type: RECEIVE_COLUMNS_SUCCESS,
          data: response.data,
        })
        console.log(response)
        return response
      })
      .catch(error =>
        dispatch({
          type: RECEIVE_COLUMNS_FAIL,
          error: error,
        })
      )
  }
}
