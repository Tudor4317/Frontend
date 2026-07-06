import { App } from './App'
import { ProfilePage } from './ProfilePage'
import { ErrorRoute } from './ErrorRoute'
import { Dashboard } from './Dashboard'
import SignUpForm from './SignUp'


const routes = [
    {
    path : "/",
    element : <App />,
    errorElement : <ErrorRoute />

  },
  {
    path: "/Dashboard/user/:username",
    element: <Dashboard />

  },
  {
    path : "/profile/:username",
    element : <ProfilePage />,
    

  },
  {
    path : "/sign-up",
    element : <SignUpForm />
  }
]

export default routes