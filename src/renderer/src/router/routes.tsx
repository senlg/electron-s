import { RouterProvider, NavLink, createBrowserRouter } from 'react-router'

export const router = createBrowserRouter([
    {
        index: true,
        Component: () => {
            return <>

                index
                <NavLink to={'/login'}>login</NavLink>
            </>
        }
    },
    {
        path: '/login',
        Component: () => {
            return <>
                Login
                <NavLink to={'/home'}>home</NavLink>
            </>
        }
    },
    {
        path: '/home',
        Component: () => {
            return <>
                home
                <NavLink to={'/login'}>login</NavLink>
            </>
        }
    },
    {
        path: '*',
        Component: () => {
            return <>
                <div style={{ backgroundColor: 'red' }}>404</div>
                <NavLink to={'/'}>home</NavLink>
            </>
        }
    }

])


export const Router = () => {
    return <RouterProvider router={router} />
}
