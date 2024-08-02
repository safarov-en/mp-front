import { useState, useEffect, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { addToFavorites, removeFromFavorites } from "features/Favorites/reducer";
import { selectFavorites } from "features/Favorites/selectors";
import type { I_ProductDetails } from "pages/types";
import {ReactComponent as HeardEmpty} from './img/heart-empty.svg'
import {ReactComponent as HeardFilled} from './img/heart-filled.svg'
import {
    Wrapper,
    LikeWrapper,
    ImageWrapper,
    Image,
    InfoWrapper,
    PriceWrapper,
    PriceRegular,
    PriceRegularWhenDiscounted,
    PriceDiscounted
} from './styled'
import { PageWrapper } from "App.styled";
import {get} from 'helpers/request'
import type { I_UniRes } from "types";

const ProductDetailsPage: React.FC = () => {
    const params = useParams()
    const dispatch = useAppDispatch()
    const [productDetails, setProductDetails] = useState<I_ProductDetails>()
    useEffect(() => {
        get(`/products/${params.idOrSlug}`)
            .then((res: I_UniRes) => setProductDetails(res.data))
    }, [params.idOrSlug])
    const idsInFavorites = useAppSelector(selectFavorites)
    const isLiked = useMemo(
        () => idsInFavorites.includes(productDetails?.id!),
        [idsInFavorites, productDetails]
    )
    const handleFavorites = useCallback((e: React.MouseEvent<HTMLElement>) => {
        const {productId} = e.currentTarget.dataset
        dispatch(
            !idsInFavorites.includes(+productId!)
                ? addToFavorites(+productId!)
                : removeFromFavorites(+productId!)
        )
    }, [dispatch, idsInFavorites])
    if(!productDetails) return null
    const {id, image, title, description, price, priceDiscounted} = productDetails
    return (
        <>
            <Helmet>
                <title>Главная - MW Marketplace</title>
            </Helmet>
            <PageWrapper>
                <Wrapper>
                    <ImageWrapper>
                        <Image src={`${process.env.REACT_APP_API_URL}/images/products/${image}`} />
                        <LikeWrapper
                            data-product-id={id}
                            onClick={handleFavorites}
                        >
                            {isLiked ? <HeardFilled /> : <HeardEmpty />}
                        </LikeWrapper>
                    </ImageWrapper>
                    <InfoWrapper>
                        <h1>{title}</h1>
                        <p>{description}</p>
                        <PriceWrapper>
                            {Number.isInteger(priceDiscounted) ? <>
                                <PriceDiscounted>{priceDiscounted} ₽</PriceDiscounted>
                                <PriceRegularWhenDiscounted>{price} ₽</PriceRegularWhenDiscounted>
                            </> : (
                                <PriceRegular>{price} ₽</PriceRegular>
                            )}
                        </PriceWrapper>
                        <p>{description}</p>
                    </InfoWrapper>
                </Wrapper>
            </PageWrapper>
        </>
    )
}

export default ProductDetailsPage