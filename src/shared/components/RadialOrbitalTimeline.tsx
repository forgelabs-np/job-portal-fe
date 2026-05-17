"use client";

import { useState, useEffect, useRef } from "react";
import { Box, Flex, Text, Badge, Button, Card } from "@chakra-ui/react";
import { ArrowRight, Link, Zap } from "lucide-react";

interface TimelineItem {
    id: number;
    title: string;
    date: string;
    content: string;
    category: string;
    icon: React.ElementType;
    relatedIds: number[];
    status: "completed" | "in-progress" | "pending";
    energy: number;
}

interface RadialOrbitalTimelineProps {
    timelineData: TimelineItem[];
}

function getStatusStyles(status: TimelineItem["status"]) {
    switch (status) {
        case "completed":
            return { bg: "white", color: "black", borderColor: "white" };
        case "in-progress":
            return { bg: "blackAlpha.700", color: "white", borderColor: "whiteAlpha.600" };
        case "pending":
        default:
            return { bg: "blackAlpha.400", color: "whiteAlpha.700", borderColor: "whiteAlpha.400" };
    }
}

function getStatusLabel(status: TimelineItem["status"]) {
    if (status === "completed") return "COMPLETE";
    if (status === "in-progress") return "IN PROGRESS";
    return "PENDING";
}

