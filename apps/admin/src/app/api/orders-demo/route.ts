import { NextResponse } from "next/server";
import { listDemoOrders, pushDemoOrder } from "@/server/demo-orders-store";
import type { DemoOrderRow } from "@/server/demo-orders-store";

export const runtime = "nodejs";

export async function GET() {
  try {
    const orders = listDemoOrders();
    return NextResponse.json({ ok: true, source: "json-file-demo", orders });
  } catch (e) {
    return NextResponse.json(
      {
        ok: false,
        source: "json-file-demo",
        message: e instanceof Error ? e.message : String(e),
        orders: [],
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      customer_name: string;
      customer_phone: string;
      shipping_city: string;
      shipping_address: string;
      payment_method: string;
      items: Array<{ name: string; sku: string; quantity: number; unit_price_cents: number }>;
    };

    const now = new Date().toISOString();
    const totalCents = body.items.reduce((sum, i) => sum + i.unit_price_cents * i.quantity, 0);
    const id = `ORD-${Date.now().toString(36).toUpperCase()}`;

    const order: DemoOrderRow = {
      id,
      status: "placed",
      total_cents: totalCents,
      created_at: now,
      updated_at: now,
      customer_name: body.customer_name,
      customer_phone: body.customer_phone,
      shipping_city: body.shipping_city,
      shipping_address: body.shipping_address,
      payment_method: body.payment_method,
      items: body.items,
      status_history: [{ status: "placed", at: now, note: "ثبت از فروشگاه" }],
    };

    pushDemoOrder(order);
    return NextResponse.json({ ok: true, id });
  } catch (e) {
    return NextResponse.json(
      { ok: false, message: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    );
  }
}
