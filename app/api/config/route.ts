import { connectDb } from "@/config";
import { UserRole } from "@/lib";
import { AppConfig } from "@/models";
import { ApiResponse } from "@/utils";
import getCurrentUser from "@/utils/actions/getCurrentUser";
import { NextRequest } from "next/server";

connectDb();

export const POST = async (req: NextRequest) => {
  try {
    const courseData = await req.json();
    // Get Current User
    const user = await getCurrentUser();

    if (user.role !== UserRole.admin) {
      return ApiResponse(401, "Denied❗ unauthorized user 😠😡😠");
    }

    const result = await AppConfig.create(courseData);

    return ApiResponse(200, "Config created successfully 👌", result);
  } catch (error: any) {
    return ApiResponse(400, error.message);
  }
};

export const GET = async () => {
  try {
    const { role } = await getCurrentUser();

    if (role !== UserRole.admin) {
      return ApiResponse(401, "Denied❗unauthorized 😠😡😠");
    }

    const appConfig = await AppConfig.find();

    return ApiResponse(200, "Config get successfully 👌", appConfig);
  } catch (error: any) {
    return ApiResponse(400, error.message);
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const updatedData = await req.json();

    // Get Current User
    const { role } = await getCurrentUser();

    if (role !== UserRole.admin) {
      return ApiResponse(401, "Denied❗unauthorized 😠😡😠");
    }

    const result = await AppConfig.updateOne({ for: role }, updatedData, {
      new: true,
    });

    return ApiResponse(200, "Config update successfully 🛠️✅", result);
  } catch (error: any) {
    return ApiResponse(400, error.message);
  }
};
