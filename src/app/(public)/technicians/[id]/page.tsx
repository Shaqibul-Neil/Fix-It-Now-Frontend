import type { Metadata } from "next";
import { getTechnicianById } from "@/src/features/public/technician/dependencies/api/technician.api";
import TechnicianDetailsPage from "@/src/features/public/technician/pages/TechnicianDetailsPage";

type TRouteProps = { params: Promise<{ id: string }> };

export async function generateMetadata({
  params,
}: TRouteProps): Promise<Metadata> {
  const { id } = await params;
  const technician = await getTechnicianById(id);

  if (!technician) return { title: "Technician not found" };

  const fullName = `${technician.firstName} ${technician.lastName}`;
  const role = technician.professionalTitle ?? "Verified technician";
  const title = `${fullName} — ${role} in ${technician.city}`;
  const description =
    technician.tagline ??
    technician.bio[0] ??
    `Book ${fullName}, a verified technician in ${technician.area}, ${technician.city}. ${technician.experienceYears} years of experience, rated ${technician.averageRating} by ${technician.totalReviews} customers.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/technicians/${technician.id}` },
    openGraph: {
      type: "profile",
      url: `/technicians/${technician.id}`,
      title,
      description,
      images: technician.avatar ? [{ url: technician.avatar }] : undefined,
    },
  };
}

export default async function TechnicianDetailsRoute({ params }: TRouteProps) {
  const { id } = await params;

  return <TechnicianDetailsPage id={id} />;
}
