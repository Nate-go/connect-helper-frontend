import { Login, SignUp } from '@pages/authentication'

const AuthenticatedRoute = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    }
]

export default AuthenticatedRoute