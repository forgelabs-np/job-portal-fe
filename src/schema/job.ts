import * as yup from "yup";

// Infer the type from the schema (optional but recommended)
export const jobSchema = yup.object().shape({
  title: yup.string().required("Job title is required"),
  countryId: yup.number().nullable().required("Country is required"),
  city: yup.string().optional(),
  description: yup.string().required("Description is required"),
  requirements: yup.string().required("Requirements are required"),

  totalSlots: yup
    .number()
    .transform((value, original) => (original === "" ? null : value))
    .positive("Total slots must be positive")
    .integer("Total slots must be an integer")
    .required("Total slots is required"),
  filledSlots: yup.number().nullable().optional(),

  salaryAmount: yup
    .number()
    .transform((value, original) => (original === "" ? null : value))
    .positive("Salary amount must be positive")
    .required("Salary amount is required"),
  salaryPeriod: yup.string().required("Salary period is required"),

  genderPreference: yup.string().required("Gender preference is required"),
  preferredNationalities: yup.string().optional(),

  workingHoursPerWeek: yup
    .number()
    .transform((value, original) => (original === "" ? null : value))
    .positive("Working hours must be positive")
    .required("Working hours per week is required"),

  minExperienceYears: yup
    .number()
    .nullable()
    .transform((value, original) => (original === "" ? null : value))
    .min(0, "Minimum experience cannot be negative"),
  maxExperienceYears: yup
    .number()
    .nullable()
    .transform((value, original) => (original === "" ? null : value))
    .min(0, "Maximum experience cannot be negative")
    .test(
      "max-gte-min",
      "Max experience must be greater than or equal to min experience",
      function (value) {
        const { minExperienceYears } = this.parent;
        if (value == null || minExperienceYears == null) return true;
        return value >= minExperienceYears;
      }
    ),

  requiredSkills: yup.string().optional(),
  educationLevel: yup.string().optional(),

  contractDurationYears: yup
    .number()
    .nullable()
    .transform((value, original) => (original === "" ? null : value))
    .positive("Contract duration must be positive"),
  overtimePolicy: yup.string().optional(),
  probationPeriodMonths: yup
    .number()
    .nullable()
    .transform((value, original) => (original === "" ? null : value))
    .min(0, "Probation period cannot be negative"),
  terminationClause: yup.string().optional(),
  leavePolicy: yup.string().optional(),

  accommodationProvided: yup.boolean(),
  accommodationDetails: yup.string().when("accommodationProvided", {
    is: true,
    then: (schema) => schema.required("Please provide accommodation details"),
    otherwise: (schema) => schema.optional(),
  }),

  foodProvided: yup.boolean(),
  foodDetails: yup.string().when("foodProvided", {
    is: true,
    then: (schema) => schema.required("Please provide food details"),
    otherwise: (schema) => schema.optional(),
  }),

  transportationProvided: yup.boolean(),
  transportationDetails: yup.string().when("transportationProvided", {
    is: true,
    then: (schema) => schema.required("Please provide transportation details"),
    otherwise: (schema) => schema.optional(),
  }),

  medicalInsuranceProvided: yup.boolean(),
  medicalInsuranceDetails: yup.string().when("medicalInsuranceProvided", {
    is: true,
    then: (schema) => schema.required("Please provide medical insurance details"),
    otherwise: (schema) => schema.optional(),
  }),

  airTicketProvided: yup.boolean(),
  airTicketDetails: yup.string().when("airTicketProvided", {
    is: true,
    then: (schema) => schema.required("Please provide air ticket details"),
    otherwise: (schema) => schema.optional(),
  }),

  additionalBenefits: yup.string().optional(),

  deadline: yup
    .string()
    .required("Deadline is required")
    .test("is-future-date", "Deadline must be a future date", (value) => {
      if (!value) return false;
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }),
  isPublic: yup.boolean(),
});

// Export the inferred type if you want to use it instead of CreateJobFormType
export type JobFormData = yup.InferType<typeof jobSchema>;