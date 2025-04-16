import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  try {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.get(baseUrl, config)
    console.log('[PROD DEBUG] /api/blogs response:', response.data)
    return response.data
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('token_expired')
    }
    throw error
  }
}

const create = async newObject => {
  try {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('token_expired')
    }
    throw error
  }
}

const update = async (id, newObject) => {
  try {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
    return response.data
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('token_expired')
    }
    throw error
  }
}

const remove = async (id) => {
  try {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('token_expired')
    }
    throw error
  }
}

export default { getAll, setToken, create, update, remove }