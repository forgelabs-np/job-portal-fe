"use client";

import React, { useState } from "react";
import { HStack, Box } from "@chakra-ui/react";

import { StarIcon } from "@/assets/svg";
import { StarRatingProps } from "@/shared/types";
import { Checkbox } from "@/shared/components";

export const StarRating: React.FC<StarRatingProps> = ({
  stars = 5,
  onChange,
  isCheckBoxRequired = true,
  fixedRating,
}) => {
  const [rating, setRating] = useState(fixedRating || 0);

  const handleClick = (index: number) => {
    const newRating = index + 1;
    setRating(newRating);
    onChange?.(newRating);
  };

  return (
    <HStack align="center">
      {isCheckBoxRequired && (
        <Checkbox aria-label="Select rating" borderRadius={"4px"} />
      )}

      <HStack>
        {Array.from({ length: stars }, (_, index) => {
          const isFull = index + 1 <= Math.floor(rating);
          const isPartial = index < rating && index + 1 > rating;

          return (
            <Box
              key={index}
              cursor="default"
              aria-label={`Rate ${index + 1} stars`}
              onClick={() => !fixedRating && handleClick(index)}
            >
              <StarIcon
                style={{
                  fill: isFull
                    ? "#FFBE26"
                    : isPartial
                    ? `url(#partial-${index})`
                    : "none",
                  stroke: index < rating ? "#FFBE26" : "black",
                  width: "20px",
                  height: "20px",
                }}
              />
              {isPartial && (
                <svg width="0" height="0">
                  <defs>
                    <linearGradient id={`partial-${index}`}>
                      <stop
                        offset={`${(rating % 1) * 100}%`}
                        stopColor="#FFBE26"
                      />
                      <stop
                        offset={`${(rating % 1) * 100}%`}
                        stopColor="#fff"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              )}
            </Box>
          );
        })}
      </HStack>

      {/* <Text fontSize="sm" fontWeight={500} color="gray.600">
        {rating > 0 ? `${rating} out of ${stars}` : `0 out of ${stars}`}
      </Text> */}
    </HStack>
  );
};
