import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reserve with DreamedTrip",
  description:
    "Secure your transport, accommodation and activities in one place.",
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
