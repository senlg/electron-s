import { createMemoryRouter, createBrowserRouter, RouterProvider, NavLink } from 'react-router'

export const router = createBrowserRouter([
    {
        index: true,
        Component: () => {
            return <>
                home
                <NavLink to={'/test'}>test</NavLink>
            </>
        }
    },
    {
        path: '/test',
        Component: () => {
            return <>
                home
                <NavLink to={'/'}>home</NavLink>
            </>
        }
    }
], {
    basename: '/app'
})


export const Router = () => {
    return <RouterProvider router={router} />
}
