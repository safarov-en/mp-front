import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { checkPathMatch, paths } from "./helpers"
import { lazy } from "react"

const AccountSettingsPage = lazy(() => import('pages/AccountSettingsPage'))

const PrivateRoutes: React.FC = () => {
    const location = useLocation()
    const isMatch = checkPathMatch(location.pathname, paths)
    return (
        <Routes>
            <Route path={paths.accountSettings} element={<AccountSettingsPage />} />
            <Route path='*' element={!isMatch ? <Navigate to={paths.home} /> : null} />
        </Routes>
    )
}

export default PrivateRoutes