export default function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
    const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
    const [rotationAngle, setRotationAngle] = useState<number>(0);
    const [autoRotate, setAutoRotate] = useState<boolean>(true);
    const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
    const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const orbitRef = useRef<HTMLDivElement>(null);
    const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

    const getRelatedItems = (itemId: number): number[] => {
        const current = timelineData.find((item) => item.id === itemId);
        return current ? current.relatedIds : [];
    };

    const isRelatedToActive = (itemId: number): boolean => {
        if (!activeNodeId) return false;
        return getRelatedItems(activeNodeId).includes(itemId);
    };

    const centerViewOnNode = (nodeId: number) => {
        if (!nodeRefs.current[nodeId]) return;
        const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
        const targetAngle = (nodeIndex / timelineData.length) * 360;
        setRotationAngle(270 - targetAngle);
    };

    const toggleItem = (id: number) => {
        setExpandedItems((prev) => {
            const newState: Record<number, boolean> = {};
            Object.keys(prev).forEach((key) => { newState[parseInt(key)] = false; });
            newState[id] = !prev[id];

            if (!prev[id]) {
                setActiveNodeId(id);
                setAutoRotate(false);
                const pulse: Record<number, boolean> = {};
                getRelatedItems(id).forEach((relId) => { pulse[relId] = true; });
                setPulseEffect(pulse);
                centerViewOnNode(id);
            } else {
                setActiveNodeId(null);
                setAutoRotate(true);
                setPulseEffect({});
            }
            return newState;
        });
    };

    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === containerRef.current || e.target === orbitRef.current) {
            setExpandedItems({});
            setActiveNodeId(null);
            setPulseEffect({});
            setAutoRotate(true);
        }
    };

    useEffect(() => {
        if (!autoRotate) return;
        const timer = setInterval(() => {
            setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
        }, 100);
        return () => clearInterval(timer);
    }, [autoRotate]);

    const calculateNodePosition = (index: number, total: number) => {
        const angle = ((index / total) * 360 + rotationAngle) % 360;
        const radius = 200;
        const radian = (angle * Math.PI) / 180;
        return {
            x: radius * Math.cos(radian),
            y: radius * Math.sin(radian),
            zIndex: Math.round(100 + 50 * Math.cos(radian)),
            opacity: Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))),
        };
    };

    return (
        <Box
            ref={containerRef}
            w="full"
            h="100vh"
            bg="black"
            overflow="hidden"
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={handleContainerClick}
        >
            <Box
                position="relative"
                w="full"
                maxW="4xl"
                h="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Box
                    ref={orbitRef}
                    position="absolute"
                    w="full"
                    h="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    style={{ perspective: "1000px" }}
                >
                    {/* ── Center orb ── */}
                    <Box
                        position="absolute"
                        w="16"
                        h="16"
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        zIndex={10}
                        style={{
                            background: "linear-gradient(135deg, #a855f7, #3b82f6, #14b8a6)",
                            animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
                        }}
                    >
                        <Box
                            position="absolute"
                            w="20"
                            h="20"
                            borderRadius="full"
                            border="1px solid"
                            borderColor="whiteAlpha.200"
                            opacity={0.7}
                            style={{ animation: "ping 1s cubic-bezier(0,0,0.2,1) infinite" }}
                        />
                        <Box
                            position="absolute"
                            w="24"
                            h="24"
                            borderRadius="full"
                            border="1px solid"
                            borderColor="whiteAlpha.100"
                            opacity={0.5}
                            style={{ animation: "ping 1s cubic-bezier(0,0,0.2,1) infinite", animationDelay: "0.5s" }}
                        />
                        <Box w="8" h="8" borderRadius="full" bg="whiteAlpha.800" style={{ backdropFilter: "blur(12px)" }} />
                    </Box>

                    {/* Guidance Text */}
                    <Text
                        position="absolute"
                        top="calc(50% + 60px)"
                        fontSize="xs"
                        color="whiteAlpha.400"
                        letterSpacing="widest"
                        textTransform="uppercase"
                        pointerEvents="none"
                        style={{ animation: "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite" }}
                    >
                        Click icons to expand
                    </Text>

                    <Box
                        position="absolute"
                        w="96"
                        h="96"
                        borderRadius="full"
                        border="1px solid"
                        borderColor="whiteAlpha.100"
                    />

                    {timelineData.map((item, index) => {
                        const pos = calculateNodePosition(index, timelineData.length);
                        const isExpanded = !!expandedItems[item.id];
                        const isRelated = isRelatedToActive(item.id);
                        const isPulsing = !!pulseEffect[item.id];
                        const Icon = item.icon;
                        const statusStyles = getStatusStyles(item.status);
                        const glowSize = item.energy * 0.5 + 40;
                        const glowOffset = (glowSize - 40) / 2;

                        return (
                            <Box
                                key={item.id}
                                ref={(el: HTMLDivElement | null) => { nodeRefs.current[item.id] = el; }}
                                position="absolute"
                                cursor="pointer"
                                transition="all 0.7s"
                                role="group"
                                style={{
                                    transform: `translate(${pos.x}px, ${pos.y}px)`,
                                    zIndex: isExpanded ? 200 : pos.zIndex,
                                    opacity: isExpanded ? 1 : pos.opacity,
                                }}
                                onClick={(e: React.MouseEvent) => { e.stopPropagation(); toggleItem(item.id); }}
                            >
                                {/* Energy glow */}
                                <Box
                                    position="absolute"
                                    borderRadius="full"
                                    pointerEvents="none"
                                    style={{
                                        background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 70%)",
                                        width: `${glowSize}px`,
                                        height: `${glowSize}px`,
                                        left: `-${glowOffset}px`,
                                        top: `-${glowOffset}px`,
                                        animation: isPulsing ? "pulse 1s cubic-bezier(0.4,0,0.6,1) infinite" : undefined,
                                    }}
                                />

                                {/* Icon circle */}
                                <Flex
                                    w="16"
                                    h="16"
                                    borderRadius="full"
                                    alignItems="center"
                                    justifyContent="center"
                                    border="2px solid"
                                    transition="all 0.3s cubic-bezier(0.4,0,0.2,1)"
                                    bg={isExpanded ? "white" : isRelated ? "whiteAlpha.500" : "black"}
                                    color={isExpanded || isRelated ? "black" : "white"}
                                    borderColor={isExpanded || isRelated ? "white" : "whiteAlpha.400"}
                                    boxShadow={isExpanded ? "0 0 20px rgba(255,255,255,0.3)" : undefined}
                                    transform={isExpanded ? "scale(1.5)" : "scale(1)"}
                                    _groupHover={!isExpanded ? {
                                        transform: "scale(1.15)",
                                        borderColor: "whiteAlpha.800",
                                        bg: isRelated ? "whiteAlpha.600" : "whiteAlpha.200",
                                        boxShadow: "0 0 15px rgba(255,255,255,0.15)"
                                    } : {}}
                                    style={{
                                        animation: isRelated ? "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" : undefined,
                                    }}
                                    p={2}
                                >
                                    <Icon size={24} />
                                </Flex>

                                {/* Label */}
                                <Text
                                    position="absolute"
                                    top={isExpanded ? "77px" : "18"}
                                    whiteSpace="nowrap"
                                    fontSize="md"
                                    fontWeight="600"
                                    letterSpacing="wider"
                                    transition="all 0.3s cubic-bezier(0.4,0,0.2,1)"
                                    color={isExpanded ? "white" : "whiteAlpha.700"}
                                    transform={isExpanded ? "scale(1.25)" : "scale(1)"}
                                    _groupHover={!isExpanded ? {
                                        color: "white",
                                        transform: "scale(1.05) translateY(2px)"
                                    } : {}}
                                >
                                    {item.title}
                                </Text>

                                {/* ── Expanded detail card ── */}
                                {isExpanded && (
                                    <Card.Root
                                        position="absolute"
                                        top="28"
                                        left="50%"
                                        w="64"
                                        bg="blackAlpha.900"
                                        border="1px solid"
                                        borderColor="whiteAlpha.300"
                                        borderRadius="lg"
                                        overflow="visible"
                                        style={{
                                            transform: "translateX(-50%)",
                                            backdropFilter: "blur(16px)",
                                            boxShadow: "0 25px 50px rgba(255,255,255,0.08)",
                                        }}
                                    >
                                        {/* connector line */}
                                        <Box
                                            position="absolute"
                                            w="1px"
                                            h="3"
                                            bg="whiteAlpha.500"
                                            style={{ top: "-12px", left: "50%", transform: "translateX(-50%)" }}
                                        />

                                        <Card.Header px={4} pt={4} pb={2}>
                                            <Flex justifyContent="space-between" alignItems="center">
                                                <Badge
                                                    px={2}
                                                    fontSize="2xs"
                                                    borderRadius="sm"
                                                    border="1px solid"
                                                    bg={statusStyles.bg}
                                                    color={statusStyles.color}
                                                    borderColor={statusStyles.borderColor}
                                                >
                                                    {getStatusLabel(item.status)}
                                                </Badge>
                                                <Text fontSize="2xs" fontFamily="mono" color="whiteAlpha.500">
                                                    {item.date}
                                                </Text>
                                            </Flex>
                                            <Text fontSize="sm" fontWeight="700" color="white" mt={2}>
                                                {item.title}
                                            </Text>
                                        </Card.Header>

                                        <Card.Body px={4} pb={4} pt={0}>
                                            <Text fontSize="xs" color="whiteAlpha.800" lineHeight="1.7">
                                                {item.content}
                                            </Text>

                                            {/* Energy bar */}
                                            <Box mt={4} pt={3} borderTop="1px solid" borderColor="whiteAlpha.100">
                                                <Flex justifyContent="space-between" alignItems="center" fontSize="xs" mb={1}>
                                                    <Flex alignItems="center" gap={1} color="whiteAlpha.700">
                                                        <Zap size={10} />
                                                        <Text>Energy Level</Text>
                                                    </Flex>
                                                    <Text fontFamily="mono" color="white">{item.energy}%</Text>
                                                </Flex>
                                                <Box w="full" h="1" bg="whiteAlpha.100" borderRadius="full" overflow="hidden">
                                                    <Box
                                                        h="full"
                                                        borderRadius="full"
                                                        style={{
                                                            width: `${item.energy}%`,
                                                            background: "linear-gradient(to right, #3b82f6, #a855f7)",
                                                        }}
                                                    />
                                                </Box>
                                            </Box>

                                            {/* Connected nodes */}
                                            {item.relatedIds.length > 0 && (
                                                <Box mt={4} pt={3} borderTop="1px solid" borderColor="whiteAlpha.100">
                                                    <Flex alignItems="center" gap={1} mb={2}>
                                                        <Link size={10} color="rgba(255,255,255,0.6)" />
                                                        <Text
                                                            fontSize="2xs"
                                                            textTransform="uppercase"
                                                            letterSpacing="wider"
                                                            color="whiteAlpha.600"
                                                            fontWeight="500"
                                                        >
                                                            Connected Nodes
                                                        </Text>
                                                    </Flex>
                                                    <Flex flexWrap="wrap" gap={1}>
                                                        {item.relatedIds.map((relatedId) => {
                                                            const rel = timelineData.find((i) => i.id === relatedId);
                                                            return (
                                                                <Button
                                                                    key={relatedId}
                                                                    size="xs"
                                                                    variant="outline"
                                                                    h="6"
                                                                    px={2}
                                                                    fontSize="xs"
                                                                    borderRadius="none"
                                                                    borderColor="whiteAlpha.200"
                                                                    color="whiteAlpha.800"
                                                                    bg="transparent"
                                                                    _hover={{ bg: "whiteAlpha.100", color: "white" }}
                                                                    onClick={(e: React.MouseEvent) => {
                                                                        e.stopPropagation();
                                                                        toggleItem(relatedId);
                                                                    }}
                                                                >
                                                                    {rel?.title}
                                                                    <ArrowRight size={8} style={{ marginLeft: 4, opacity: 0.6 }} />
                                                                </Button>
                                                            );
                                                        })}
                                                    </Flex>
                                                </Box>
                                            )}
                                        </Card.Body>
                                    </Card.Root>
                                )}
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
}