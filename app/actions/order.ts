"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. Customer Places Order
export async function placeOrder(data: any) {
  try {
    const { customerId, customerName, vendorId, items, total } = data;

    const newOrder = await prisma.order.create({
      data: {
        customerId,
        customerName,
        vendorId,
        totalAmount: total,
        status: "PENDING",
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            productName: item.name,
            price: item.price,
            quantity: item.cartQuantity,
            image: item.image
          }))
        }
      }
    });

    return { success: true, orderId: newOrder.id };
  } catch (error) {
    console.error("Order Error:", error);
    return { success: false, error: "Failed to place order" };
  }
}

// 2. Vendor Approves/Rejects Order
export async function updateOrderStatus(orderId: string, newStatus: "APPROVED" | "REJECTED") {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus }
    });
    
    // Refresh the vendor dashboard page so they see the new status immediately
    revalidatePath("/vendor/orders");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update status" };
  }
}