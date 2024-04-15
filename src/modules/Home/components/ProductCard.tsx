import { Product } from 'types'
import { Button, Flex, Image, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import stubImg from 'assets/img/stub.jpg'
import {
  useBasketContext,
  useBasketDispatchContext,
} from 'contexts/BasketContext'
import CountButton from 'ui/CountButton'

interface Props {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  const {
    addProduct,
    isProductAdded,
    calculateDiscountedPrice,
    removeProduct,
  } = useBasketDispatchContext()
  const { products } = useBasketContext()
  const navigate = useNavigate()

  const [count, setCount] = useState(1)

  const discount = {
    id: 1,
    discountPerQuantity: {
      1: '0.1',
      5: '0.3',
      10: '0.5',
    },
  }

  const isThisProductAdded = useMemo(() => isProductAdded(product), [products])

  const findProductById = (id: number) => {
    const product = products.find((item) => item.id === id)
    return product ? product.count : 0
  }

  const quantity = findProductById(product.id)

  const discountedPrice = calculateDiscountedPrice(
    product.price,
    discount.discountPerQuantity,
    quantity ? quantity : count,
  )

  const handleIncrement = () => {
    if (quantity) {
      addProduct(product)
    } else {
      setCount((prevCount) => prevCount + 1)
    }
  }

  const handleDecrement = () => {
    if (quantity && quantity > 1) {
      removeProduct(product)
    } else if (count > 1) {
      setCount((prevCount) => prevCount - 1)
    }
  }

  return (
    <Flex
      fontFamily="'Roboto', sans-serif"
      w={375}
      cursor="pointer"
      bg="white"
      borderRadius={10}
      boxShadow="1px 2px 10px rgba(0,0,0,.12)"
    >
      <Image
        fallback={<Image w={180} h={170} borderLeftRadius={10} src={stubImg} />}
        onClick={() => navigate(`/product/${product.id}`)}
        w={180}
        h={170}
        src={product.img}
        borderLeftRadius={10}
      />

      <Flex
        w="100%"
        flexDir="column"
        align="start"
        justify="space-between"
        p={2.5}
        pl={{ base: 2, md: 4 }}
        overflow="hidden"
      >
        <Text
          onClick={() => navigate(`/product/${product.id}`)}
          fontSize={15}
          lineHeight="19px"
          fontWeight={700}
          letterSpacing=".35px"
          color="blue.200"
          whiteSpace="nowrap"
        >
          {product.name}
        </Text>

        <Text fontSize={12} fontWeight={200} color="black" alignSelf="start">
          {product.weight} / {product.cartCount}
        </Text>

        <Flex align="center" justify="space-between" w="100%">
          <Text color="blue.200" fontWeight={700}>
            {product.price} zł
          </Text>
          <Text color="blue.200" fontWeight={700}>
            {discountedPrice} zł
          </Text>
          <Flex gap={{ base: 0.5, md: 1 }}>
            <CountButton
              onClick={handleDecrement}
              borderLeftRadius={20}
              borderRightRadius={5}
            >
              -
            </CountButton>
            <Text>{quantity ? quantity : count}</Text>
            <CountButton
              onClick={handleIncrement}
              borderRightRadius={20}
              borderLeftRadius={5}
            >
              +
            </CountButton>
          </Flex>
        </Flex>
        <Button
          w="100%"
          bg="turquoise.77"
          color="white"
          h={8}
          borderRadius={20}
          onClick={() => {
            addProduct(product, count)
            setCount(1)
          }}
        >
          {isThisProductAdded ? 'Added to basket' : 'Buy'}
        </Button>
      </Flex>
    </Flex>
  )
}

export default ProductCard
