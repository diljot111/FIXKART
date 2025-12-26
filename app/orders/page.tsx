import React from "react";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { Package, Clock, CheckCircle, XCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CustomerOrdersPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-xl font-bold mb-4">Please sign in to view your orders.</h1>
        <Link href="/" className="text-[#00529b] underline">Go Home</Link>
      </div>
    );
  }

  // Fetch orders for THIS logged-in customer
  const orders = await prisma.order.findMany({
    where: { customerId: userId },
    include: { items: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <Package className="text-[#00529b]" /> My Orders
        </h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              
              {/* STATUS BAR */}
              <div className="bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Order Placed</p>
                  <p className="font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                   <p className="text-xs text-gray-500 uppercase tracking-wide">Total</p>
                   <p className="font-bold text-[#00529b]">₹{order.totalAmount.toLocaleString("en-IN")}</p>
                </div>
                
                {/* --- CONFIRMATION INDICATOR --- */}
                <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm ${
                  order.status === "APPROVED" ? "bg-green-100 text-green-700" :
                  order.status === "REJECTED" ? "bg-red-100 text-red-700" :
                  "bg-yellow-100 text-yellow-800"
                }`}>
                  {order.status === "APPROVED" && <CheckCircle size={16} />}
                  {order.status === "REJECTED" && <XCircle size={16} />}
                  {order.status === "PENDING" && <Clock size={16} />}
                  
                  {order.status === "APPROVED" ? "CONFIRMED" : order.status}
                </div>
              </div>

              {/* ORDER ITEMS */}
              <div className="p-6">
                 {order.items.map((item) => (
                   <div key={item.id} className="flex items-center gap-4 mb-4 last:mb-0">
                      <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden border border-gray-200 flex-shrink-0">
                         <Image 
                           src={item.image || "https://placehold.co/200?text=No+Image"} 
                           alt={item.productName} 
                           fill 
                           className="object-contain p-1"
                           unoptimized
                         />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 line-clamp-1">{item.productName}</h3>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-gray-900">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                   </div>
                 ))}
              </div>

              {/* FOOTER MESSAGE */}
              {order.status === "APPROVED" && (
                <div className="bg-green-50 px-6 py-3 text-sm text-green-800 flex items-center gap-2 border-t border-green-100">
                   <Package size={16} /> 
                   <strong>Status:</strong> Your order has been confirmed and is being packed by the vendor.
                </div>
              )}
            </div>
          ))}

          {orders.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
              <Package size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-bold text-gray-900">No orders found</h3>
              <p className="text-gray-500 mb-6">Looks like you haven't bought anything yet.</p>
              <Link href="/" className="bg-[#00529b] text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-800 transition-colors">
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}