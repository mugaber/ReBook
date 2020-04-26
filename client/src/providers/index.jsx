import React, { useState, createContext } from 'react'

export const UserContext = createContext({
  user: null,
  updateUser: () => {},
})

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const updateUser = user => setUser(user)

  return (
    <UserContext.Provider value={{ user, updateUser }}>{children}</UserContext.Provider>
  )
}
