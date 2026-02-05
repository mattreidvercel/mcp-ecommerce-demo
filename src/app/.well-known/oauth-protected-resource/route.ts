// OAuth Protected Resource Metadata endpoint
// This endpoint allows MCP clients to discover how to authorize with your server
// See: https://datatracker.ietf.org/doc/html/rfc9728

export async function GET(request: Request) {
  // Get the origin from the request
  const url = new URL(request.url);
  const origin = `${url.protocol}//${url.host}`;

  // For demo purposes, we return a placeholder auth server URL
  // In production, replace with your actual OAuth authorization server
  const metadata = {
    resource: origin,
    authorization_servers: ["https://demo.example.com/oauth"],
    bearer_methods_supported: ["header"],
    scopes_supported: ["read:products", "write:cart", "read:orders"],
  };

  return new Response(JSON.stringify(metadata), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
