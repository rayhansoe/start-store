import { createRoot, createSignal } from "solid-js";
import { refetchRouteData } from "solid-start";

const CartModalContext = createRoot(() => {
  const [isCartOpen, setIsCartOpen] = createSignal(false)
  const openCartModal = () => {
    setIsCartOpen(true)
    refetchRouteData('cart')
  }
  const closeCartModal = () => {
    setIsCartOpen(false)
    refetchRouteData('cart')
  }

  return {isCartOpen, setIsCartOpen, openCartModal, closeCartModal}
})

export default CartModalContext