import * as Yup from "yup";
import { stringRequiredSchema } from "@/schema/string";

export const createAnnouncementSchema = Yup.object({
  title: stringRequiredSchema("Title", 200),
  content: stringRequiredSchema("Content", 5000),
  targetAudience: Yup.string().required("Target audience is required."),
  announcementType: Yup.string().required("Announcement type is required."),
  publishedAt: Yup.string().nullable(),
 imageFile: Yup.mixed<File>().notRequired(),});

export const updateAnnouncementSchema = Yup.object({
  title: stringRequiredSchema("Title", 200),
  content: stringRequiredSchema("Content", 5000),
  targetAudience: Yup.string().required("Target audience is required."),
  announcementType: Yup.string().required("Announcement type is required."),
  publishedAt: Yup.string().nullable(),
    imageFile: Yup.mixed<File>().nullable().notRequired(),
});
