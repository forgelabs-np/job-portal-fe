import { Job } from "@/app/job/(components)/JobCard";
import { api } from "@/constants/api";
import { ApiResponse } from "@/shared/types/response";
import { httpClient } from "@/utils/axios";
import { errorNotification, successNotification } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

// params for GET
interface JobsParams {
  keyword?: string;
  page?: number;
  size?: number;
}

// Job item (simplified but structured)
export interface JobType {
  id: number;
  title: string;
  city: string;
  description: string;
  requirements: string;
  totalSlots: number;
  filledSlots: number;
  remainingSlots: number;
  appliedCount: number;
  status: string;
  isOpen: boolean;
  salaryAmount: number;
  salaryCurrency: string;
  salaryPeriod: string;
  genderPreference: string;
  preferredNationalities: string[];
  minExperienceYears: number;
  maxExperienceYears: number;
  requiredSkills: string;
  educationLevel: string;
  workingHoursPerWeek: number;
  contractDurationYears: number;
  deadline: string;

  accommodationProvided: boolean;
  accommodationDetails: string;

  foodProvided: boolean;
  foodDetails: string;

  transportationProvided: boolean;
  transportationDetails: string;

  medicalInsuranceProvided: boolean;
  medicalInsuranceDetails: string;

  airTicketProvided: boolean;
  airTicketDetails: string;

  additionalBenefits: string;

  country: {
    id: number;
    name: string;
    code: string;
    currencyCode: string;
    currencySymbol: string;
  };
}

interface JobsResponse {
  content: Job[];
  size: number;
  page: number;
  totalPages: number;
  totalElements: number;
}

interface JobsResponseById {
  data: JobType;
  size: number;
  page: number;
  totalPages: number;
  totalElements: number;
}

export interface CreateJobPayload {
  data: {
    id?: number;
    title: string;
    countryId: number | null;
    city: string;
    description: string;
    requirements: string;
    totalSlots: number | null;
    filledSlots?: number | null;
    salaryAmount: number | null;
    salaryPeriod: string;
    genderPreference: string;
    preferredNationalities: string[];
    workingHoursPerWeek: number | null;
    minExperienceYears: number | null;
    maxExperienceYears: number | null;
    requiredSkills: string;
    educationLevel: string;
    contractDurationYears: number | null;
    overtimePolicy: string;
    accommodationProvided: boolean;
    accommodationDetails: string;
    foodProvided: boolean;
    foodDetails: string;
    transportationProvided: boolean;
    transportationDetails: string;
    medicalInsuranceProvided: boolean;
    medicalInsuranceDetails: string;
    airTicketProvided: boolean;
    airTicketDetails: string;
    leavePolicy: string;
    probationPeriodMonths: number | null;
    terminationClause: string;
    additionalBenefits: string;
    deadline: string;
  };
}

export interface JobApplicationPayload {
  jobDemandId: number;
  candidateId: number | null;
  notes: string;
}

export interface CreateJobPayloadType {
  data: JobApplicationPayload;
}

export interface CreateJobFormType {
  title: string;
  countryId: number | null;
  city: string;
  description: string;
  requirements: string;

  totalSlots: number | null;
  filledSlots?: number | null;

  salaryAmount: number | null;
  salaryPeriod: string;

  genderPreference: string;
  preferredNationalities: string;

  workingHoursPerWeek: number | "";
  minExperienceYears: number | null;
  maxExperienceYears: number | null;

  requiredSkills: string;
  educationLevel: string;

  contractDurationYears: number | null;
  overtimePolicy: string;

  probationPeriodMonths: number | null;
  terminationClause: string;
  leavePolicy: string;

  accommodationProvided: boolean;
  accommodationDetails: string;

  foodProvided: boolean;
  foodDetails: string;

  transportationProvided: boolean;
  transportationDetails: string;

  medicalInsuranceProvided: boolean;
  medicalInsuranceDetails: string;

  airTicketProvided: boolean;
  airTicketDetails: string;

  additionalBenefits: string;

  deadline: string;
}

const getJobs = (params: JobsParams) => {
  return httpClient.get<ApiResponse<JobsResponse>>(api.AGENCY.JOBS.GET_JOBS, {
    params,
  });
};

export const useGetAgencyJobs = (
  params: JobsParams = {},
  isOpen: boolean = true,
) => {
  return useQuery({
    queryFn: () => getJobs(params),
    queryKey: [api.ADMIN.JOBS.GET_JOB, params],
    select: (resp) => resp?.data?.data?.content,
    enabled: !!isOpen,
  });
};

const createApplication = (payload: CreateJobPayloadType) => {
  return httpClient.post(api.AGENCY.JOBS.APPLY, payload);
};

export const useCreateApplicationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateJobPayloadType) => createApplication(payload),

    onSuccess: (response) => {
      successNotification(response?.data?.message);

      queryClient.invalidateQueries({
        queryKey: [api.ADMIN.JOBS.GET_JOB],
      });
    },

    onError: ({
      error,
    }: {
      error: AxiosError<{ message: string; error: string }>;
    }) => {
      errorNotification(error?.response?.data?.message);
    },
  });
};

const getJobsById = (id: number) => {
  return httpClient.get<ApiResponse<JobType>>(
    api.ADMIN.JOBS.GET_JOB_BY_ID.replace("{id}", `${id}`),
  );
};

export const useGetJobsById = (id: number) => {
  return useQuery({
    queryFn: () => getJobsById(id),
    queryKey: [api.ADMIN.JOBS.GET_JOB],
    select: (resp) => resp?.data?.data,
    enabled: !!id,
  });
};
