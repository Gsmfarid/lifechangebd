import { connectDb } from "@/config";
import { Course } from "@/models";

// Update the definition of getCourses

export default async function getCourseBySlug({ slug }: { slug: string }) {
  try {
    connectDb();

    const course = await Course.find({ courseSlug: slug });

    if (!course) {
      return null;
    }

    return course;
  } catch (error) {
    console.log("Get course error: ", error);
  }
}