import { Login, SignUp, VerifyAccount } from '@pages/authentication'
import { About, Home, Contact } from '@/pages/guest'

const PublicRoutes = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: "/verify-account",
        element: <VerifyAccount />,
    },
    {
        path: '/About',
        element: <About/>
    },
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/Contact',
        element: <Contact />
    }
]

export default PublicRoutes