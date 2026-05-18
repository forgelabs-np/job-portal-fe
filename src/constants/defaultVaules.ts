import { CreateJobFormType } from "@/api/job";

export const createJobDefaultValues: CreateJobFormType = {
  title: "",
  countryId: null,
  city: "",
  description: "",
  requirements: "",

  totalSlots: null,
  filledSlots: null,

  salaryAmount: null,
  salaryPeriod: "",

  genderPreference: "",
  preferredNationalities: "",

  workingHoursPerWeek: "",
  minExperienceYears: null,
  maxExperienceYears: null,

  requiredSkills: "",
  educationLevel: "",

  contractDurationYears: null,
  overtimePolicy: "",

  probationPeriodMonths: null,
  terminationClause: "",
  leavePolicy: "",

  accommodationProvided: false,
  accommodationDetails: "",

  foodProvided: false,
  foodDetails: "",

  transportationProvided: false,
  transportationDetails: "",

  medicalInsuranceProvided: false,
  medicalInsuranceDetails: "",

  airTicketProvided: false,
  airTicketDetails: "",

  additionalBenefits: "",

  deadline: "",
  isPublic: false,
};
