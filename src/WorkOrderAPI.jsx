const apiURL = 'http://localhost:3001'
//const apiURL = 'https://railsapi-kurmasz.codeanyapp.com'

export default class API {
  static fetchWorkOrders () {
    return fetch(`${apiURL}/workOrders`)
      .then(response => {
        // Notice: At this point, we have only the headers.  We can't
        // access the JSON data.
        console.log('Response from /workOrders ')
        console.log(response)

        if (response.ok) {
          return response.json()
        } else {
          throw new Error(`Got a ${response.status} status.`)
        }
      })
      .then(data => {
        console.log('JSON data from /workOrders')
        console.log(data)
        return data
      })
    }// end fetchWorkOrders
    
  static postNewWorkOrder (workOrders) {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(workOrders)
    }
    console.log('Attempting to post new workOrders')
    console.log(workOrders)
    return fetch(`${apiURL}/workOrders`, options).then(async response => {
      console.log('The POST response.')
      console.log(response)
      if (response.ok) {
        return response.json()
      } else if (response.status === 422) {
        const data = await response.json()
        console.log('Validation message: ')
        console.log(data)
        throw new Error(`Server validation failed: ${data.message}`)
      } else {
        throw new Error(`Got a ${response.status} status.`)
      }
    })
  }

  static updateWorkOrder (workOrders) {
    const options = {
      // We use PUT instead of PATCH because we are replacing all of the fields.
      // If we were sending only the fields that changed, we'd use PATCH
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(workOrders)
    }
    console.log('Attempting to update workOrders')
    console.log(workOrders)
    return fetch(`${apiURL}/workOrders/${workOrders.id}`, options).then(
      async response => {
        console.log('The PUT response.')
        console.log(response)
        if (response.ok && response.status === 204) {
          return true
        } else if (response.status === 422) {
          const data = await response.json()
          console.log('Validation message: ')
          console.log(data)
          throw new Error(`Server validation failed: ${data.message}`)
        } else {
          throw new Error(`Got a ${response.status} status.`)
        }
      }
    )
  } // end updateWorkOrder

  static deleteWorkOrder (id) {
    const options = {
      method: 'DELETE'
    }
    console.log('Attempting to delete workOrders with id ' + id)
    return fetch(`${apiURL}/workOrders/${id}`, options).then(async response => {
      console.log('The DELETE response.')
      console.log(response)
      if (response.ok && response.status === 204) {
        return true
      } else {
        throw new Error(`Got a ${response.status} status`)
      }
    })
  } // end deleteWorkOrder
} // end class API
