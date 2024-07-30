import { Suspense } from "react"
import PublicRoutes from "routes/PublicRoutes"

export const App = () => {
    return (
        <Suspense fallback={'Loading...'}>
            <PublicRoutes />
        </Suspense>
    )
}