"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Box,
  Flex,
  Text,
  HStack,
  VStack,
  Badge,
  Button,
  IconButton,
  Menu,
  Portal,

  Skeleton,
} from "@chakra-ui/react";
import {
  Mail,
  MessageSquare,
  Clock,
  User,
  MapPin,
  Phone as PhoneIcon,
  EllipsisVertical,
  Eye,
  Pencil,
  Trash2,
  CheckCircle2,
  CircleDot,
  Filter,
  X,
} from "lucide-react";
import {  useLeads, useDeleteLeadMutation, useMarkLeadAsReadMutation, useMarkLeadAsProcessedMutation, useUnreadLeadCount, useUnprocessedLeadCount, type Lead } from "@/api/leads";
import { BRAND_COLORS, WEBSITE_THEME_COLOR } from "@/constants/color";
import { Pagination } from "@/shared/components/pagination/Pagination";
import PageNoData from "@/shared/ui/NoDataAvailable/PageNoData";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import LeadDetailModal from "./LeadDetailModal";
import EditLeadModal from "./EditLeadModal";

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_SIZE_OPTIONS = [10, 20, 50];

const SUBJECT_OPTIONS = [
  { label: "All Subjects", value: "" },
  { label: "Consultation", value: "CONSULTATION" },
  { label: "Partnership", value: "PARTNERSHIP" },
  { label: "Feedback", value: "FEEDBACK" },
  { label: "General Inquiry", value: "GENERAL_INQUIRY" },
  { label: "Support", value: "SUPPORT" },
];

const READ_FILTER_OPTIONS = [
  { label: "All", value: "" },
  { label: "Read", value: "read" },
  { label: "Unread", value: "unread" },
];

const PROCESSED_FILTER_OPTIONS = [
  { label: "All", value: "" },
  { label: "Processed", value: "processed" },
  { label: "Unprocessed", value: "unprocessed" },
];



// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};



const getSubjectLabel = (subject: string) => {
  return subject
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
};

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  count: number;
  iconBg: string;
  iconColor: string;
  countColor: string;
  borderColor: string;
  IconComponent: React.ElementType;
}

