import { Helmet } from "react-helmet"
import { useSelector } from "react-redux"
import { selectFavorites } from "features/Favorites/selectors"
import { ProductGroup, ProductGroupContainer } from "./styled"
import { PageWrapper } from "App.styled"
import { dummyProducts } from "pages/dummyProducts"
import ProductCard from "blocks/ProductCard"

const HomePage: React.FC = () => {
    const idsInFavorites = useSelector(selectFavorites)
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
                                isLiked={idsInFavorites.includes(p.id)}
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