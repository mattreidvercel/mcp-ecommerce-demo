import {
  ShoppingCart,
  Search,
  Package,
  Zap,
  Shield,
  Globe,
  Terminal,
  Code,
  ExternalLink,
  Check,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { CopyButton } from "@/components/copy-button";

const tools = [
  {
    name: "search_products",
    description: "Search products by name, category, price, or rating",
    icon: Search,
  },
  {
    name: "get_product",
    description: "Get detailed information about a specific product",
    icon: Package,
  },
  {
    name: "get_cart",
    description: "View current shopping cart contents",
    icon: ShoppingCart,
  },
  {
    name: "add_to_cart",
    description: "Add products to the shopping cart",
    icon: ShoppingCart,
  },
  {
    name: "remove_from_cart",
    description: "Remove products from the cart",
    icon: ShoppingCart,
  },
  {
    name: "update_cart_quantity",
    description: "Update the quantity of items in the cart",
    icon: ShoppingCart,
  },
  {
    name: "get_order_status",
    description: "Check the status and tracking of orders",
    icon: Package,
  },
  {
    name: "list_orders",
    description: "List all orders for a user",
    icon: Package,
  },
  {
    name: "get_membership",
    description: "Get membership tier, benefits, and points balance",
    icon: Crown,
  },
];

const vercelBenefits = [
  {
    title: "Fluid Compute",
    description:
      "Handles MCP's irregular usage patterns with optimized concurrency, dynamic scaling, and instance sharing. Pay only for what you use.",
    icon: Zap,
  },
  {
    title: "Built-in OAuth",
    description:
      "Secure your MCP server with built-in OAuth support. Verify tokens and protect your tools from unauthorized access.",
    icon: Shield,
  },
  {
    title: "Global Edge Network",
    description:
      "Deploy close to your users with Vercel's global edge network for low-latency MCP interactions.",
    icon: Globe,
  },
  {
    title: "Instant Rollback",
    description:
      "Quickly revert to previous deployments if issues arise. Zero downtime updates.",
    icon: Zap,
  },
];

export default function Home() {
  const mcpUrl = "https://mcp-ecommerce-demo.vercel.app/api/mcp";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            <span className="font-semibold text-lg">Ecommerce MCP</span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary">Demo</Badge>
            <Button variant="outline" size="sm" asChild>
              <a
                href="https://vercel.com/docs/mcp/deploy-mcp-servers-to-vercel"
                target="_blank"
                rel="noopener noreferrer"
              >
                Docs
                <ExternalLink className="ml-2 h-3 w-3" />
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <Badge className="mb-4" variant="outline">
              Model Context Protocol
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Ecommerce MCP Server
              <br />
              <span className="text-muted-foreground">on Vercel</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A demo MCP server with ecommerce tools. Connect from Cursor,
              Claude, or any MCP client to search products, manage carts, and
              track orders using natural language.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="#connect">Connect Now</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#tools">View Tools</a>
              </Button>
            </div>
          </div>
        </section>

        <Separator />

        {/* Why Vercel Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Why Deploy MCP Servers on Vercel?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Vercel provides the ideal infrastructure for production MCP
                deployments with features designed for AI workloads.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {vercelBenefits.map((benefit) => (
                <Card key={benefit.title}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <benefit.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{benefit.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Separator />

        {/* Available Tools Section */}
        <section id="tools" className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Available MCP Tools</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                This demo server exposes 9 ecommerce tools that AI assistants
                can use to help users shop.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool) => (
                <Card key={tool.name} className="hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <tool.icon className="h-4 w-4 text-muted-foreground" />
                      <CardTitle className="text-sm font-mono">
                        {tool.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {tool.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Separator />

        {/* Connect Section */}
        <section id="connect" className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Connect to This Server</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Use the MCP Inspector to test locally, or configure your favorite
                MCP client to connect.
              </p>
            </div>

            <Tabs defaultValue="inspector" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="inspector">MCP Inspector</TabsTrigger>
                <TabsTrigger value="cursor">Cursor</TabsTrigger>
                <TabsTrigger value="claude">Claude Code</TabsTrigger>
              </TabsList>

              <TabsContent value="inspector" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Terminal className="h-5 w-5" />
                      Test with MCP Inspector
                    </CardTitle>
                    <CardDescription>
                      The official tool for testing MCP servers
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">
                        1. Run the inspector:
                      </p>
                      <div className="relative">
                        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                          npx @anthropic-ai/mcp-inspector
                        </pre>
                        <CopyButton text="npx @anthropic-ai/mcp-inspector" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">
                        2. Open{" "}
                        <code className="bg-muted px-1.5 py-0.5 rounded text-sm">
                          http://127.0.0.1:6274
                        </code>{" "}
                        in your browser
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">
                        3. Connect with these settings:
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                        <li>
                          <Check className="h-3 w-3 inline mr-2" />
                          Transport: <strong>Streamable HTTP</strong>
                        </li>
                        <li>
                          <Check className="h-3 w-3 inline mr-2" />
                          URL:{" "}
                          <code className="bg-muted px-1.5 py-0.5 rounded">
                            /api/mcp
                          </code>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">
                        4. Click &quot;List Tools&quot; and test any tool!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cursor" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Configure Cursor
                    </CardTitle>
                    <CardDescription>
                      Add to your Cursor MCP configuration
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">
                        Add to{" "}
                        <code className="bg-muted px-1.5 py-0.5 rounded text-sm">
                          .cursor/mcp.json
                        </code>
                        :
                      </p>
                      <div className="relative">
                        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "mcpServers": {
    "ecommerce": {
      "url": "${mcpUrl}"
    }
  }
}`}
                        </pre>
                        <CopyButton
                          text={`{
  "mcpServers": {
    "ecommerce": {
      "url": "${mcpUrl}"
    }
  }
}`}
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        After adding, restart Cursor and the ecommerce tools will
                        be available in AI chat.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="claude" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Terminal className="h-5 w-5" />
                      Configure Claude Code
                    </CardTitle>
                    <CardDescription>
                      Add to your Claude Code MCP settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">
                        Add to{" "}
                        <code className="bg-muted px-1.5 py-0.5 rounded text-sm">
                          ~/.claude/settings.json
                        </code>
                        :
                      </p>
                      <div className="relative">
                        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "mcpServers": {
    "ecommerce": {
      "type": "url",
      "url": "${mcpUrl}"
    }
  }
}`}
                        </pre>
                        <CopyButton
                          text={`{
  "mcpServers": {
    "ecommerce": {
      "type": "url",
      "url": "${mcpUrl}"
    }
  }
}`}
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Restart Claude Code to pick up the new MCP server
                        configuration.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <Separator />

        {/* Authentication Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Authentication</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                This demo server supports optional OAuth authentication. In
                production, you&apos;d integrate with your auth provider.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  OAuth Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Demo Mode</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      For testing, this server accepts:
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>
                        <code className="bg-muted px-1.5 py-0.5 rounded">
                          demo-token
                        </code>{" "}
                        - Demo bearer token
                      </li>
                      <li>
                        <code className="bg-muted px-1.5 py-0.5 rounded">
                          sk-*
                        </code>{" "}
                        - Any token starting with sk-
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Production</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      In production, integrate with:
                    </p>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>Auth0, Clerk, or Okta</li>
                      <li>Custom OAuth server</li>
                      <li>API key validation</li>
                    </ul>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium mb-2">
                    OAuth Metadata Endpoint:
                  </p>
                  <code className="bg-muted px-3 py-2 rounded text-sm block">
                    /.well-known/oauth-protected-resource
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Code Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">See the Code</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Building an MCP server on Vercel is straightforward. Here&apos;s
                the core pattern.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-mono">
                  app/api/mcp/route.ts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`import { z } from 'zod';
import { createMcpHandler, withMcpAuth } from 'mcp-handler';

const handler = createMcpHandler(
  (server) => {
    server.tool(
      'search_products',
      'Search for products',
      { query: z.string() },
      async ({ query }) => {
        // Your search logic here
        return {
          content: [{ type: 'text', text: JSON.stringify(results) }],
        };
      },
    );
  },
  { name: 'ecommerce-mcp', version: '1.0.0' },
  { basePath: '/api' },
);

// Optional: Add authentication
const authHandler = withMcpAuth(handler, verifyToken, {
  required: false,
  resourceMetadataPath: '/.well-known/oauth-protected-resource',
});

export { authHandler as GET, authHandler as POST, authHandler as DELETE };`}
                </pre>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <Button variant="outline" asChild>
                <a
                  href="https://vercel.com/docs/mcp/deploy-mcp-servers-to-vercel"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the Full Guide
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Built with Next.js and deployed on Vercel
          </p>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <a
                href="https://vercel.com/docs/mcp"
                target="_blank"
                rel="noopener noreferrer"
              >
                MCP Docs
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a
                href="https://modelcontextprotocol.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                MCP Spec
              </a>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
