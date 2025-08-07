import DetailEventClient from "@/components/DetailEventClient";
import { cookies } from "next/headers";
import { decodeJwt } from "jose";

export default async function DetailEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  // Fetch data event berdasarkan id
  const res = await fetch(`http://localhost:8000/api/event/${id}`);
  const event = await res.json();
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  let claims = null;
  if (accessToken) {
    claims = decodeJwt(accessToken);
    console.log(claims);
  }

  return <DetailEventClient claims={claims} event={event} />;
}
