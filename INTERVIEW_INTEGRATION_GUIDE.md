# Interview Module Integration Guide

Quick reference for integrating the interview management components into your application.

## 📊 Current Interview Workflow

Your app already has an existing interview workflow:

```
/interview
    ↓
[Shows all jobs with status filter]
    ↓
/interview/[jobId]
    ↓
[Shows candidates for selected job → Schedule interviews]
```

## 🆕 New Components Available

### 1. AdminInterviewList Component
Shows all scheduled interviews across the system with filtering and management.

**Use case:** Admin interview dashboard, interview history view

```tsx
import { AdminInterviewList } from "@/api/interview-index";

<AdminInterviewList jobDemandId={optional} />
```

**Features:**
- Paginated interview table (5, 10, 20, 50 rows)
- Filter by status and result
- Set result button
- Cancel/delete actions
- Confirmation dialogs

### 2. ScheduleInterviewModal
Quick modal to schedule interview from any context.

**Use case:** Application details, shortlisted candidates, candidate profile

```tsx
import { ScheduleInterviewModal } from "@/api/interview-index";

<ScheduleInterviewModal
  jobApplicationId={applicationId}
  candidateName="John Doe"
  onSuccess={() => {
    // Refresh parent data
    refetch();
  }}
/>
```

**Features:**
- Date/time picker
- Timezone selection
- Interview type selection (ONLINE/IN_PERSON)
- Meeting link input
- Venue input
- Admin notes
- Form validation

### 3. SetInterviewResultModal
Modal to mark interview result (PASS/FAIL/RE_INTERVIEW).

**Use case:** After interview completion, in interview details view

```tsx
import { SetInterviewResultModal } from "@/api/interview-index";

<SetInterviewResultModal
  interviewId={interview.id}
  candidateName={interview.candidateName}
  currentResult={interview.result}
  onSuccess={() => refetch()}
/>
```

**Features:**
- Result dropdown with 4 options
- Optional notes field
- Current result badge display
- Color-coded indicators

## 🔌 Integration Examples

### Option 1: Add Interview Dashboard

Create `/app/interview/dashboard/page.tsx`:

```tsx
"use client";

import { Box, Heading, VStack } from "@chakra-ui/react";
import { AdminInterviewList } from "@/api/interview-index";

export default function InterviewDashboard() {
  return (
    <Box p={8}>
      <VStack spacing={6} align="stretch">
        <Heading size="lg">Interview Management</Heading>
        <AdminInterviewList />
      </VStack>
    </Box>
  );
}
```

Then link from nav: `Link to="/interview/dashboard"`

### Option 2: Enhance Application Details

In application detail view, add interview scheduling:

```tsx
"use client";

import { ScheduleInterviewModal, useGetInterviewByApplicationIdQuery } from "@/api/interview-index";

export function ApplicationDetail({ applicationId, candidateName }) {
  const { data: interview, refetch } = useGetInterviewByApplicationIdQuery(applicationId);

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
          <Text>Interview: {interview.scheduledAt}</Text>
          {interview.status === "SCHEDULED" && (
            <SetInterviewResultModal
              interviewId={interview.id}
              candidateName={candidateName}
              currentResult={interview.result}
              onSuccess={() => refetch()}
            />
          )}
        </Box>
      )}
    </Box>
  );
}
```

### Option 3: Add to Existing Interview Job Card

In InterviewJobCard or candidate list:

```tsx
import { ScheduleInterviewModal } from "@/api/interview-index";

export function InterviewJobCard({ candidate, applicationId }) {
  return (
    <Box>
      <Text>{candidate.name}</Text>
      <ScheduleInterviewModal
        jobApplicationId={applicationId}
        candidateName={candidate.name}
        onSuccess={() => refetch()}
      />
    </Box>
  );
}
```

### Option 4: Add Interview Tab to Agency/Admin

In admin/agency dashboard, add a tab:

```tsx
import { AdminInterviewList } from "@/api/interview-index";

function DashboardTabs() {
  return (
    <Tabs>
      <TabList>
        <Tab>Dashboard</Tab>
        <Tab>Interviews</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {/* Dashboard content */}
        </TabPanel>
        <TabPanel>
          <AdminInterviewList jobDemandId={selectedJobId} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
```

## 📱 Available Hooks

