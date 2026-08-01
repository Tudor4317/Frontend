import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { AccessComponent } from './ContextAPI/accessContext'
import { App } from './Components/App'
import "./index.css"




createRoot(document.getElementById('root')).render(
  <StrictMode>

<BrowserRouter>
<AccessComponent>
  <Routes>

  <Route path="/*" element={<App />}/>

  </Routes>
</AccessComponent>
</BrowserRouter>




  </StrictMode>,
)
