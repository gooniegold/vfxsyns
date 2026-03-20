// Shopify Storefront API — get domain + token from Shopify Admin → Settings → Apps → Develop apps
// Create app → Configure Storefront API → copy Public Storefront access token
// Domain: your-store.myshopify.com (no https://)

const STOREFRONT_API_VERSION = "2024-10";

function getConfig() {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
  return { domain, token };
}

export function isShopifyConfigured(): boolean {
  const { domain, token } = getConfig();
  return Boolean(domain && token);
}

export async function shopifyFetch<T = unknown>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<{ data?: T; errors?: { message: string }[] }> {
  const { domain, token } = getConfig();
  if (!domain || !token) {
    throw new Error("Shopify environment variables are not set");
  }

  const res = await fetch(`https://${domain}/api/${STOREFRONT_API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });

  return res.json() as Promise<{ data?: T; errors?: { message: string }[] }>;
}

export type ShopifyProductNode = {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: { node: { url: string; altText?: string | null } }[] };
  variants: { edges: { node: { id: string } }[] };
};

type ProductsQuery = {
  products: { edges: { node: ShopifyProductNode }[] };
};

const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;

export async function getProducts(first = 20): Promise<ShopifyProductNode[]> {
  const json = await shopifyFetch<ProductsQuery>({
    query: PRODUCTS_QUERY,
    variables: { first },
  });
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  return json.data?.products.edges.map((e) => e.node) ?? [];
}

type CartCreateResponse = {
  cartCreate: {
    cart: { checkoutUrl: string; id: string } | null;
    userErrors: { field: string[]; message: string }[];
  };
};

const CART_CREATE = `
  mutation CartCreate($cartInput: CartInput!) {
    cartCreate(input: $cartInput) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function createCheckout(variantGid: string, quantity = 1) {
  const json = await shopifyFetch<CartCreateResponse>({
    query: CART_CREATE,
    variables: {
      cartInput: {
        lines: [{ merchandiseId: variantGid, quantity }],
      },
    },
  });

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }

  const payload = json.data?.cartCreate;
  if (payload?.userErrors?.length) {
    throw new Error(payload.userErrors.map((e) => e.message).join("; "));
  }

  const cart = payload?.cart;
  if (!cart?.checkoutUrl) {
    throw new Error("No checkout URL returned");
  }

  return cart;
}
