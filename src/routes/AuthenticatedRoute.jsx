import { UserDetail, UserList} from '@/pages/users'
import { Home } from '@pages/home'

const AuthenticatedRoute = [
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/users-detail",
        element: <UserDetail />,
    }
]

export default AuthenticatedRoute