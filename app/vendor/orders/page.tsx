import React from "react";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { updateOrderStatus } from "@/app/actions/order"; // The action we made
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function VendorOrdersPage() {
  const { userId } = await auth();
  if (!userId) return <div>Please log in as vendor.</div>;

  // Fetch orders specifically for THIS logged-in vendor
  const orders = await prisma.order.findMany({
    where: { vendorId: userId },
    include: { items: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-[#00529b] mb-8">Manage Orders</h1>

      <div className="space-y-6 max-w-5xl mx-auto">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            
            {/* Order Header */}
            <div className="flex justify-between items-start mb-4 border-b pb-4">
              <div>
                <h3 className="font-bold text-lg">Order #{order.id.slice(-6)}</h3>
                <p className="text-sm text-gray-500">Customer: {order.customerName}</p>
                <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              
              {/* STATUS BADGE */}
              <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${
                order.status === "APPROVED" ? "bg-green-100 text-green-700" :
                order.status === "REJECTED" ? "bg-red-100 text-red-700" :
                "bg-yellow-100 text-yellow-800"
              }`}>
                {order.status}
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-3 mb-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 text-sm">
                   <div className="relative w-10 h-10 bg-gray-100 rounded">
                      {item.image && <Image src={item.image} fill className="object-cover" alt={item.productName}/>}
                   </div>
                   <div className="flex-1">
                     <span className="font-semibold">{item.productName}</span>
                     <span className="text-gray-500"> x {item.quantity}</span>
                   </div>
                   <span className="font-bold">₹{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="text-right font-bold text-lg border-t pt-2 mt-2">
                Total: ₹{order.totalAmount}
              </div>
            </div>

            {/* ACTION BUTTONS (Only show if Pending) */}
            {order.status === "PENDING" && (
              <div className="flex gap-4 justify-end">
                {/* REJECT FORM */}
                <form action={async () => {
                  "use server";
                  await updateOrderStatus(order.id, "REJECTED");
                }}>
                  <button className="px-6 py-2 border border-red-200 text-red-600 font-bold rounded-lg hover:bg-red-50">
                    Reject
                  </button>
                </form>

                {/* APPROVE FORM */}
                <form action={async () => {
                  "use server";
                  await updateOrderStatus(order.id, "APPROVED");
                }}>
                  <button className="px-6 py-2 bg-[#00529b] text-white font-bold rounded-lg hover:bg-blue-800 shadow-md">
                    Approve Order
                  </button>
                </form>
              </div>
            )}
          </div>
        ))}

        {orders.length === 0 && (
          <p className="text-center text-gray-500">No orders received yet.</p>
        )}
      </div>
    </div>
  );
}