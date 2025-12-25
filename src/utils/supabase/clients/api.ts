import { createServerClient } from "@supabase/ssr";
import { type NextApiRequest, type NextApiResponse } from "next";

export default function createApiClient(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        getAll() {
          return Object.entries(req.cookies).map(([name, value]) => ({
            name,
            value: value || "",
          }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.appendHeader(
              "Set-Cookie",
              `${name}=${value}; Path=/; ${
                options?.maxAge ? `Max-Age=${options.maxAge}; ` : ""
              }${options?.secure ? "Secure; " : ""}${
                options?.sameSite ? `SameSite=${options.sameSite}` : ""
              }`
            );
          });
        },
      },
    }
  );
}
