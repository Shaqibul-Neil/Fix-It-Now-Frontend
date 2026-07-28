import { NextResponse } from "next/server";

export const apiSuccess = <TData>(
  message: string,
  data?: TData,
  status = 200,
) => NextResponse.json({ success: true, message, data }, { status });

export const apiError = (message: string, status: number) =>
  NextResponse.json({ success: false, message }, { status });
