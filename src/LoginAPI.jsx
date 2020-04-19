const apiURL = 'http://localhost:3001'
//const apiURL = 'https://railsapi-kurmasz.codeanyapp.com

export default class API {
  static fetchLogins () {
    return fetch(`${apiURL}/logins`)
      .then(response => {
        // Notice: At this point, we have only the headers.  We can't
        // access the JSON data.
        console.log('Response from /logins ')
        console.log(response)

        if (response.ok) {
          return response.json()
        } else {
          throw new Error(`Got a ${response.status} status.`)
        }
      })
      .then(data => {
        console.log('JSON data from /logins')
        console.log(data)
        return data
      })
    }// end fetchLogins
    
  static postNewLogin (logins) {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(logins)
    }
    console.log('Attempting to post new logins')
    console.log(logins)
    return fetch(`${apiURL}/logins`, options).then(async response => {
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

  static updateLogin (logins) {
    const options = {
      // We use PUT instead of PATCH because we are replacing all of the fields.
      // If we were sending only the fields that changed, we'd use PATCH
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(logins)
    }
    console.log('Attempting to update logins')
    console.log(logins)
    return fetch(`${apiURL}/logins/${logins.id}`, options).then(
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
  } // end updateLogin

  static deleteLogin (id) {
    const options = {
      method: 'DELETE'
    }
    console.log('Attempting to delete logins with id ' + id)
    return fetch(`${apiURL}/logins/${id}`, options).then(async response => {
      console.log('The DELETE response.')
      console.log(response)
      if (response.ok && response.status === 204) {
        return true
      } else {
        throw new Error(`Got a ${response.status} status`)
      }
    })
  } // end deleteLogin
} // end class API
