import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import CountButton from '../../ui/CountButton'
import {
  useBasketContext,
  useBasketDispatchContext,
} from 'contexts/BasketContext'

const AdditionalProducts = () => {
  const { personCount, sticks } = useBasketContext()
  const { setPersonCount, setSticks } = useBasketDispatchContext()

  return (
    <Flex flexDir="column" fontWeight={600} gap={3}>
      <Flex w="100%" justify="space-between">
        <Text>Кількість персон</Text>

        <Flex align="center" gap={2}>
          <CountButton
            borderLeftRadius={20}
            borderRightRadius={5}
            onClick={(e) => {
              e.preventDefault()
              if (personCount > 1) {
                setPersonCount(personCount - 1)
              }
            }}
          >
            -
          </CountButton>

          <Text fontSize={12} fontWeight={600}>
            {personCount}
          </Text>

          <CountButton
            borderRightRadius={20}
            borderLeftRadius={5}
            onClick={(e) => {
              e.preventDefault()
              setPersonCount(personCount + 1)
            }}
          >
            +
          </CountButton>
        </Flex>
      </Flex>

      <Flex w="100%" justify="space-between">
        <Text>Кількість навчальних паличок</Text>

        <Flex align="center" gap={2}>
          <CountButton
            borderLeftRadius={20}
            borderRightRadius={5}
            onClick={(e) => {
              e.preventDefault()
              if (sticks > 0) {
                setSticks(sticks - 1)
              }
            }}
          >
            -
          </CountButton>

          <Text fontSize={12} fontWeight={600}>
            {sticks}
          </Text>

          <CountButton
            borderRightRadius={20}
            borderLeftRadius={5}
            onClick={(e) => {
              e.preventDefault()
              setSticks(sticks + 1)
            }}
          >
            +
          </CountButton>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default AdditionalProducts
