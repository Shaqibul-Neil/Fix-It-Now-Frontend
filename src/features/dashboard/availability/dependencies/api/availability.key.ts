// Keyed by technician, so opening another service by the same technician
// reuses what is already cached.
export const availabilityKeys = {
  mine: ["my-availability"] as const,
  technician: (technicianId: string) =>
    ["technician-availability", technicianId] as const,
};
