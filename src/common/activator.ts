import { PRODUCT_LINK } from "../constant";

const URL = "https://api.gumroad.com/v2/licenses/verify";
const ACTIVATION_INTERVAL = 10 * 1000;

interface IGumroadRequest {
  product_permalink: string;
  license_key: string;
  increment_uses_count: boolean;
}

interface IGumroadResponseSucceed {
  purchase: {
    chargebacked: boolean;
    refunded: boolean;
  };
  uses: number;
  success: true;
}

interface IGumroadResponseFailed {
  message: string;
  success: false;
}

type GumroadResponse = IGumroadResponseSucceed | IGumroadResponseFailed;

interface IActivationRequest {
  licenseKey: string;
  lastActivationReqTs: number | null;
  isUser?: boolean; // user request activation
}

interface IActivationResponse {
  message: string;
  success: boolean;
  timestamp: number | null;
}

export async function activate({
  licenseKey,
  lastActivationReqTs,
  isUser = false,
}: IActivationRequest): Promise<IActivationResponse> {
  if (!licenseKey) {
    return { message: "", success: false, timestamp: null };
  }

  const now = new Date().valueOf();
  const diff = now - (lastActivationReqTs ?? now);
  const wait = diff < ACTIVATION_INTERVAL;

  if (wait && !isUser) {
    return { message: "", success: true, timestamp: null };
  }

  const headers = new Headers();
  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");

  const productPermalink = getPermalink(PRODUCT_LINK);

  const response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify({
      product_permalink: productPermalink,
      license_key: licenseKey,
      increment_uses_count: false,
    } as IGumroadRequest),
    headers,
  });

  const res: GumroadResponse = await response.json();

  const success = res.success
    ? res.purchase.refunded === false && res.purchase.chargebacked === false
    : false;
  const message = res.success
    ? res.purchase.refunded || res.purchase.chargebacked
      ? "Refunded or charge backed"
      : "Succeed"
    : res.message;

  return { message, success, timestamp: now };
}

function getPermalink(productLink: string) {
  return productLink.split("/").pop();
}
