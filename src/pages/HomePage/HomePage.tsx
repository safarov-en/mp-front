import { Helmet } from "react-helmet"
import { ProductGroup, ProductGroupContainer } from "./styled"
import { PageWrapper } from "App.styled"
import { dummyProducts } from "pages/dummyProducts"
import ProductCard from "blocks/ProductCard"

const HomePage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Главная - MW Marketplace</title>
            </Helmet>
            <PageWrapper>
                <ProductGroup>
                    <h2>Рекомендуемые товары</h2>
                    <ProductGroupContainer>
                        {dummyProducts.map((p) => (
                            <ProductCard
                                {...p}
                                key={p.id}
                            />
                        ))}
                    </ProductGroupContainer>
                </ProductGroup>
            </PageWrapper>
        </>
    )
}

export default HomePage