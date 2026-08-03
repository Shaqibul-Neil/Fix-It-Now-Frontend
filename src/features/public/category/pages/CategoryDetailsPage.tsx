import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, MapPin, Star } from "lucide-react";
import { AppAvatar, PageHeader, ScrollReveal, Text } from "@/src/components";
import { formatMaintenance, formatMoney } from "@/src/lib/utils/format.utils";
import { getCategoryBySlug } from "../dependencies/api/category.api";

const CategoryDetailsPage = async ({ slug }: { slug: string }) => {
  const category = await getCategoryBySlug(slug);

  if (!category) notFound();

  const maintenanceNote = formatMaintenance(
    category.maintenanceType,
    category.maintenanceIntervalDays,
  );

  const heroStats = [
    {
      id: "technicians",
      value: category.technicianCount,
      label: "Verified technicians",
    },
    { id: "services", value: category.serviceCount, label: "Live services" },
    {
      id: "jobs",
      value: category.completedJobs.toLocaleString(),
      label: "Jobs completed",
    },
    { id: "rating", value: category.averageRating, label: "Average rating" },
    {
      id: "response",
      value: category.responseMinutes ? `${category.responseMinutes} min` : "—",
      label: "Median response",
    },
  ];

  return (
    // Lets the hero run under the navbar, which turns transparent over it.
    <div className="-mt-18">
      <section
        data-navbar-overlay
        className="relative isolate flex min-h-[70svh] items-end overflow-hidden bg-project-aside text-project-aside-foreground"
      >
        {category.coverImage && (
          <Image
            src={category.coverImage}
            alt={category.name}
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover"
          />
        )}

        <span
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-black/90 via-black/55 to-black/30"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-32 pb-10 sm:px-6 xl:px-8">
          <PageHeader
            textVariant="hero"
            eyebrow={`Category — ${category.technicianCount} technicians available`}
            title={category.name}
            description={category.tagline}
            divClassName="mb-0"
            eyebrowClassName="text-project-aside-primary"
            textClassName="text-current"
            descriptionClassName="max-w-xl text-white/80"
          />

          <dl className="mt-10 grid grid-cols-2 gap-y-6 border-t border-white/20 pt-6 sm:grid-cols-3 lg:grid-cols-5">
            {heroStats.map((stat) => (
              <div key={stat.id} className="min-w-0">
                <dt className="sr-only">{stat.label}</dt>

                <dd>
                  <Text
                    variant="semibold-2xl"
                    as="span"
                    className="block tabular-nums text-project-aside-primary"
                  >
                    {stat.value}
                  </Text>

                  <Text
                    variant="medium-xs"
                    as="span"
                    className="mt-1 block uppercase tracking-[0.16em] text-white/60"
                  >
                    {stat.label}
                  </Text>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
        <ScrollReveal className="grid gap-10 border-b border-project-border py-16 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <PageHeader
            as="h2"
            textVariant="section"
            eyebrow="What this covers"
            title={`${category.name} work, priced before anyone knocks`}
            description={
              category.priceRange
                ? `Rates in this category run from ${formatMoney(category.priceRange.min)} to ${formatMoney(category.priceRange.max)} depending on the job.`
                : "Every quote is fixed before the technician sets off, so nothing moves once the job starts."
            }
            action={{
              text: `Book a ${category.name.toLowerCase()} technician`,
              href: `/technicians?categoryIds=${category.id}`,
              rightIcon: ArrowRight,
            }}
            divClassName="mb-0 h-fit md:flex-col md:items-start"
            descriptionClassName="text-sm"
          />

          <div className="space-y-6">
            {/* Says in words how often this trade comes round, so a customer
                never has to read a schedule to work it out. */}
            {maintenanceNote && (
              <Text
                variant="normal-sm"
                as="p"
                className="border-l-2 border-project-primary pl-4 text-project-muted-foreground"
              >
                {maintenanceNote}
              </Text>
            )}

            {category.overview.map((paragraph) => (
              <Text
                key={paragraph}
                variant="normal-base"
                as="p"
                className="leading-relaxed text-project-foreground"
              >
                {paragraph}
              </Text>
            ))}

            <ol className="grid gap-x-8 sm:grid-cols-2">
              {category.commonIssues.map((issue, index) => (
                <li
                  key={issue}
                  className="flex items-baseline gap-3 border-b border-project-border py-3"
                >
                  <Text
                    variant="medium-xs"
                    as="span"
                    className="shrink-0 tabular-nums text-project-primary"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </Text>

                  <Text
                    variant="normal-sm"
                    as="span"
                    className="text-project-foreground"
                  >
                    {issue}
                  </Text>
                </li>
              ))}
            </ol>
          </div>
        </ScrollReveal>

        {category.topTechnicians.length > 0 && (
          <section className="border-b border-project-border py-16">
            <ScrollReveal>
              <PageHeader
                as="h2"
                textVariant="section"
                eyebrow="Ranked by rating and jobs done"
                title={`Top ${category.name.toLowerCase()} technicians`}
                action={{
                  text: "See all",
                  href: `/technicians?categoryIds=${category.id}`,
                  variant: "outline",
                  rightIcon: ArrowRight,
                }}
                divClassName="mb-8 gap-4 md:items-end"
              />
            </ScrollReveal>

            <ScrollReveal className="border-t border-project-border">
              {category.topTechnicians.map((technician, index) => (
                <Link
                  key={technician.id}
                  href={`/technicians/${technician.id}`}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-project-border py-5 transition-colors hover:bg-project-muted/50 sm:grid-cols-[3rem_1.6fr_1fr_auto_auto] sm:gap-6"
                >
                  <Text
                    variant="semibold-2xl"
                    as="span"
                    className="tabular-nums text-project-muted-foreground transition-colors group-hover:text-project-primary"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </Text>

                  <div className="flex min-w-0 items-center gap-3">
                    <AppAvatar
                      src={technician.avatar}
                      name={technician.name}
                      className="size-11 shrink-0"
                    />

                    <div className="min-w-0">
                      <span className="flex min-w-0 items-center gap-2">
                        <Text
                          variant="semibold-base"
                          as="span"
                          truncate
                          className="text-project-accent"
                        >
                          {technician.name}
                        </Text>

                        {technician.isFeatured && (
                          <Star
                            aria-label="Featured"
                            className="size-3.5 shrink-0 fill-project-primary text-project-primary"
                          />
                        )}
                      </span>

                      <Text
                        variant="normal-xs"
                        as="span"
                        className="block truncate text-project-muted-foreground"
                      >
                        {technician.professionalTitle}
                      </Text>
                    </div>
                  </div>

                  <Text
                    variant="normal-sm"
                    as="span"
                    className="hidden items-center gap-1.5 text-project-muted-foreground sm:flex"
                  >
                    <MapPin className="size-3.5 shrink-0" />
                    <span className="truncate">{`${technician.area}, ${technician.city}`}</span>
                  </Text>

                  <div className="hidden text-right sm:block">
                    <Text
                      variant="medium-sm"
                      as="span"
                      className="flex items-center justify-end gap-1.5 text-project-accent"
                    >
                      <Star className="size-3.5 fill-project-primary text-project-primary" />
                      {technician.averageRating}
                    </Text>

                    <Text
                      variant="normal-xs"
                      as="span"
                      className="mt-1 block whitespace-nowrap text-project-muted-foreground"
                    >
                      {`${technician.completedJobs} jobs`}
                    </Text>
                  </div>

                  <div className="flex items-center gap-4 justify-self-end">
                    <div className="text-right">
                      <Text
                        variant="semibold-base"
                        as="span"
                        className="block whitespace-nowrap tabular-nums text-project-accent"
                      >
                        {`${formatMoney(technician.hourlyRate)}/hr`}
                      </Text>

                      <Text
                        variant="normal-xs"
                        as="span"
                        className={
                          technician.isAvailable
                            ? "mt-1 block text-project-success"
                            : "mt-1 block text-project-muted-foreground"
                        }
                      >
                        {technician.isAvailable ? "Accepting work" : "Paused"}
                      </Text>
                    </div>

                    <span className="flex size-9 shrink-0 items-center justify-center border border-project-border text-project-muted-foreground transition-colors group-hover:border-project-primary group-hover:bg-project-primary group-hover:text-project-primary-foreground">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </ScrollReveal>
          </section>
        )}

        {category.topServices.length > 0 && (
          <section className="py-16">
            <ScrollReveal>
              <PageHeader
                as="h2"
                textVariant="section"
                eyebrow="Booked most this month"
                title="Popular services"
                divClassName="mb-8"
              />
            </ScrollReveal>

            <ScrollReveal variant="wipe" className="grid gap-4 lg:grid-cols-2">
              {category.topServices.map((service) => (
                <article
                  key={service.id}
                  className="group flex items-start justify-between gap-6 border border-project-border bg-project-card p-6 transition-colors hover:border-project-primary"
                >
                  <div className="min-w-0 space-y-3">
                    <Text
                      variant="semibold-lg"
                      as="h3"
                      className="text-balance text-project-accent"
                    >
                      {service.title}
                    </Text>

                    <Text
                      variant="normal-sm"
                      as="p"
                      className="text-project-muted-foreground"
                    >
                      {`by ${service.technicianName}`}
                    </Text>

                    <div className="flex flex-wrap gap-1.5">
                      <Text
                        variant="normal-xs"
                        as="span"
                        className="border border-project-border px-2.5 py-1 text-project-muted-foreground"
                      >
                        {`${service.estimatedDuration} min`}
                      </Text>

                      <Text
                        variant="normal-xs"
                        as="span"
                        className="border border-project-border px-2.5 py-1 text-project-muted-foreground"
                      >
                        {`${service.totalBookings} bookings`}
                      </Text>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <Text
                      variant="semibold-2xl"
                      as="span"
                      className="block whitespace-nowrap tabular-nums text-project-primary"
                    >
                      {formatMoney(service.price)}
                    </Text>

                    <Text
                      variant="normal-xs"
                      as="span"
                      className="mt-1 block text-project-muted-foreground"
                    >
                      fixed quote
                    </Text>
                  </div>
                </article>
              ))}
            </ScrollReveal>
          </section>
        )}
      </div>
    </div>
  );
};

export default CategoryDetailsPage;
