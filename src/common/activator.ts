import { PRODUCT_LINK } from "../constant";

const URL = "https://api.gumroad.com/v2/licenses/verify";

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

export async function activate(
  licenseKey: string,
): Promise<{ message: string; success: boolean }> {
  if (!licenseKey) return { message: "", success: false };

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
      : "succeed"
    : res.message;

  return { message, success };
}

function getPermalink(productLink: string) {
  const [, permalink] = productLink.split("#");
  return permalink;
}