function StatCard({
  label,
  count,
  iconBg,
  iconColor,
  countColor,
  borderColor,
  IconComponent,
}: StatCardProps) {
  return (
    <Box
      flex={1}
      bg="white"
      border="1px solid"
      borderColor={borderColor}
      borderRadius="xl"
      p={5}
      minW={0}
    >
      <Flex align="center" gap={4}>
        <Flex
          w="44px"
          h="44px"
          borderRadius="lg"
          bg={iconBg}
          align="center"
          justify="center"
          flexShrink={0}
        >
          <IconComponent size={20} color={iconColor} />
        </Flex>
        <Box>
          <Text fontSize="sm" color="gray.500" fontWeight={500} mb="1px">
            {label}
          </Text>
          <Text fontSize="2xl" fontWeight={700} color={countColor} lineHeight={1}>
            {count}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

// ─── Table Row ────────────────────────────────────────────────────────────────

interface LeadRowProps {
  lead: Lead;
  onView: (lead: Lead) => void;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
  onMarkRead: (id: number) => void;
  onMarkProcessed: (id: number) => void;
}

function LeadRow({
  lead,
  onView,
  onEdit,
  onDelete,
  onMarkRead,
  onMarkProcessed,
}: LeadRowProps) {
  return (
    <Box
      borderBottom="1px solid"
      borderColor="gray.100"
      px={5}
      py={4}
      _hover={{ bg: "gray.50" }}
      transition="background 0.15s"
      bg={!lead.isRead ? "#FEFCF8" : "white"}
    >
      <Flex align="center" gap={4}>
        {/* Unread dot */}
        <Box
          w="8px"
          h="8px"
          borderRadius="full"
          bg={!lead.isRead ? WEBSITE_THEME_COLOR : "transparent"}
          flexShrink={0}
        />

        {/* Avatar */}
        <Flex
          w="40px"
          h="40px"
          borderRadius="lg"
          bg={BRAND_COLORS[50]}
          border="1px solid"
          borderColor={BRAND_COLORS[200]}
          align="center"
          justify="center"
          flexShrink={0}
        >
          <User size={16} color={WEBSITE_THEME_COLOR} />
        </Flex>

        {/* Content */}
        <Box flex={1} minW={0}>
          <Flex align="center" gap={2} mb={1}>
            <Text
              fontWeight={600}
              fontSize="sm"
              color="gray.800"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {lead.fullName}
            </Text>
            {!lead.isRead && (
              <Badge
                px={2}
                py="2px"
                borderRadius="md"
                fontSize="xs"
                fontWeight={600}
                color={WEBSITE_THEME_COLOR}
                bg={BRAND_COLORS[50]}
                border="1px solid"
                borderColor={BRAND_COLORS[200]}
              >
                New
              </Badge>
            )}
          </Flex>
          <Text
            fontSize="xs"
            color="gray.500"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {lead.email}
          </Text>
        </Box>

        {/* Info columns - hide on small screens */}
        <HStack
          gap={6}
          display={{ base: "none", lg: "flex" }}
          flexShrink={0}
        >
          <Box minW="100px">
           
            <Text fontSize="sm" color="gray.700" whiteSpace="nowrap">
              {lead.phoneNumber}
            </Text>
          </Box>
          <Box minW="110px">
            {/* <Text fontSize="xs" color="gray.400" mb="2px">
              Subject
            </Text> */}
            <Badge
              variant="subtle"
              colorPalette="gray"
              borderRadius="full"
              fontSize="xs"
              px={2}
            >
              {getSubjectLabel(lead.subject)}
            </Badge>
          </Box>
          <Box minW="100px">
            {/* <Text fontSize="xs" color="gray.400" mb="2px">
              Location
            </Text> */}
            <Text
              fontSize="sm"
              color="gray.700"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              maxW="100px"
            >
              {lead.location || "—"}
            </Text>
          </Box>
          <Box minW="100px">
            {/* <Text fontSize="xs" color="gray.400" mb="2px">
              Status
            </Text> */}
            <HStack gap={1}>
              <Badge
                variant="subtle"
                colorPalette={lead.isRead ? "green" : "orange"}
                borderRadius="full"
                fontSize="xs"
                px={2}
              >
                {lead.isRead ? "Read" : "Unread"}
              </Badge>
              <Badge
                variant="subtle"
                colorPalette={lead.isProcessed ? "green" : "gray"}
                borderRadius="full"
                fontSize="xs"
                px={2}
              >
                {lead.isProcessed ? "Processed" : "Pending"}
              </Badge>
            </HStack>
          </Box>
          <Box minW="90px">
            {/* <Text fontSize="xs" color="gray.400" mb="2px">
              Created
            </Text> */}
            <Text fontSize="sm" color="gray.700" whiteSpace="nowrap">
              {formatDate(lead.createdAt)}
            </Text>
          </Box>
        </HStack>

        {/* Actions */}
        <Flex flexShrink={0}>
          <Menu.Root>
            <Menu.Trigger asChild>
              <IconButton
                size="sm"
                variant="ghost"
                color="gray.400"
                _hover={{ bg: "gray.100", color: "gray.600" }}
                borderRadius="md"
              >
                <EllipsisVertical size={16} />
              </IconButton>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content borderRadius="lg" boxShadow="lg" minW="180px">
                  <Menu.Item value="view" gap={2} onClick={() => onView(lead)}>
                    <Eye size={14} />
                    View Details
                  </Menu.Item>
                  <Menu.Item value="edit" gap={2} onClick={() => onEdit(lead)}>
                    <Pencil size={14} />
                    Edit
                  </Menu.Item>
                  {!lead.isRead && (
                    <Menu.Item
                      value="mark-read"
                      gap={2}
                      onClick={() => onMarkRead(lead.id)}
                    >
                      <CheckCircle2 size={14} color="#22C55E" />
                      Mark as Read
                    </Menu.Item>
                  )}
                  {!lead.isProcessed && (
                    <Menu.Item
                      value="mark-processed"
                      gap={2}
                      onClick={() => onMarkProcessed(lead.id)}
                    >
                      <CircleDot size={14} color="#3B82F6" />
                      Mark as Processed
                    </Menu.Item>
                  )}
                  <Menu.Item
                    value="delete"
                    gap={2}
                    color="red.500"
                    _hover={{ bg: "red.50" }}
                    onClick={() => onDelete(lead)}
                  >
                    <Trash2 size={14} />
                    Delete
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Flex>
      </Flex>

      {/* Mobile details */}
      <Box display={{ base: "block", lg: "none" }} mt={3} pl={12}>
        <HStack gap={4} flexWrap="wrap">
          <HStack gap={1}>
            <PhoneIcon size={12} color="gray.400" />
            <Text fontSize="xs" color="gray.600">
              {lead.phoneNumber}
            </Text>
          </HStack>
          <HStack gap={1}>
            <MapPin size={12} color="gray.400" />
            <Text fontSize="xs" color="gray.600">
              {lead.location || "—"}
            </Text>
          </HStack>
        </HStack>
        <HStack gap={2} mt={2}>
          <Badge
            variant="subtle"
            colorPalette={lead.isRead ? "green" : "orange"}
            borderRadius="full"
            fontSize="xs"
            px={2}
          >
            {lead.isRead ? "Read" : "Unread"}
          </Badge>
          <Badge
            variant="subtle"
            colorPalette={lead.isProcessed ? "green" : "gray"}
            borderRadius="full"
            fontSize="xs"
            px={2}
          >
            {lead.isProcessed ? "Processed" : "Pending"}
          </Badge>
          <Badge variant="subtle" colorPalette="gray" borderRadius="full" fontSize="xs" px={2}>
            {getSubjectLabel(lead.subject)}
          </Badge>
        </HStack>
      </Box>
    </Box>
  );
}

// ─── Skeleton Loading ─────────────────────────────────────────────────────────

function TableSkeleton() {
  return (
    <Box bg="white" borderRadius="xl" border="1px solid" borderColor="gray.200" overflow="hidden">
      {Array.from({ length: 5 }).map((_, i) => (
        <Box
          key={i}
          borderBottom="1px solid"
          borderColor="gray.100"
          px={5}
          py={4}
        >
          <Flex align="center" gap={4}>
            <Skeleton boxSize="8px" borderRadius="full" />
            <Skeleton boxSize="40px" borderRadius="lg" />
            <Box flex={1}>
              <Skeleton height="14px" width="40%" borderRadius="md" mb={2} />
              <Skeleton height="12px" width="30%" borderRadius="md" />
            </Box>
            <HStack gap={6} display={{ base: "none", lg: "flex" }}>
              <Skeleton height="14px" width="80px" borderRadius="md" />
              <Skeleton height="14px" width="80px" borderRadius="md" />
              <Skeleton height="14px" width="80px" borderRadius="md" />
              <Skeleton height="20px" width="120px" borderRadius="md" />
              <Skeleton height="14px" width="70px" borderRadius="md" />
            </HStack>
            <Skeleton boxSize="28px" borderRadius="md" />
          </Flex>
        </Box>
      ))}
    </Box>
  );
}

function CardSkeleton() {
  return (
    <Box
      flex={1}
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="xl"
      p={5}
    >
      <Flex align="center" gap={4}>
        <Skeleton boxSize="44px" borderRadius="lg" />
        <Box>
          <Skeleton height="12px" width="60px" borderRadius="md" mb={2} />
          <Skeleton height="24px" width="40px" borderRadius="md" />
        </Box>
      </Flex>
    </Box>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LeadsPage() {
  // Pagination
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // Filters
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [readFilter, setReadFilter] = useState("");
  const [processedFilter, setProcessedFilter] = useState("");

  // Debounced search values
  const [debouncedName, setDebouncedName] = useState("");
  const [debouncedEmail, setDebouncedEmail] = useState("");

  // Debounce name
  const nameTimerRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  const handleNameChange = useCallback((value: string) => {
    setNameFilter(value);
    clearTimeout(nameTimerRef.current);
    nameTimerRef.current = setTimeout(() => {
      setDebouncedName(value);
      setPage(0);
    }, 400);
  }, []);

  // Debounce email
  const emailTimerRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  const handleEmailChange = useCallback((value: string) => {
    setEmailFilter(value);
    clearTimeout(emailTimerRef.current);
    emailTimerRef.current = setTimeout(() => {
      setDebouncedEmail(value);
      setPage(0);
    }, 400);
  }, []);

  // Query params
  const queryParams = useMemo(() => ({
    ...(debouncedName ? { fullName: debouncedName } : {}),
    ...(debouncedEmail ? { email: debouncedEmail } : {}),
    ...(subjectFilter ? { subject: subjectFilter } : {}),
    ...(readFilter === "read" ? { isRead: true } : readFilter === "unread" ? { isRead: false } : {}),
    ...(processedFilter === "processed" ? { isProcessed: true } : processedFilter === "unprocessed" ? { isProcessed: false } : {}),
    pageable: { page, size: pageSize },
  }), [debouncedName, debouncedEmail, subjectFilter, readFilter, processedFilter, page, pageSize]);

  // Queries
  const { data: leadsData, isLoading } = useLeads(queryParams);
  const { data: unreadCount, isLoading: unreadLoading } = useUnreadLeadCount();
  const { data: unprocessedCount, isLoading: unprocessedLoading } = useUnprocessedLeadCount();

  // Mutations
  const deleteMutation = useDeleteLeadMutation();
  const markReadMutation = useMarkLeadAsReadMutation();
  const markProcessedMutation = useMarkLeadAsProcessedMutation();

  // State
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [viewLead, setViewLead] = useState<Lead | null>(null);
  const [deleteLeadTarget, setDeleteLeadTarget] = useState<Lead | null>(null);

  // Data
  const leads = leadsData?.content || [];
  const totalPages = leadsData?.totalPages || 0;
  const totalElements = leadsData?.totalElements || 0;

  const hasFilters = debouncedName || debouncedEmail || subjectFilter || readFilter || processedFilter;

  const clearFilters = () => {
    setNameFilter("");
    setEmailFilter("");
    setSubjectFilter("");
    setReadFilter("");
    setProcessedFilter("");
    setDebouncedName("");
    setDebouncedEmail("");
    setPage(0);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(0);
  };

  return (
    <VStack gap={6} align="stretch">
      {/* Header */}
      <Flex justify="space-between" align="flex-start" flexWrap="wrap" gap={3}>
        <Box>
          <Text fontWeight={700} fontSize="2xl" color="gray.900" mb={1}>
            Leads
          </Text>
          <Text fontSize="sm" color="gray.500">
            Manage and follow up with customer inquiries.
          </Text>
        </Box>
      </Flex>

      {/* Stat Cards */}
      <Flex gap={4} flexWrap={{ base: "wrap", md: "nowrap" }}>
        {unreadLoading ? (
          <CardSkeleton />
        ) : (
          <StatCard
            label="Total Leads"
            count={totalElements}
            iconBg="#EFF6FF"
            iconColor="#3B82F6"
            countColor="#3B82F6"
            borderColor="#BFDBFE"
            IconComponent={MessageSquare}
          />
        )}
        {unreadLoading ? (
          <CardSkeleton />
        ) : (
          <StatCard
            label="Unread Leads"
            count={unreadCount ?? 0}
            iconBg="#FEF2F2"
            iconColor={WEBSITE_THEME_COLOR}
            countColor={WEBSITE_THEME_COLOR}
            borderColor="#FECACA"
            IconComponent={Mail}
          />
        )}
        {unprocessedLoading ? (
          <CardSkeleton />
        ) : (
          <StatCard
            label="Unprocessed"
            count={unprocessedCount ?? 0}
            iconBg="#FFFBEB"
            iconColor="#F59E0B"
            countColor="#F59E0B"
            borderColor="#FDE68A"
            IconComponent={Clock}
          />
        )}
      </Flex>

      {/* Filters */}
      <Box bg="white" borderRadius="xl" border="1px solid" borderColor="gray.200" p={4}>
        <Flex align="center" gap={2} mb={3}>
          <Filter size={16} color="gray.500" />
          <Text fontSize="sm" fontWeight={600} color="gray.700">
            Filters
          </Text>
          {hasFilters && (
            <Button
              size="xs"
              variant="ghost"
              color={WEBSITE_THEME_COLOR}
              onClick={clearFilters}
              gap={1}
            >
              <X size={12} />
              Clear
            </Button>
          )}
        </Flex>
        <Flex gap={3} flexWrap="wrap">
          <Box flex="1" minW="150px">
            <Text fontSize="xs" color="gray.500" mb={1} fontWeight={500}>
              Name
            </Text>
            <input
              type="text"
              value={nameFilter}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Search by name..."
              style={{
                width: "100%",
                padding: "8px 12px",
                fontSize: "14px",
                border: "1px solid",
                borderColor: "#E2E8F0",
                borderRadius: "8px",
                outline: "none",
                background: "white",
              }}
            />
          </Box>
          <Box flex="1" minW="150px">
            <Text fontSize="xs" color="gray.500" mb={1} fontWeight={500}>
              Email
            </Text>
            <input
              type="text"
              value={emailFilter}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="Search by email..."
              style={{
                width: "100%",
                padding: "8px 12px",
                fontSize: "14px",
                border: "1px solid",
                borderColor: "#E2E8F0",
                borderRadius: "8px",
                outline: "none",
                background: "white",
              }}
            />
          </Box>
          <Box minW="150px">
            <Text fontSize="xs" color="gray.500" mb={1} fontWeight={500}>
              Subject
            </Text>
            <select
              value={subjectFilter}
              onChange={(e) => {
                setSubjectFilter(e.target.value);
                setPage(0);
              }}
              style={{
                width: "100%",
                padding: "8px 12px",
                fontSize: "14px",
                border: "1px solid",
                borderColor: "#E2E8F0",
                borderRadius: "8px",
                outline: "none",
                background: "white",
                cursor: "pointer",
              }}
            >
              {SUBJECT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </Box>
          <Box minW="130px">
            <Text fontSize="xs" color="gray.500" mb={1} fontWeight={500}>
              Read Status
            </Text>
            <select
              value={readFilter}
              onChange={(e) => {
                setReadFilter(e.target.value);
                setPage(0);
              }}
              style={{
                width: "100%",
                padding: "8px 12px",
                fontSize: "14px",
                border: "1px solid",
                borderColor: "#E2E8F0",
                borderRadius: "8px",
                outline: "none",
                background: "white",
                cursor: "pointer",
              }}
            >
              {READ_FILTER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </Box>
          <Box minW="140px">
            <Text fontSize="xs" color="gray.500" mb={1} fontWeight={500}>
              Processed Status
            </Text>
            <select
              value={processedFilter}
              onChange={(e) => {
                setProcessedFilter(e.target.value);
                setPage(0);
              }}
              style={{
                width: "100%",
                padding: "8px 12px",
                fontSize: "14px",
                border: "1px solid",
                borderColor: "#E2E8F0",
                borderRadius: "8px",
                outline: "none",
                background: "white",
                cursor: "pointer",
              }}
            >
              {PROCESSED_FILTER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </Box>
        </Flex>
      </Box>

      {/* Table */}
      {isLoading ? (
        <TableSkeleton />
      ) : leads.length === 0 ? (
        <Box
          bg="white"
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.200"
        >
          <PageNoData
            title={hasFilters ? "No leads match your filters" : "No leads found"}
            description={
              hasFilters
                ? "Try adjusting your filters to find what you're looking for."
                : "No customer inquiries have been received yet."
            }
          />
        </Box>
      ) : (
        <Box
          bg="white"
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.200"
          overflow="hidden"
        >
          {/* Table header */}
          <Box
            borderBottom="1px solid"
            borderColor="gray.200"
            bg="gray.50"
            px={5}
            py={3}
            display={{ base: "none", lg: "block" }}
          >
            <HStack gap={6} align="center">
              <Box w="8px" />
              <Box w="40px" />
              <Box flex={1}>
                <Text fontSize="xs" fontWeight={600} color="gray.500" textTransform="uppercase" letterSpacing="wider">
                  Contact
                </Text>
              </Box>
              <HStack gap={6} flexShrink={0}>
                <Text fontSize="xs" fontWeight={600} color="gray.500" textTransform="uppercase" letterSpacing="wider" minW="100px">
                  Phone
                </Text>
                <Text fontSize="xs" fontWeight={600} color="gray.500" textTransform="uppercase" letterSpacing="wider" minW="110px">
                  Subject
                </Text>
                <Text fontSize="xs" fontWeight={600} color="gray.500" textTransform="uppercase" letterSpacing="wider" minW="100px">
                  Location
                </Text>
                <Text fontSize="xs" fontWeight={600} color="gray.500" textTransform="uppercase" letterSpacing="wider" minW="100px">
                  Status
                </Text>
                <Text fontSize="xs" fontWeight={600} color="gray.500" textTransform="uppercase" letterSpacing="wider" minW="90px">
                  Created
                </Text>
              </HStack>
              <Box w="28px" />
            </HStack>
          </Box>

          {/* Rows */}
          {leads.map((lead) => (
            <LeadRow
              key={lead.id}
              lead={lead}
              onView={setViewLead}
              onEdit={setSelectedLead}
              onDelete={setDeleteLeadTarget}
              onMarkRead={(id) => markReadMutation.mutate(id)}
              onMarkProcessed={(id) => markProcessedMutation.mutate(id)}
            />
          ))}
        </Box>
      )}

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <Flex justify="space-between" align="center" flexWrap="wrap" gap={3}>
          <HStack gap={2}>
            <Text fontSize="sm" color="gray.500">
              Page size:
            </Text>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              style={{
                padding: "6px 10px",
                fontSize: "13px",
                border: "1px solid #E2E8F0",
                borderRadius: "6px",
                outline: "none",
                background: "white",
                cursor: "pointer",
              }}
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <Text fontSize="sm" color="gray.500">
              of {totalElements} leads
            </Text>
          </HStack>
          <Pagination
            totalPages={totalPages}
            currentPage={page + 1}
            pageSize={pageSize}
            onPageChange={(newPage) => setPage(newPage - 1)}
          />
        </Flex>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        isOpen={!!deleteLeadTarget}
        onClose={() => setDeleteLeadTarget(null)}
        onConfirm={() => {
          if (deleteLeadTarget) {
            deleteMutation.mutate(deleteLeadTarget.id, {
              onSuccess: () => {
                setDeleteLeadTarget(null);
                setViewLead(null);
              },
            });
          }
        }}
        title="Delete Lead"
        description={`Are you sure you want to delete the lead from "${deleteLeadTarget?.fullName}"? This action cannot be undone.`}
        loading={deleteMutation.isPending}
      />

      {/* Lead Detail Modal */}
      <LeadDetailModal
        lead={viewLead}
        isOpen={!!viewLead}
        onClose={() => setViewLead(null)}
        onEdit={(lead) => {
          setViewLead(null);
          setSelectedLead(lead);
        }}
      />

      {/* Edit Lead Modal */}
      <EditLeadModal
        lead={selectedLead}
        isOpen={!!selectedLead}
        onClose={() => setSelectedLead(null)}
      />
    </VStack>
  );
}
