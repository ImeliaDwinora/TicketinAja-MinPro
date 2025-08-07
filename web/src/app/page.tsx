import { cookies } from "next/headers";
import { decodeJwt } from "jose";
import Home from "@/components/homepage";

export default async function HomePage() {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  let claims = null;
  if (accessToken) {
    claims = decodeJwt(accessToken);
    console.log(claims);
  }

  return <Home claims={claims} />;
}
