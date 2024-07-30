import { Helmet } from "react-helmet"
import { TestDiv } from "./styled"

const HomePage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Главная - MW Marketplace</title>
            </Helmet>
            <TestDiv />
        </>
    )
}

export default HomePage