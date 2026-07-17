import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { AccessComponent } from './ContextAPI/accessContext'
import { App } from './Components/App'
import { ArtefactRefresh } from './ContextAPI/artefactsRefresh'



createRoot(document.getElementById('root')).render(
  <StrictMode>

<BrowserRouter>
<ArtefactRefresh>
<AccessComponent>
  <Routes>

  <Route path="/*" element={<App />}/>

  </Routes>
</AccessComponent>
</ArtefactRefresh>
</BrowserRouter>




  </StrictMode>,
)
