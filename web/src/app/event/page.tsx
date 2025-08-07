import { cookies } from "next/headers";
import { decodeJwt } from "jose";
import EventsPage from "@/components/EventPage";

export default async function Event() {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  let claims = null;
  if (accessToken) {
    claims = decodeJwt(accessToken);
    console.log(claims);
  }

  return <EventsPage claims={claims} />;
}
