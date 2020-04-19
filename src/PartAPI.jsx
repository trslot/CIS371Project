const apiURL = 'http://localhost:3001'
//const apiURL = 'https://railsapi-kurmasz.codeanyapp.com'

export default class API {
  static fetchParts () {
    return fetch(`${apiURL}/parts`)
      .then(response => {
        // Notice: At this point, we have only the headers.  We can't
        // access the JSON data.
        console.log('Response from /parts ')
        console.log(response)

        if (response.ok) {
          return response.json()
        } else {
          throw new Error(`Got a ${response.status} status.`)
        }
      })
      .then(data => {
        console.log('JSON data from /parts')
        console.log(data)
        return data
      })
  } // end fetchParts

  static postNewPart (parts) {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(parts)
    }
    console.log('Attempting to post new parts')
    console.log(parts)
    return fetch(`${apiURL}/parts`, options).then(async response => {
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

  static updatePart (parts) {
    const options = {
      // We use PUT instead of PATCH because we are replacing all of the fields.
      // If we were sending only the fields that changed, we'd use PATCH
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(parts)
    }
    console.log('Attempting to update parts')
    console.log(parts)
    return fetch(`${apiURL}/parts/${parts.id}`, options).then(
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
  } // end updatePart

  static deletePart (id) {
    const options = {
      method: 'DELETE'
    }
    console.log('Attempting to delete parts with id ' + id)
    return fetch(`${apiURL}/parts/${id}`, options).then(async response => {
      console.log('The DELETE response.')
      console.log(response)
      if (response.ok && response.status === 204) {
        return true
      } else {
        throw new Error(`Got a ${response.status} status`)
      }
    })
  } // end deletePart
} // end class API
