import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { toFetchResponse, toReqRes } from "fetch-to-node";
import {
  products,
  getCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  getOrder,
  getUserOrders,
  getUserMembership,
} from "@/lib/mock-data";

// Helper function for order status descriptions
function getStatusDescription(status: string): string {
  const descriptions: Record<string, string> = {
    pending: "Order received and awaiting processing",
    processing: "Order is being prepared for shipment",
    shipped: "Order has been shipped and is on its way",
    delivered: "Order has been delivered",
    cancelled: "Order has been cancelled",
  };
  return descriptions[status] || status;
}

// Create a new MCP server with all tools
function createServer() {
  const server = new McpServer({
    name: "ecommerce-mcp-server",
    version: "1.0.0",
  });

  // Tool: Search Products
  server.tool(
    "search_products",
    "Search for products by name, category, or description. Returns matching products with details.",
    {
      query: z.string().optional().describe("Search query for product name or description"),
      category: z.string().optional().describe("Filter by category (Electronics, Apparel, Accessories, Sports)"),
      inStockOnly: z.boolean().optional().default(false).describe("Only show products that are in stock"),
      maxPrice: z.number().optional().describe("Maximum price filter"),
      minRating: z.number().optional().describe("Minimum rating filter (1-5)"),
    },
    async ({ query, category, inStockOnly, maxPrice, minRating }) => {
      let results = [...products];

      if (query) {
        const lowerQuery = query.toLowerCase();
        results = results.filter(
          (p) =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.description.toLowerCase().includes(lowerQuery)
        );
      }

      if (category) {
        results = results.filter(
          (p) => p.category.toLowerCase() === category.toLowerCase()
        );
      }

      if (inStockOnly) {
        results = results.filter((p) => p.inStock);
      }

      if (maxPrice !== undefined) {
        results = results.filter((p) => p.price <= maxPrice);
      }

      if (minRating !== undefined) {
        results = results.filter((p) => p.rating >= minRating);
      }

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                count: results.length,
                products: results.map((p) => ({
                  id: p.id,
                  name: p.name,
                  price: `$${p.price.toFixed(2)}`,
                  category: p.category,
                  rating: `${p.rating}/5 (${p.reviews} reviews)`,
                  inStock: p.inStock,
                  stockCount: p.stockCount,
                })),
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // Tool: Get Product Details
  server.tool(
    "get_product",
    "Get detailed information about a specific product by its ID.",
    {
      productId: z.string().describe("The product ID (e.g., prod_001)"),
    },
    async ({ productId }) => {
      const product = products.find((p) => p.id === productId);

      if (!product) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify({ error: `Product not found: ${productId}` }),
            },
          ],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                ...product,
                price: `$${product.price.toFixed(2)}`,
                rating: `${product.rating}/5 (${product.reviews} reviews)`,
                availability: product.inStock
                  ? `In Stock (${product.stockCount} available)`
                  : "Out of Stock",
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // Tool: Get Cart
  server.tool(
    "get_cart",
    "Retrieve the current shopping cart contents for a user.",
    {
      userId: z.string().default("user_demo").describe("User ID (defaults to demo user)"),
    },
    async ({ userId }) => {
      const cart = getCart(userId);
      const cartWithProducts = cart.items.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return {
          ...item,
          product: product
            ? {
                name: product.name,
                price: `$${product.price.toFixed(2)}`,
                subtotal: `$${(product.price * item.quantity).toFixed(2)}`,
              }
            : null,
        };
      });

      const total = cart.items.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.productId);
        return sum + (product ? product.price * item.quantity : 0);
      }, 0);

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                cartId: cart.id,
                itemCount: cart.items.length,
                items: cartWithProducts,
                total: `$${total.toFixed(2)}`,
                updatedAt: cart.updatedAt,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // Tool: Add to Cart
  server.tool(
    "add_to_cart",
    "Add a product to the shopping cart.",
    {
      productId: z.string().describe("The product ID to add"),
      quantity: z.number().int().min(1).default(1).describe("Quantity to add"),
      userId: z.string().default("user_demo").describe("User ID (defaults to demo user)"),
    },
    async ({ productId, quantity, userId }) => {
      const product = products.find((p) => p.id === productId);

      if (!product) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify({ error: `Product not found: ${productId}` }),
            },
          ],
          isError: true,
        };
      }

      if (!product.inStock) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify({
                error: `Product is out of stock: ${product.name}`,
              }),
            },
          ],
          isError: true,
        };
      }

      const cart = addToCart(userId, productId, quantity);

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                success: true,
                message: `Added ${quantity}x "${product.name}" to cart`,
                cartItemCount: cart.items.length,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // Tool: Remove from Cart
  server.tool(
    "remove_from_cart",
    "Remove a product from the shopping cart.",
    {
      productId: z.string().describe("The product ID to remove"),
      userId: z.string().default("user_demo").describe("User ID (defaults to demo user)"),
    },
    async ({ productId, userId }) => {
      const cart = removeFromCart(userId, productId);
      const product = products.find((p) => p.id === productId);

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                success: true,
                message: `Removed "${product?.name || productId}" from cart`,
                cartItemCount: cart.items.length,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // Tool: Update Cart Quantity
  server.tool(
    "update_cart_quantity",
    "Update the quantity of a product in the cart.",
    {
      productId: z.string().describe("The product ID to update"),
      quantity: z.number().int().min(0).describe("New quantity (0 removes the item)"),
      userId: z.string().default("user_demo").describe("User ID (defaults to demo user)"),
    },
    async ({ productId, quantity, userId }) => {
      const cart = updateCartItemQuantity(userId, productId, quantity);
      const product = products.find((p) => p.id === productId);

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                success: true,
                message:
                  quantity > 0
                    ? `Updated "${product?.name || productId}" quantity to ${quantity}`
                    : `Removed "${product?.name || productId}" from cart`,
                cartItemCount: cart.items.length,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // Tool: Get Order Status
  server.tool(
    "get_order_status",
    "Check the status of a specific order by order ID.",
    {
      orderId: z.string().describe("The order ID (e.g., ord_001)"),
    },
    async ({ orderId }) => {
      const order = getOrder(orderId);

      if (!order) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify({ error: `Order not found: ${orderId}` }),
            },
          ],
          isError: true,
        };
      }

      const orderWithProducts = {
        ...order,
        items: order.items.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return {
            ...item,
            productName: product?.name || "Unknown Product",
            priceAtPurchase: `$${item.priceAtPurchase.toFixed(2)}`,
          };
        }),
        total: `$${order.total.toFixed(2)}`,
        statusDescription: getStatusDescription(order.status),
      };

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(orderWithProducts, null, 2),
          },
        ],
      };
    }
  );

  // Tool: List User Orders
  server.tool(
    "list_orders",
    "List all orders for a user.",
    {
      userId: z.string().default("user_demo").describe("User ID (defaults to demo user)"),
    },
    async ({ userId }) => {
      const userOrders = getUserOrders(userId);

      const orderSummaries = userOrders.map((order) => ({
        orderId: order.id,
        status: order.status,
        statusDescription: getStatusDescription(order.status),
        itemCount: order.items.length,
        total: `$${order.total.toFixed(2)}`,
        createdAt: order.createdAt,
        estimatedDelivery: order.estimatedDelivery,
      }));

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                orderCount: orderSummaries.length,
                orders: orderSummaries,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // Tool: Get User Membership
  server.tool(
    "get_membership",
    "Retrieve membership details for a user, including tier, benefits, points balance, and discount information.",
    {
      userId: z.string().default("user_demo").describe("User ID (defaults to demo user)"),
    },
    async ({ userId }) => {
      const membership = getUserMembership(userId);

      if (!membership) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify({
                error: `No membership found for user: ${userId}`,
                suggestion: "This user may not have a membership yet. Available demo users: user_demo, user_002, user_003, user_004",
              }),
            },
          ],
          isError: true,
        };
      }

      const tierDescriptions: Record<string, string> = {
        free: "Basic membership with points earning",
        silver: "Enhanced membership with modest discounts",
        gold: "Premium membership with great perks",
        platinum: "Top-tier membership with maximum benefits",
      };

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                userId: membership.userId,
                tier: membership.tier,
                tierDescription: tierDescriptions[membership.tier] || membership.tier,
                status: membership.status,
                startDate: membership.startDate,
                renewalDate: membership.renewalDate,
                benefits: membership.benefits,
                points: {
                  current: membership.pointsBalance,
                  lifetime: membership.lifetimePoints,
                },
                perks: {
                  discountPercent: `${membership.discountPercent}%`,
                  freeShipping: membership.freeShipping,
                  prioritySupport: membership.prioritySupport,
                },
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  return server;
}

