import { cookies } from "next/headers";
import { decodeJwt } from "jose";
import CreateEventForm from "@/components/CreatePageForm";

export default async function PaymentPage() {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  let claims = null;
  if (accessToken) {
    claims = decodeJwt(accessToken);
    console.log(claims);
  }

  return <CreateEventForm claims={claims} />;
}
