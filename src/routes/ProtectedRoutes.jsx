import { UserDetail, UserList} from '@/pages/users'
import { Dashboard } from '@/pages/authenticated'

const ProtectedRoutes = [
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/users-detail",
        element: <UserDetail />,
    },
    {
        path: "/users",
        element: <UserList />,
    }
]

export default ProtectedRoutes