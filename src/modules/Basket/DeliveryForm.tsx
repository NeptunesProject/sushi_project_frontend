import React, { useState } from 'react'
import Stripe from 'stripe'
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
import { BasketTypes, ReturnedOrder } from '../../types'
import { ArrowBackIcon } from '@chakra-ui/icons'
import InfoToPay from './InfoToPay'
import {
  useBasketContext,
  useBasketDispatchContext,
} from 'contexts/BasketContext'
import { makeOrder } from './makeOrderFunc'

const STRIPE_SK = import.meta.env.VITE_STRIPE_SECRET_KEY
const BASE_URL = import.meta.env.VITE_APP_BASE_URL

interface Props {
  setSelectedBasketType: React.Dispatch<React.SetStateAction<BasketTypes>>
}

const DeliveryForm = ({ setSelectedBasketType }: Props) => {
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [deliveryType, setDeliveryType] = useState('self')
  const [street, setStreet] = useState('')

  const { personCount, sticks } = useBasketContext()
  const { setPersonCount, setSticks, clearProductList } =
    useBasketDispatchContext()
  const stripe = new Stripe(STRIPE_SK)

  async function createSession(order: ReturnedOrder) {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'pln',
              product_data: {
                name: `Order #${order.id}`,
              },
              unit_amount: 6000,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${BASE_URL}?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${BASE_URL}?cancel=true&session_id={CHECKOUT_SESSION_ID}`,
      })
      if (session && session.url) {
        window.location.replace(session.url)
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function checkSession() {
    try {
      const queryString = window.location.search
      const urlParams = new URLSearchParams(queryString)
      const sessionId = urlParams.get('session_id')
      if (sessionId) {
        const session = await stripe.checkout.sessions.retrieve(sessionId)
        console.log('session.status >>> ', session.status)
        console.log('session.payment_status >>> ', session.payment_status)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function createOrder() {
    const order = await makeOrder(
      setSelectedBasketType,
      name,
      street,
      deliveryType,
      phoneNumber,
      personCount,
      sticks,
      setName,
      setPhoneNumber,
      setDeliveryType,
      setStreet,
      setPersonCount as React.Dispatch<React.SetStateAction<number>>,
      setSticks as React.Dispatch<React.SetStateAction<number>>,
      clearProductList,
    )
    if (order && order.paymentType === 'ONLINE') {
      createSession(order)
    }
  }

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
                onInput={(e) => setName((e.target as HTMLInputElement).value)}
                placeholder="name"
              />
              <Input
                value={phoneNumber}
                onInput={(e) =>
                  setPhoneNumber((e.target as HTMLInputElement).value)
                }
                type="tel"
                placeholder="phone number"
              />
              {deliveryType === 'delivery' && (
                <Input
                  value={street}
                  onInput={(e) =>
                    setStreet((e.target as HTMLInputElement).value)
                  }
                  type="text"
                  placeholder="street"
                />
              )}
            </Flex>

            <RadioGroup onChange={setDeliveryType}>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-expect-error */}
              <Stack direction="column" value={deliveryType}>
                <Radio defaultChecked value="self">
                  Self pick-up
                </Radio>
                <Radio value="delivery">Delivery to address</Radio>
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
            onClick={() => {
              createOrder()
            }}
          >
            Continue
          </Button>
          <Button
            alignSelf="end"
            w="60%"
            border="2px solid"
            borderColor="turquoise.77"
            bg="none"
            borderRadius={25}
            onClick={() => {
              checkSession()
            }}
          >
            Check
          </Button>
        </Flex>
      </DrawerBody>
    </>
  )
}

export default DeliveryForm
