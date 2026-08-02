// Mirrors the backend's TNotificationType enum.
export type TNotificationType =
  | "TECHNICIAN_ONBOARDED"
  | "TECHNICIAN_PROFILE_UPDATED"
  | "TECHNICIAN_APPROVED"
  | "TECHNICIAN_REJECTED"
  | "CATEGORY_DEACTIVATED"
  | "CATEGORY_REACTIVATED"
  | "SERVICE_CREATED"
  | "SERVICE_UPDATED"
  | "SERVICE_DELETED"
  | "SERVICE_RESTORED"
  | "BOOKING_CREATED"
  | "BOOKING_ACCEPTED"
  | "BOOKING_DECLINED"
  | "BOOKING_PAID"
  | "BOOKING_IN_PROGRESS"
  | "BOOKING_COMPLETED"
  | "BOOKING_CANCELLED"
  | "PAYMENT_SUCCESS"
  | "PAYMENT_FAILED"
  | "PAYMENT_CANCELLED"
  | "REVIEW_SUBMITTED"
  | "REVIEW_PUBLISHED"
  | "ACCOUNT_BANNED"
  | "ACCOUNT_REACTIVATED"
  | "USER_REGISTERED"
  | "TECHNICIAN_REGISTERED"
  | "AVAILABILITY_UPDATED";

// GET /notifications — one row of the signed-in user's own feed. `data` is the
// free-form json the emitters attach, kept as-is until something links off it.
export interface INotification {
  id: string;
  type: TNotificationType;
  title: string;
  message: string;
  data: Record<string, string> | null;
  isRead: boolean;
  createdAt: string;
}

// The list endpoint answers with the rows and the unread total in one payload,
// so the badge never needs a second request.
export interface INotificationList {
  items: INotification[];
  unreadCount: number;
}

export interface INotificationListQuery {
  isRead?: boolean;
  page: number;
  limit: number;
}
