import { User } from '@/pages/users'
import { Dashboard } from '@/pages/dashboards'
import { Connection } from '@/pages/connections'
import { TemplateGroup } from '@/pages/templateGroups'
import { Schedule } from '@/pages/schedules'
import { Enterprise } from '@/pages/enterprises'

const ProtectedRoutes = [
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/users",
        element: <User />,
    },
    {
        path: "/connections",
        element: <Connection />,
    },
    {
        path: "/mail-templates",
        element: <TemplateGroup />,
    },
    {
        path: "/schedules",
        element: <Schedule />,
    },
    {
        path: "/enterprises",
        element: <Enterprise />,
    }
]

export default ProtectedRoutes