# Admin Interview Management System

Complete implementation for managing job interviews in the admin dashboard.

## 📋 Overview

This module provides a comprehensive interview management system for admins to:
- Schedule interviews with candidates
- Update interview results (PASS/FAIL/RE_INTERVIEW)
- Cancel scheduled interviews
- Filter and view all interviews
- Track interview status and outcomes

## 🗂️ File Structure

```
src/
├── api/
│   ├── admin-interview.ts          # Main API hooks and types
│   └── interview-index.ts          # Barrel export file
├── app/interview/(components)/
│   ├── AdminScheduleInterviewModal.tsx  # Schedule interview modal
│   ├── SetInterviewResultModal.tsx      # Result submission modal
│   └── AdminInterviewList.tsx           # Interview list with filters
├── constants/
│   └── api.ts                      # API endpoints configuration
└── utils/
    └── interview.ts                # Interview utilities and helpers
```

## 🚀 Quick Start

### 1. **Schedule an Interview**

```tsx
import { ScheduleInterviewModal } from "@/api/interview-index";

<ScheduleInterviewModal
  jobApplicationId={applicationId}
  candidateName={candidate.name}
  onSuccess={() => {
    // Refresh list or show success message
  }}
/>
```

### 2. **Set Interview Result**

```tsx
import { SetInterviewResultModal } from "@/api/interview-index";

<SetInterviewResultModal
  interviewId={interview.id}
  candidateName={interview.candidateName}
  currentResult={interview.result}
  onSuccess={() => {
    // Refresh list
  }}
/>
```

### 3. **View All Interviews**

```tsx
import { AdminInterviewList } from "@/api/interview-index";

<AdminInterviewList jobDemandId={jobId} />
```

## 📡 API Endpoints

All endpoints require Bearer token authentication.

### Get Interviews
```
GET /api/admin/interviews
Params:
  - jobDemandId? (number)
  - status? (SCHEDULED|RESCHEDULED|COMPLETED|CANCELLED|NO_SHOW)
  - result? (PENDING|PASS|FAIL|RE_INTERVIEW)
  - agencyId? (number)
  - pageable (page, size, sort)

Response: PaginatedInterviewResponse
```

### Get Interview by ID
```
GET /api/admin/interviews/{interviewId}

Response: InterviewResponse
```

### Get Interview by Application ID
```
GET /api/admin/interviews/application/{jobApplicationId}

Response: InterviewResponse
```

### Schedule Interview
```
POST /api/admin/interviews
Body: InterviewRequest {
  jobApplicationId: number
  scheduledAt: string (ISO datetime)
  timezone: string
  interviewLink: string
  interviewType: "ONLINE" | "IN_PERSON"
  venue?: string
  adminNotes?: string
}

Response: InterviewResponse
```

### Set Interview Result
```
PATCH /api/admin/interviews/{interviewId}/result
Body: InterviewResultRequest {
  result: "PENDING" | "PASS" | "FAIL" | "RE_INTERVIEW"
  resultNotes?: string
}

Response: InterviewResponse
```

### Cancel Interview
```
PATCH /api/admin/interviews/{interviewId}/cancel

Response: InterviewResponse
```

### Delete Interview
```
DELETE /api/admin/interviews/{interviewId}

Response: void
```

## 🎣 React Query Hooks

### Queries
```tsx
// Get all interviews with filters
const { data, isLoading, refetch } = useGetAllInterviewsQuery(params);

// Get single interview
const { data: interview } = useGetInterviewByIdQuery(interviewId);

// Get interview by application ID
const { data: interview } = useGetInterviewByApplicationIdQuery(appId);
```

### Mutations
```tsx
// Schedule/update interview
const { mutate: scheduleInterview } = useCreateOrUpdateInterviewMutation();

// Set interview result
const { mutate: setResult } = useSetInterviewResultMutation();

// Cancel interview
const { mutate: cancelInterview } = useCancelInterviewMutation();

// Delete interview
const { mutate: deleteInterview } = useDeleteInterviewMutation();
```

## 🛠️ Utility Functions

```tsx
import {
  canCancelInterview,
  canSetInterviewResult,
  formatInterviewDateTime,
  getStatusColor,
  getResultColor,
  isInterviewCompleted,
  getDaysUntilInterview,
  isUpcomingInterview,
  hasInterviewPassed,
} from "@/api/interview-index";

// Check if interview can be cancelled
if (canCancelInterview(interview)) {
  // Show cancel button
}

// Format date with timezone
const formatted = formatInterviewDateTime(interview);
// Output: "Mar 20, 2026, 02:00 PM UTC"

// Get badge color
const color = getStatusColor(interview.status); // "blue"
const resultColor = getResultColor(interview.result); // "green"

// Check interview status
if (isUpcomingInterview(interview)) {
  // Show reminder
}

if (hasInterviewPassed(interview)) {
  // Show completed badge
}

const days = getDaysUntilInterview(interview.scheduledAt); // 5
```

