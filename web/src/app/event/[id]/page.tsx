import DetailEventClient from "@/components/DetailEventClient";

export default async function DetailEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  // Fetch data event berdasarkan id
  const res = await fetch(`http://localhost:8000/api/event/${id}`);
  const event = await res.json();

  return <DetailEventClient event={event} />;
}
