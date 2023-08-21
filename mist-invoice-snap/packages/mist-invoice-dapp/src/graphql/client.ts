import { createClient, dedupExchange, fetchExchange } from "urql";

import { ChainId, SUPPORTED_NETWORKS, getGraphUrl } from "../utils";

export const clients = SUPPORTED_NETWORKS.reduce(
  (o, chainId) => ({
    ...o,
    [chainId]: createClient({
      url: getGraphUrl(chainId),
      exchanges: [dedupExchange, fetchExchange],
    }),
  }),
  {},
) as Record<ChainId, ReturnType<typeof createClient>>;
