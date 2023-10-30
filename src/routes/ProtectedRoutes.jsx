import { UserDetail, UserList} from '@/pages/users'
import { Dashboard } from '@/pages/dashboards'
import { Connection } from '@/pages/connections'

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
    },
    {
        path: "/connections",
        element: <Connection />,
    }
]

export default ProtectedRoutes