// Order and payment utilities with proper Firebase service initialization
import type { Order, OrderItem, Coupon } from "./types"

export const createOrder = async (userId: string, items: OrderItem[], couponCode?: string) => {
  try {
    const { getFirestore } = await import("./firebase")
    const { collection, addDoc, query, where, getDocs } = await import("firebase/firestore")

    const db = await getFirestore()
    if (!db) {
      throw new Error("Firestore not available")
    }

    let discount = 0
    let coupon: Coupon | null = null

    // Apply coupon if provided
    if (couponCode) {
      const couponResult = await validateCoupon(couponCode, items)
      if (couponResult.isValid && couponResult.coupon) {
        coupon = couponResult.coupon
        discount = calculateDiscount(items, coupon)
      }
    }

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = subtotal * 0.05 // 5% tax
    const total = subtotal - discount + tax

    const orderData: Partial<Order> = {
      userId,
      items,
      subtotal,
      discount,
      tax,
      total,
      currency: "BDT",
      couponCode: coupon?.code,
      paymentStatus: "pending",
      orderStatus: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const docRef = await addDoc(collection(db, "orders"), orderData)
    return { orderId: docRef.id, order: orderData, error: null }
  } catch (error: any) {
    return { orderId: null, order: null, error: error.message }
  }
}

export const validateCoupon = async (code: string, items: OrderItem[]) => {
  try {
    const { getFirestore } = await import("./firebase")
    const { collection, query, where, getDocs } = await import("firebase/firestore")

    const db = await getFirestore()
    if (!db) {
      throw new Error("Firestore not available")
    }

    const q = query(collection(db, "coupons"), where("code", "==", code), where("isActive", "==", true))

    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      return { isValid: false, coupon: null, message: "Invalid coupon code" }
    }

    const coupon = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Coupon
    const now = new Date()

    // Check validity period
    if (now < coupon.validFrom || now > coupon.validUntil) {
      return { isValid: false, coupon: null, message: "Coupon has expired" }
    }

    // Check usage limit
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return { isValid: false, coupon: null, message: "Coupon usage limit exceeded" }
    }

    // Check minimum order amount
    const orderTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    if (coupon.minOrderAmount && orderTotal < coupon.minOrderAmount) {
      return {
        isValid: false,
        coupon: null,
        message: `Minimum order amount is ৳${coupon.minOrderAmount}`,
      }
    }

    return { isValid: true, coupon, message: "Coupon is valid" }
  } catch (error: any) {
    return { isValid: false, coupon: null, message: error.message }
  }
}

export const calculateDiscount = (items: OrderItem[], coupon: Coupon): number => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  let discount = 0
  if (coupon.type === "percentage") {
    discount = (subtotal * coupon.value) / 100
  } else {
    discount = coupon.value
  }

  // Apply maximum discount limit if set
  if (coupon.maxDiscountAmount && discount > coupon.maxDiscountAmount) {
    discount = coupon.maxDiscountAmount
  }

  return Math.min(discount, subtotal)
}

export const updatePaymentStatus = async (
  orderId: string,
  paymentStatus: Order["paymentStatus"],
  paymentMethod?: Order["paymentMethod"],
) => {
  try {
    const { getFirestore } = await import("./firebase")
    const { doc, updateDoc } = await import("firebase/firestore")

    const db = await getFirestore()
    if (!db) {
      throw new Error("Firestore not available")
    }

    const orderRef = doc(db, "orders", orderId)
    const updateData: any = {
      paymentStatus,
      updatedAt: new Date(),
    }

    if (paymentMethod) {
      updateData.paymentMethod = paymentMethod
    }

    if (paymentStatus === "completed") {
      updateData.orderStatus = "confirmed"
    }

    await updateDoc(orderRef, updateData)
    return { error: null }
  } catch (error: any) {
    return { error: error.message }
  }
}
