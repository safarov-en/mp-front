import { Suspense } from "react"
import PublicRoutes from "routes/PublicRoutes"
import Header from "features/Header"
import {AppStyles, Footer} from 'App.styled'

export const App = () => {
    return (
        <>
            <AppStyles />
            <Header />
            <Suspense fallback={'Loading...'}>
                <PublicRoutes />
            </Suspense>
            <Footer>
                <div>© Маркетплейс</div>
            </Footer>
        </>
    )
}