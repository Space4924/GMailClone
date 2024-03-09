import {Suspense , lazy} from 'react'
import { routes } from './routes/routes'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom'
import SuspenseLoader from './components/common/SuspenseLoader'
const ErrorComponents=lazy(()=>import('./components/common/ErrorComponents'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={routes.main.path} element={<Navigate to={`${routes.emails.path}/inbox`} />} />
      <Route path={routes.main.path} element={<routes.main.element />}  >
         <Route path={`${routes.emails.path}/:type`} element={<routes.emails.element/>} errorElement={<ErrorComponents/>}/>
         <Route path={routes.view.path} element={<routes.view.element/>} errorElement={<ErrorComponents/>}/>
      </Route>
      <Route path={routes.invalid.path} element={<Navigate to={`${routes.emails.path}/inbox`} />}/>

    </Route>
  )
)
const App = () => {
  return (
    <>
    <Suspense fallback={<SuspenseLoader/>}>
      <RouterProvider router={router} />
      </Suspense>
      {/* <Main/> */}
    </>
  )
}

export default App
