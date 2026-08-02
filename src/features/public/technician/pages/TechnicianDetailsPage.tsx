import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, Briefcase, MapPin, Star, Zap } from "lucide-react";
import {
  AppButton,
  AppSlider,
  DetailsSection,
  ProfileBanner,
  ProfileChips,
  ReviewCard,
  ScheduleBoard,
  TechnicianCard,
  Text,
} from "@/src/components";
import { getMeRequest } from "@/src/features/auth/dependencies/api/auth.service";
import {
  DAY_LABEL,
  DAY_ORDER,
  formatRange,
  toPublicWeekSchedule,
} from "@/src/features/dashboard/availability/dependencies/utils/availability.utils";
import BookNowButton from "@/src/features/public/home/dependencies/components/BookNowButton";
import { formatMoney } from "@/src/lib/utils/format.utils";
import {
  getTechnicianById,
  getTechnicians,
} from "../dependencies/api/technician.api";
import TechnicianServicesTable from "../dependencies/components/TechnicianServicesTable";

const FEATURED_ASIDE_COUNT = 3;
const REVIEWS_PER_SLIDE = 2;

const TechnicianDetailsPage = async ({ id }: { id: string }) => {
  const [technician, featured, currentUser] = await Promise.all([
    getTechnicianById(id),
    getTechnicians({
      featured: true,
      sort: "top_rated",
      page: 1,
      limit: FEATURED_ASIDE_COUNT + 1,
    }),
    getMeRequest(),
  ]);

  if (!technician) notFound();

  const week = toPublicWeekSchedule(technician.availability);
  const fullName = `${technician.firstName} ${technician.lastName}`;

  // The profile being read never appears in its own sidebar.
  const otherFeatured = featured.items
    .filter((entry) => entry.id !== technician.id)
    .slice(0, FEATURED_ASIDE_COUNT);

  // Two reviews per slide, stacked.
  const reviewPages = technician.reviews.reduce<
    (typeof technician.reviews)[]
  >((pages, review, index) => {
    if (index % REVIEWS_PER_SLIDE === 0) pages.push([]);
    pages[pages.length - 1].push(review);
    return pages;
  }, []);

  return (
    <section className="mx-auto max-w-7xl space-y-4 px-4 py-10 sm:px-6 xl:px-8">
      <ProfileBanner
        name={fullName}
        title={technician.professionalTitle}
        eyebrow="Technician"
        avatar={technician.avatar}
        coverImage={technician.coverImage}
        badges={
          <>
            {technician.isVerified && (
              <span className="flex items-center gap-1 border border-project-primary/30 bg-project-muted-primary px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-project-primary">
                <BadgeCheck className="size-3" />
                Verified
              </span>
            )}

            {technician.offersEmergencyService && (
              <span className="flex items-center gap-1 border border-project-yellow/35 bg-project-yellow/10 px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-project-yellow">
                <Zap className="size-3" />
                Emergency
              </span>
            )}

            {technician.isFeatured && (
              <span className="border border-project-primary/30 bg-project-primary px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-project-primary-foreground">
                Featured
              </span>
            )}
          </>
        }
        metaItems={[
          {
            icon: Star,
            label: "Rating",
            value: `${technician.averageRating} (${technician.totalReviews} reviews)`,
          },
          {
            icon: Briefcase,
            label: "Experience",
            value: `${technician.experienceYears} years experience`,
          },
          {
            icon: MapPin,
            label: "Location",
            value: `${technician.area}, ${technician.city}`,
          },
        ]}
      />

      <div className="grid min-w-0 gap-4 lg:grid-cols-3">
        <div className="flex min-w-0 flex-col gap-4 lg:col-span-2">
          <DetailsSection title="Background">
            {technician.tagline && (
              <blockquote className="mb-5 border-l-2 border-project-primary bg-project-muted/40 px-5 py-4">
                <Text
                  variant="normal-base"
                  as="p"
                  className="italic text-project-muted-foreground"
                >
                  “{technician.tagline}”
                </Text>
              </blockquote>
            )}

            {technician.bio.length === 0 ? (
              <Text
                variant="normal-sm"
                as="p"
                className="text-project-muted-foreground"
              >
                This technician has not written a bio yet.
              </Text>
            ) : (
              <div className="space-y-4">
                {technician.bio.map((paragraph) => (
                  <Text
                    key={paragraph}
                    variant="normal-sm"
                    as="p"
                    className="leading-relaxed text-project-foreground"
                  >
                    {paragraph}
                  </Text>
                ))}
              </div>
            )}
          </DetailsSection>

          <div className="grid gap-4 sm:grid-cols-2">
            <DetailsSection title="Specialties" className="h-fit">
              <ProfileChips
                items={technician.skills}
                emptyMessage="No skill listed yet."
              />
            </DetailsSection>

            <DetailsSection title="How they work" className="h-fit">
              <ProfileChips
                items={technician.workHighlights}
                variant="check"
                emptyMessage="No highlight listed yet."
                className="sm:grid-cols-1"
              />
            </DetailsSection>
          </div>

          <DetailsSection
            title="Services offered"
            description="Every listing this technician is taking bookings for."
          >
            <TechnicianServicesTable services={technician.services} />
          </DetailsSection>

          <DetailsSection
            title="Working hours"
            description="The week you can book from."
          >
            <ScheduleBoard
              days={DAY_ORDER.map((day) => ({
                id: day,
                label: DAY_LABEL[day],
                ranges: week[day].isActive
                  ? week[day].ranges.map(formatRange)
                  : [],
              }))}
              className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7"
            />
          </DetailsSection>

          {technician.reviews.length === 0 ? (
            <DetailsSection title="Reviews">
              <Text
                variant="normal-sm"
                as="p"
                className="text-project-muted-foreground"
              >
                No published review yet.
              </Text>
            </DetailsSection>
          ) : (
            <div className="min-w-0 border border-project-border bg-project-card px-5 py-5">
              <AppSlider
                label={`Reviews for ${fullName}`}
                bullets={false}
                controlsLabel="Latest reviews"
                controlsAlign="between"
                controlsPosition="top"
                spaceBetween={16}
              >
                {reviewPages.map((page) => (
                  <div key={page[0].id} className="flex flex-col gap-3">
                    {page.map((review) => (
                      <ReviewCard
                        key={review.id}
                        entry={{
                          id: review.id,
                          rating: review.rating,
                          comment: review.comment.join("\n\n"),
                          createdAt: review.createdAt,
                          author: review.customer.name,
                          authorAvatar: review.customer.avatar,
                          subject: review.service.title,
                        }}
                      />
                    ))}
                  </div>
                ))}
              </AppSlider>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <DetailsSection title="Book this technician" className="h-fit">
            <div className="space-y-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <Text
                    variant="semibold-3xl"
                    as="p"
                    className="tabular-nums text-project-primary"
                  >
                    {formatMoney(technician.hourlyRate)}
                  </Text>

                  <Text
                    variant="normal-xs"
                    as="span"
                    className="text-project-muted-foreground"
                  >
                    per hour
                  </Text>
                </div>

                <span
                  className={
                    technician.isAvailable
                      ? "border border-project-success/30 bg-project-success/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-project-success"
                      : "border border-project-border bg-project-muted px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-project-muted-foreground"
                  }
                >
                  {technician.isAvailable ? "Taking work" : "Fully booked"}
                </span>
              </div>

              {technician.serviceRadius && (
                <Text
                  variant="normal-sm"
                  as="p"
                  className="text-project-muted-foreground"
                >
                  Travels up to {technician.serviceRadius} km from{" "}
                  {technician.area}.
                </Text>
              )}

              <BookNowButton userRole={currentUser?.role} className="w-full" />

              <Text
                variant="normal-xs"
                as="p"
                className="text-center text-project-muted-foreground"
              >
                Payment is held until you approve the finished job.
              </Text>
            </div>
          </DetailsSection>

          {otherFeatured.length > 0 && (
            <DetailsSection
              title="Featured listing"
              description="Other technicians customers are booking right now."
              className="h-fit"
            >
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                {otherFeatured.map((entry) => (
                  <TechnicianCard
                    key={entry.id}
                    technician={entry}
                    layout="stacked"
                    className="sm:p-5"
                    bookAction={
                      <BookNowButton
                        userRole={currentUser?.role}
                        variant="outline"
                      />
                    }
                  />
                ))}
              </div>

              <AppButton
                text="View all technicians"
                href="/technicians"
                rightIcon={ArrowRight}
                variant="outline"
                className="mt-4 w-full"
              />
            </DetailsSection>
          )}
        </div>
      </div>
    </section>
  );
};

export default TechnicianDetailsPage;
