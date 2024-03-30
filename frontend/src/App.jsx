import { useState } from 'react'

import './App.css'
import ProductList from './components/ProductList/ProductList'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-gray-100 p-4">
       <ProductList />
    </div>
  )
}

export default App




// {
//   "companyName": "Afford Medical",
//   "clientID": "b72b61dd-eb0f-492a-a0fd-f387d2a43d90",
//   "clientSecret": "KyfzYkZESXmnyema",
//   "ownerName": "Piyush Rana",
//   "ownerEmail": "piyush222rana@gmail.com",
//   "rollNo": "20MIS0410"
// }

// {
//   "token_type": "Bearer",
//   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzExNzkzOTY1LCJpYXQiOjE3MTE3OTM2NjUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImI3MmI2MWRkLWViMGYtNDkyYS1hMGZkLWYzODdkMmE0M2Q5MCIsInN1YiI6InBpeXVzaDIyMnJhbmFAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiQWZmb3JkIE1lZGljYWwiLCJjbGllbnRJRCI6ImI3MmI2MWRkLWViMGYtNDkyYS1hMGZkLWYzODdkMmE0M2Q5MCIsImNsaWVudFNlY3JldCI6Ikt5ZnpZa1pFU1htbnllbWEiLCJvd25lck5hbWUiOiJQaXl1c2ggUmFuYSIsIm93bmVyRW1haWwiOiJwaXl1c2gyMjJyYW5hQGdtYWlsLmNvbSIsInJvbGxObyI6IjIwTUlTMDQxMCJ9.oJFsq3uuvbZKLKLBd4Mmfd7zm4gl9hXRUheZLsD1gKw",
//   "expires_in": 1711793965
// }