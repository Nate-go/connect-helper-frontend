import { Login, SignUp } from '@pages/authentication'
import { About } from '@/pages/guest'

const AuthenticatedRoute = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: '/About',
        element: <About/>
    }

]

export default AuthenticatedRoute