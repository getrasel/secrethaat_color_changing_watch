import { supabase } from "../lib/superbase";

export const ORDER_TABLE_NAME = "neworders";

export interface Order {
  id: number | string;
  created_at: string;
  name: string;
  phone: string;
  address: string;
  product: string;
  color?: string;
  quantity: number;
  price: number;
  shipping_amount: number;
  total_amount: number;
  status: string;
}

export interface CreateOrderInput {
  name: string;
  phone: string;
  address: string;
  product: string;
  color?: string;
  quantity: number;
  price: number;
  shipping_amount: number;
  total_amount: number;
  status?: string;
}

/**
 * Fetch all orders directly from Supabase (table: rasel_order)
 */
export const fetchOrdersFromSupabase = async (): Promise<{
  data: Order[] | null;
  error: any;
}> => {
  try {
    const { data, error } = await supabase
      .from(ORDER_TABLE_NAME)
      .select("*")
      .order("created_at", { ascending: false });

    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
};

/**
 * Create an order directly in Supabase (table: rasel_order)
 */
export const createSupabaseOrder = async (
  input: CreateOrderInput,
): Promise<{ data: Order | null; error: any }> => {
  try {
    const { data, error } = await supabase
      .from(ORDER_TABLE_NAME)
      .insert([
        {
          name: input.name,
          phone: input.phone,
          address: input.address,
          product: input.product,
          color: input.color,
          quantity: input.quantity,
          price: input.price,
          shipping_amount: input.shipping_amount,
          total_amount: input.total_amount,
          status: input.status || "pending",
        },
      ])
      .select();

    const created = data && data.length > 0 ? (data[0] as Order) : null;
    return { data: created, error };
  } catch (err) {
    return { data: null, error: err };
  }
};

/**
 * Update order status directly in Supabase (table: rasel_order)
 */
export const updateSupabaseOrderStatus = async (
  orderId: number | string,
  newStatus: string,
): Promise<{ error: any }> => {
  try {
    const { error } = await supabase
      .from(ORDER_TABLE_NAME)
      .update({ status: newStatus })
      .eq("id", orderId);

    return { error };
  } catch (err) {
    return { error: err };
  }
};

/**
 * Delete an order directly from Supabase (table: rasel_order)
 */
export const deleteSupabaseOrder = async (
  orderId: number | string,
): Promise<{ error: any }> => {
  try {
    const { error } = await supabase
      .from(ORDER_TABLE_NAME)
      .delete()
      .eq("id", orderId);

    return { error };
  } catch (err) {
    return { error: err };
  }
};