// Handle MCP requests - create new transport for each request (stateless mode requirement)
export async function POST(request: Request) {
  try {
    // Check Accept header
    const accept = request.headers.get("accept") || "";
    if (!accept.includes("application/json") && !accept.includes("text/event-stream")) {
      return new Response(
        JSON.stringify({
          jsonrpc: "2.0",
          error: {
            code: -32000,
            message: "Not Acceptable: Client must accept both application/json and text/event-stream",
          },
          id: null,
        }),
        {
          status: 406,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Create fresh transport and server for each request (required for stateless mode)
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined, // Stateless mode
    });

    const server = createServer();
    await server.connect(transport);

    // Parse the request body
    const body = await request.json();

    // Convert to Node.js format and handle request
    const { req, res } = toReqRes(request);

    // Manually set the parsed body since we already consumed the stream
    (req as any).body = body;

    await transport.handleRequest(req, res, body);

    // Convert Node.js response back to Fetch Response
    return toFetchResponse(res);
  } catch (error) {
    console.error("MCP error:", error);
    return new Response(
      JSON.stringify({
        jsonrpc: "2.0",
        error: {
          code: -32603,
          message: error instanceof Error ? error.message : "Internal error",
        },
        id: null,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET() {
  return new Response(
    JSON.stringify({
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Method not allowed.",
      },
      id: null,
    }),
    {
      status: 405,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function DELETE() {
  // Session termination not needed in stateless mode
  return new Response(null, { status: 204 });
}
