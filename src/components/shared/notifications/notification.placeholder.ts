// Placeholder shape and rows so the bell can be designed before the
// notification feature module exists. Replace both with the real query later.

export type TNotificationType = "booking" | "payment" | "review" | "system";

export interface INotification {
  id: string;
  type: TNotificationType;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
}

const minutesAgo = (minutes: number) =>
  new Date(Date.now() - minutes * 60_000).toISOString();

export const PLACEHOLDER_NOTIFICATIONS: INotification[] = [
  {
    id: "1",
    type: "booking",
    title: "Technician accepted your booking",
    body: "Rakib H. will reach your address between 3:00 and 4:00 PM today.",
    isRead: false,
    createdAt: minutesAgo(6),
  },
  {
    id: "2",
    type: "payment",
    title: "Payment released",
    body: "৳1,850 has been released for booking #FIN-2043.",
    isRead: false,
    createdAt: minutesAgo(95),
  },
  {
    id: "3",
    type: "review",
    title: "New review on your profile",
    body: "Nusrat J. rated your AC servicing job 5 out of 5.",
    isRead: true,
    createdAt: minutesAgo(320),
  },
  {
    id: "4",
    type: "system",
    title: "Verification approved",
    body: "Your ID documents passed review. Jobs are now unlocked.",
    isRead: true,
    createdAt: minutesAgo(1500),
  },
];