```tsx
// Queries
import {
  useGetAllInterviewsQuery,
  useGetInterviewByIdQuery,
  useGetInterviewByApplicationIdQuery,
} from "@/api/interview-index";

// Mutations
import {
  useCreateOrUpdateInterviewMutation,
  useSetInterviewResultMutation,
  useCancelInterviewMutation,
  useDeleteInterviewMutation,
} from "@/api/interview-index";

// Example
const { data, isLoading, refetch } = useGetAllInterviewsQuery({ 
  pageable: { page: 0, size: 10 } 
});
```

## 🛠️ Utility Functions

```tsx
import {
  canCancelInterview,
  canSetInterviewResult,
  formatInterviewDateTime,
  getStatusColor,
  getResultColor,
  isUpcomingInterview,
  hasInterviewPassed,
} from "@/api/interview-index";

// Check permissions before showing buttons
if (canCancelInterview(interview)) {
  // Show cancel button
}

if (canSetInterviewResult(interview)) {
  // Show result form
}

// Format for display
const formatted = formatInterviewDateTime(interview);
// Output: "Mar 20, 2026, 02:00 PM UTC"

// Color coding
const statusColor = getStatusColor(interview.status);
const resultColor = getResultColor(interview.result);

// Status checks
if (isUpcomingInterview(interview)) {
  // Show reminder notification
}

if (hasInterviewPassed(interview)) {
  // Show completed badge
}
```

## 📋 Data Types

All types are exported from `@/api/interview-index`:

```tsx
import type {
  InterviewRequest,
  InterviewResponse,
  InterviewResultRequest,
  InterviewFilterParams,
  PaginatedInterviewResponse,
} from "@/api/interview-index";
```

## 🎯 Quick Start Checklist

- [ ] Review [INTERVIEW_SETUP_GUIDE.md](../INTERVIEW_SETUP_GUIDE.md) for full API documentation
- [ ] Decide integration approach (new dashboard vs enhance existing)
- [ ] Import components using barrel export from `@/api/interview-index`
- [ ] Use utility functions to check permissions before showing actions
- [ ] Add error/success toast notifications
- [ ] Test with real job applications
- [ ] Add to navigation menu if creating new page

## 🔐 Authentication

All endpoints require:
- Bearer token (automatically included by httpClient)
- Admin or authorized agency/candidate role
- Valid JWT token from login

## 📞 API Reference

For detailed API documentation including request/response schemas, see [INTERVIEW_SETUP_GUIDE.md](../INTERVIEW_SETUP_GUIDE.md#-api-endpoints).

## ✅ Status Workflow

```
SCHEDULED ────► RESCHEDULED ────► COMPLETED
                                  ├─► PASS
                                  ├─► FAIL
                                  └─► RE_INTERVIEW
OR
SCHEDULED ──────────────────────► CANCELLED
OR
SCHEDULED ──────────────────────► NO_SHOW
```

## 🚀 Best Practices

1. Always pass `onSuccess` callback to modals to refresh parent data
2. Use utility functions to check if actions are allowed
3. Leverage React Query cache - don't manually refetch unnecessarily
4. Batch filter changes by resetting page to 0
5. Handle timezones properly for scheduling
6. Provide clear feedback via toast notifications
7. Include confirmation dialogs for destructive operations

## 🐛 Testing

Test the following scenarios:

- [ ] Schedule interview with online meeting link
- [ ] Schedule interview with in-person venue
- [ ] Set interview result to PASS
- [ ] Set interview result to FAIL
- [ ] Set interview result to RE_INTERVIEW with notes
- [ ] Cancel a scheduled interview
- [ ] Delete an interview
- [ ] Filter interviews by status
- [ ] Filter interviews by result
- [ ] Pagination works correctly
- [ ] Timezone is properly displayed
- [ ] Error handling shows proper messages

## 📊 File Reference

```
src/
├── api/
│   ├── admin-interview.ts           # API hooks and types
│   └── interview-index.ts           # Barrel export
├── app/interview/(components)/
│   ├── AdminScheduleInterviewModal.tsx
│   ├── SetInterviewResultModal.tsx
│   └── AdminInterviewList.tsx
├── constants/
│   └── api.ts                       # Endpoints
└── utils/
    └── interview.ts                 # Utilities
```

## 📞 Support

If components aren't appearing or hooks aren't working:

1. Check that routing fix is applied in `RootLayoutContent.tsx`
2. Verify API endpoints in `constants/api.ts`
3. Check httpClient configuration in `utils/axios.ts`
4. Review type definitions in `admin-interview.ts`
5. Enable React Query DevTools to debug queries
