// "use client";
// import { Fragment, useEffect, useState } from "react";
// import { Heading, HStack, Text, VStack } from "@chakra-ui/react";
// import { Timertype } from "@/shared/types";

// let interval: ReturnType<typeof setInterval>;

// export const Timer = ({ date }: Timertype) => {
//   const [times, setTimes] = useState([
//     {
//       label: "DAYS",
//       value: "00",
//     },
//     {
//       label: "HOURS",
//       value: "00",
//     },
//     {
//       label: "MINS",
//       value: "00",
//     },
//     {
//       label: "SECS",
//       value: "00",
//     },
//   ]);

//   const handleTimer = () => {
//     const { days, hours, minutes, seconds, shouldClearInterval } =
//       calculateTime(date);

//     if (shouldClearInterval) {
//       clearInterval(interval);
//     }

//     setTimes([
//       { label: "DAYS", value: days.toString().padStart(2, "0") },
//       { label: "HOURS", value: hours.toString().padStart(2, "0") },
//       { label: "MINS", value: minutes.toString().padStart(2, "0") },
//       { label: "SECS", value: seconds.toString().padStart(2, "0") },
//     ]);
//   };

//   useEffect(() => {
//     interval = setInterval(handleTimer, 1000);
//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <HStack
//       justifyContent={{
//         base: "space-between",
//         md: "flex-start",
//       }}
//       gap={{
//         md: "24px",
//       }}
//       width="full"
//     >
//       {times.map(({ label, value }, index) => (
//         <Fragment key={label}>
//           <VStack gap="4px" my="24px">
//             <Heading
//               variant={{
//                 md: "heading3",
//               }}
//               fontWeight="400"
//             >
//               {value}
//             </Heading>
//             <Text variant="subtitle2">{label}</Text>
//           </VStack>

//           {index !== times.length - 1 && <Heading>:</Heading>}
//         </Fragment>
//       ))}
//     </HStack>
//   );
// };
