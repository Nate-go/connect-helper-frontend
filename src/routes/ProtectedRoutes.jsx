import { UserDetail, UserList} from '@/pages/users'
import { Dashboard } from '@/pages/dashboards'
import { Connection } from '@/pages/connections'
import { TemplateGroup } from '@/pages/templateGRoups'

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
    },
    {
        path: "/mail-templates",
        element: <TemplateGroup />,
    }
]

export default ProtectedRoutes