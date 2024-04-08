import { postOrder } from 'api'
import { BasketTypes, CartItem, ProductObj, ReturnedOrder } from 'types'

export interface IMakeOrder {
  (
    setSelectedBasketType: React.Dispatch<React.SetStateAction<BasketTypes>>,
    name: string,
    street: string,
    deliveryType: string,
    phoneNumber: string,
    personCount: number,
    sticks: number,
    setName: React.Dispatch<React.SetStateAction<string>>,
    setPhoneNumber: React.Dispatch<React.SetStateAction<string>>,
    setDeliveryType: React.Dispatch<React.SetStateAction<string>>,
    setStreet: React.Dispatch<React.SetStateAction<string>>,
    setPersonCount: React.Dispatch<React.SetStateAction<number>>,
    setSticks: React.Dispatch<React.SetStateAction<number>>,
    clearProductList: () => void,
  ): Promise<ReturnedOrder>
}

export const makeOrder: IMakeOrder = async (
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
  setPersonCount,
  setSticks,
  clearProductList,
) => {
  setSelectedBasketType('delivery')

  const productsList: Record<string, ProductObj> = JSON.parse(
    localStorage.getItem('selectedProducts') || '{}',
  )

  const cartItems: CartItem[] = Object.keys(productsList).map(
    (productId: string) => {
      const product = productsList[productId]
      return {
        id: productId,
        quantity: product.count,
      }
    },
  )

  try {
    const order = await postOrder({
      toDateTime: new Date().toISOString(),
      clientInfo: {
        name,
        phoneNumber,
      },
      deliveryAddress: {
        clientAddress: street,
      },
      comment: 'Leave at the door.', // Temporary default value
      peopleCount: personCount,
      cartItems,
      studySticksCount: sticks,
      sticksCount: 2 * personCount + sticks,
      deliveryType: deliveryType.toUpperCase(),
      paymentType: 'ONLINE', // Temporary default value
    })

    setName('')
    setPhoneNumber('')
    setDeliveryType('self')
    setStreet('')
    setPersonCount(1)
    setSticks(0)
    clearProductList()
    return order
  } catch (error) {
    console.error('Error occurred while making order:', error)
    throw new Error('Failed to make order')
  }
}
