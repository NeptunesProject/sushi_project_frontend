import React, { useState } from 'react'
import {
  Box,
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerHeader,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react'
import { BasketTypes } from '../../types'
import { ArrowBackIcon } from '@chakra-ui/icons'
import InfoToPay from './InfoToPay'
import {
  useBasketContext,
  useBasketDispatchContext,
} from 'contexts/BasketContext'
import { handleClick } from './makeOrderFuncs'

interface Props {
  setSelectedBasketType: React.Dispatch<React.SetStateAction<BasketTypes>>
  setOrderId: React.Dispatch<React.SetStateAction<number>>
}

const getFromLocaleStorage = (key: string, defaultValue: string): string => {
  const storedValue = localStorage.getItem(key)
  return storedValue ? JSON.parse(storedValue) : defaultValue
}

const DeliveryForm = ({ setSelectedBasketType, setOrderId }: Props) => {
  const [name, setName] = useState(() =>
    getFromLocaleStorage('personInfo-Name', ''),
  )
  const [phoneNumber, setPhoneNumber] = useState(() =>
    getFromLocaleStorage('personInfo-Number', ''),
  )
  const [deliveryType, setDeliveryType] = useState(() =>
    getFromLocaleStorage('personInfo-Delivery', 'pickup'),
  )
  const [street, setStreet] = useState(() =>
    getFromLocaleStorage('personInfo-Street', ''),
  )

  const [payment, setPayment] = useState(() =>
    getFromLocaleStorage('paymentType', ''),
  )

  const { personCount, sticks, studySticks } = useBasketContext()
  const { setPersonCount, setSticks, clearProductList, setStudySticks } =
    useBasketDispatchContext()

  return (
    <>
      <DrawerHeader
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text
          cursor="pointer"
          onClick={() => setSelectedBasketType('basket')}
          fontSize={15}
        >
          <ArrowBackIcon /> back{' '}
        </Text>
        <DrawerCloseButton pos="static" />
      </DrawerHeader>
      <DrawerBody color="blue.200">
        <Flex flexDir="column" gap={5}>
          <Text fontSize={18} fontWeight={600} mb={5}>
            Confirm order
          </Text>

          <Box mb={10}>
            <Text fontWeight={600} mb={2}>
              Personal data:
            </Text>

            <Flex flexDir="column" gap={3} align="start" mb={4}>
              <Input
                value={name}
                onInput={(e) => {
                  setName((e.target as HTMLInputElement).value)
                  localStorage.setItem(
                    'personInfo-Name',
                    JSON.stringify((e.target as HTMLInputElement).value),
                  )
                }}
                placeholder="name"
              />
              <Input
                value={phoneNumber}
                onInput={(e) => {
                  setPhoneNumber((e.target as HTMLInputElement).value)
                  localStorage.setItem(
                    'personInfo-Number',
                    JSON.stringify((e.target as HTMLInputElement).value),
                  )
                }}
                type="tel"
                placeholder="phone number"
              />
              {deliveryType === 'delivery' && (
                <Input
                  value={street}
                  onInput={(e) => {
                    setStreet((e.target as HTMLInputElement).value)
                    localStorage.setItem(
                      'personInfo-Street',
                      JSON.stringify((e.target as HTMLInputElement).value),
                    )
                  }}
                  type="text"
                  placeholder="street"
                />
              )}
            </Flex>

            <RadioGroup
              onChange={(value) => {
                setDeliveryType(value)
                localStorage.setItem(
                  'personInfo-Delivery',
                  JSON.stringify(value),
                )
              }}
              value={deliveryType}
            >
              <Stack direction="column">
                <Radio value="pickup">Self pick-up</Radio>
                <Radio value="delivery">Delivery to address</Radio>
              </Stack>
            </RadioGroup>

            <Text fontWeight={600} mb={2} mt={2}>
              Payment method:
            </Text>
            <RadioGroup
              onChange={(value) => {
                setPayment(value)
                localStorage.setItem('paymentType', JSON.stringify(value))
              }}
              value={payment}
            >
              <Stack direction="column">
                <Radio value="cash">Cash on delivery</Radio>
                <Radio value="terminal">Card on delivery</Radio>
                <Radio value="online">Online</Radio>
              </Stack>
            </RadioGroup>
          </Box>

          <InfoToPay />

          <Button
            alignSelf="end"
            w="60%"
            border="2px solid"
            borderColor="turquoise.77"
            bg="none"
            borderRadius={25}
            onClick={() =>
              handleClick(
                setSelectedBasketType,
                name,
                street,
                deliveryType,
                phoneNumber,
                personCount,
                sticks,
                studySticks,
                payment,
                setOrderId,
                setName,
                setPhoneNumber,
                setDeliveryType,
                setStreet,
                setPersonCount as React.Dispatch<React.SetStateAction<number>>,
                setSticks as React.Dispatch<React.SetStateAction<number>>,
                clearProductList,
                setStudySticks as React.Dispatch<React.SetStateAction<number>>,
                setPayment,
              )
            }
          >
            Continue
          </Button>
        </Flex>
      </DrawerBody>
    </>
  )
}

export default DeliveryForm
