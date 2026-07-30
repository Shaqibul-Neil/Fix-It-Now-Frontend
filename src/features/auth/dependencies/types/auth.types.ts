import { TUserRole } from "@/src/lib/auth/auth.roles";
import { TTechnicianApprovalStatus, TUserStatus } from "@/src/types/types";

export interface IAuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: TUserRole;
  status: TUserStatus;
}

export interface ILoginResponseData {
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: string;
  user: IAuthUser;
}

export interface ILoginResult {
  status: number;
  response: {
    success: boolean;
    message?: string;
    data?: ILoginResponseData;
  };
  headers: Headers;
  refreshToken?: string;
}

export interface ICurrentUser extends IAuthUser {
  isOnboarded: boolean;
  approvalStatus?: TTechnicianApprovalStatus;
  rejectionReason?: string | null;
}
