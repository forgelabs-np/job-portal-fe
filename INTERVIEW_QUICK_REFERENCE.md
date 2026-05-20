# 🎯 Interview Module - Quick Reference

## 📦 Installation & Setup

✅ Already done! All components, hooks, and utilities are ready to use.

```bash
# Nothing to install - all dependencies already in package.json
# Just import and use!
```

## 🚀 Basic Usage (Copy & Paste)

### Show Interview List with Filters
```tsx
import { AdminInterviewList } from "@/api/interview-index";

<AdminInterviewList />
```

### Schedule Interview
```tsx
import { ScheduleInterviewModal } from "@/api/interview-index";

<ScheduleInterviewModal
  jobApplicationId={123}
  candidateName="John Doe"
  onSuccess={() => refetch()}
/>
```

### Mark Interview Result
```tsx
import { SetInterviewResultModal } from "@/api/interview-index";

<SetInterviewResultModal
  interviewId={456}
  candidateName="John Doe"
  onSuccess={() => refetch()}
/>
```

## 📡 Hooks Usage

```tsx
// Get all interviews
import { useGetAllInterviewsQuery } from "@/api/interview-index";
const { data, isLoading } = useGetAllInterviewsQuery({ 
  pageable: { page: 0, size: 10 } 
});

// Get interview by application
import { useGetInterviewByApplicationIdQuery } from "@/api/interview-index";
const { data: interview } = useGetInterviewByApplicationIdQuery(appId);

// Schedule interview
import { useCreateOrUpdateInterviewMutation } from "@/api/interview-index";
const { mutate } = useCreateOrUpdateInterviewMutation();

// Set result
import { useSetInterviewResultMutation } from "@/api/interview-index";
const { mutate: setResult } = useSetInterviewResultMutation();
```

## 🛠️ Common Utilities

```tsx
import {
  canCancelInterview,
  canSetInterviewResult,
  formatInterviewDateTime,
  getStatusColor,
  getResultColor,
  isUpcomingInterview,
} from "@/api/interview-index";

// Check if can perform action
if (canCancelInterview(interview)) { /* Show cancel */ }
if (canSetInterviewResult(interview)) { /* Show result form */ }

// Format display
const date = formatInterviewDateTime(interview); // "Mar 20, 02:00 PM UTC"

// Colors
const statusBadgeColor = getStatusColor(interview.status);
const resultBadgeColor = getResultColor(interview.result);

// Status checks
if (isUpcomingInterview(interview)) { /* Show reminder */ }
```

## 🎨 Available Props

### AdminInterviewList
```tsx
<AdminInterviewList 
  jobDemandId={optional}  // Filter by job
/>
```

### ScheduleInterviewModal
```tsx
<ScheduleInterviewModal
  jobApplicationId={number}           // Required
  candidateName={string}              // Required
  onSuccess={() => void}              // Optional
/>
```

### SetInterviewResultModal
```tsx
<SetInterviewResultModal
  interviewId={number}                // Required
  candidateName={string}              // Required
  currentResult={string}              // Optional
  onSuccess={() => void}              // Optional
/>
```

## 📊 Status & Result Values

**Interview Status:**
```
SCHEDULED | RESCHEDULED | COMPLETED | CANCELLED | NO_SHOW
```

**Interview Result:**
```
PENDING | PASS | FAIL | RE_INTERVIEW
```

**Interview Type:**
```
ONLINE | IN_PERSON
```

**Timezones:**
```
UTC | IST | PST | EST | GMT
```

## 🔗 API Endpoints

```
GET     /api/admin/interviews
GET     /api/admin/interviews/{id}
GET     /api/admin/interviews/application/{appId}
POST    /api/admin/interviews
PATCH   /api/admin/interviews/{id}/result
PATCH   /api/admin/interviews/{id}/cancel
DELETE  /api/admin/interviews/{id}
```

## 📝 Common Patterns

### Pattern 1: Schedule from Application Detail
```tsx
const { data: interview } = useGetInterviewByApplicationIdQuery(appId);

return (
  <>
    {!interview ? (
      <ScheduleInterviewModal
        jobApplicationId={appId}
        candidateName={candidate.name}
        onSuccess={refetch}
      />
    ) : (
      <SetInterviewResultModal
        interviewId={interview.id}
        candidateName={interview.candidateName}
        currentResult={interview.result}
        onSuccess={refetch}
      />
    )}
  </>
);
```

### Pattern 2: Interview Dashboard Tab
```tsx
<Tabs>
  <TabList>
    <Tab>Dashboard</Tab>
    <Tab>Interviews</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>{/* Dashboard */}</TabPanel>
    <TabPanel>
      <AdminInterviewList jobDemandId={selectedJobId} />
    </TabPanel>
  </TabPanels>
</Tabs>
```

### Pattern 3: Conditional Actions
```tsx
const interview = /* ... */;

return (
  <HStack>
    {canSetInterviewResult(interview) && (
      <SetInterviewResultModal {...props} />
    )}
    {canCancelInterview(interview) && (
      <Button>Cancel</Button>
    )}
  </HStack>
);
```

## 🎯 Integration Checklist

- [ ] Import component from `@/api/interview-index`
- [ ] Add to your page/component
- [ ] Pass required props
- [ ] Add `onSuccess` callback to refresh data
- [ ] Test with real data
- [ ] Add to navigation if new page

## ⚠️ Important Notes

1. **Authentication:** All endpoints require valid JWT bearer token
2. **Authorization:** Requires ADMIN or authorized role
3. **Cache:** React Query automatically handles cache invalidation
4. **Notifications:** Use `onSuccess` callbacks for user feedback
5. **Routing:** Interview routes use DashboardLayout (with sidebar)

## 📚 Complete Guides

- **INTERVIEW_SETUP_GUIDE.md** - Full API & type documentation
- **INTERVIEW_INTEGRATION_GUIDE.md** - Detailed integration examples
- **src/api/admin-interview.ts** - Source code with comments

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Component not found | Import from `@/api/interview-index` |
| API 401 error | Check JWT token, ensure logged in |
| Cache not updating | Ensure `onSuccess` callback is passed |
| Toast not showing | Import `useToast` from `@/utils/toast` |
| Sidebar not showing | Check routing in `RootLayoutContent.tsx` |

## 💡 Pro Tips

- Use the barrel export `@/api/interview-index` for cleaner imports
- Leverage utility functions to reduce conditional logic
- Always pass `onSuccess` callbacks to maintain fresh data
- Use React Query DevTools to debug queries: `<ReactQueryDevtools />`
- Batch filter changes to prevent excessive API calls

## 📞 Quick Links

- API Docs: See INTERVIEW_SETUP_GUIDE.md
- Source: `src/api/admin-interview.ts`
- Utilities: `src/utils/interview.ts`
- Components: `src/app/interview/(components)/`
- Routes: Check `src/constants/routes.ts`

---

**Status:** ✅ Complete & Ready for Production
**Last Updated:** [Current Date]
**Version:** 1.0.0
