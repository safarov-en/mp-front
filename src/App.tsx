import { Suspense } from "react"
import { useLocation } from "react-router-dom"
import { paths } from "routes/helpers"
import PublicRoutes from "routes/PublicRoutes"
import Header from "features/Header"
import {AppStyles, Footer} from 'App.styled'

export const App = () => {
    const location = useLocation()
    const notIsAuthPage = ![paths.login, paths.register].includes(location.pathname)
    return (
        <>
            <AppStyles />
            {notIsAuthPage && <Header />}
            <Suspense fallback={'Loading...'}>
                <PublicRoutes />
            </Suspense>
            {notIsAuthPage && <Footer>
                <div>© Маркетплейс</div>
            </Footer>}
        </>
    )
}