## 📊 Data Types

### InterviewRequest
```tsx
{
  id?: number;
  jobApplicationId: number;
  scheduledAt: string; // "2026-03-20T14:00:00"
  timezone: string; // "UTC", "IST", "PST", "EST", "GMT"
  interviewLink: string; // URL for online interviews
  interviewType: "ONLINE" | "IN_PERSON";
  venue?: string; // For in-person interviews
  adminNotes?: string;
}
```

### InterviewResponse
```tsx
{
  id: number;
  jobApplicationId: number;
  jobTitle: string;
  candidateId: number;
  candidateName: string;
  candidateType: string;
  agencyId: number;
  agencyName: string;
  scheduledAt: string;
  timezone: string;
  interviewLink: string;
  interviewType: "ONLINE" | "IN_PERSON";
  venue?: string;
  adminNotes?: string;
  status: "SCHEDULED" | "RESCHEDULED" | "COMPLETED" | "CANCELLED" | "NO_SHOW";
  result: "PENDING" | "PASS" | "FAIL" | "RE_INTERVIEW";
  resultNotes?: string;
  resultUpdatedBy?: number;
  resultUpdatedAt?: string;
  scheduledBy: number;
  reminderSent: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## 📝 Example Usage

### Full Integration in Application Details View

```tsx
import {
  ScheduleInterviewModal,
  SetInterviewResultModal,
  AdminInterviewList,
  useGetInterviewByApplicationIdQuery,
} from "@/api/interview-index";

export function ApplicationDetails({ applicationId }: Props) {
  const { data: interview } = useGetInterviewByApplicationIdQuery(applicationId);

  return (
    <Box>
      {!interview ? (
        <ScheduleInterviewModal
          jobApplicationId={applicationId}
          candidateName={candidateName}
          onSuccess={() => refetch()}
        />
      ) : (
        <Box>
          <Text>Interview Scheduled: {interview.scheduledAt}</Text>
          <SetInterviewResultModal
            interviewId={interview.id}
            candidateName={interview.candidateName}
            currentResult={interview.result}
            onSuccess={() => refetch()}
          />
        </Box>
      )}
    </Box>
  );
}
```

### Interview Management Dashboard

```tsx
import { AdminInterviewList } from "@/api/interview-index";

export function InterviewDashboard() {
  return (
    <Box>
      <Heading>Interview Management</Heading>
      <AdminInterviewList />
    </Box>
  );
}
```

## 🎨 Styling

All components use Chakra UI for consistent styling. They integrate with:
- `useToast` from `@/utils/toast` for notifications
- Dialog/Modal components from `@/shared/ui/dialog`
- Button components from `@/shared/ui/button`

## ⚠️ Error Handling

All mutations include error handling:

```tsx
const { mutate } = useCreateOrUpdateInterviewMutation();

mutate(data, {
  onSuccess: () => {
    toast.success("Interview scheduled!");
    refetch();
  },
  onError: (err: any) => {
    toast.error(err.response?.data?.message || "Failed to schedule");
  },
});
```

## 🔄 Query Invalidation

All mutations automatically invalidate and refetch:
- Interview list queries
- Individual interview queries
- Application-specific interview queries

No manual refetch needed in most cases!

## 🚦 Status Workflow

```
SCHEDULED → RESCHEDULED → COMPLETED
                        ↓
                      CANCELLED / NO_SHOW
```

## 📱 Responsive Design

- Modal dialogs are fully responsive
- Table component adapts to mobile screens
- Touch-friendly button sizes and spacing

## 🔐 Permissions

All endpoints require:
- Bearer token authentication
- Admin role (`ADMIN` in user roles)

## 💡 Best Practices

1. **Always call `onSuccess`** in modals to refresh parent data
2. **Use utility functions** for checking permissions before showing actions
3. **Leverage query hooks** for automatic cache management
4. **Batch filter changes** by resetting page to 0
5. **Handle timezone properly** in form submission

## 🐛 Debugging

Enable React Query DevTools to inspect queries:

```tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

<ReactQueryDevtools initialIsOpen={false} />
```

## 📞 Support

For issues or questions about the interview module:
1. Check the API types in `admin-interview.ts`
2. Review utility functions in `interview.ts`
3. Check component props in component files
4. Verify API endpoints in `constants/api.ts`
