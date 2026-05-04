import * as React from "react";
import { Slider as ChakraSlider, For, HStack } from "@chakra-ui/react";
import { SliderMarksProps, SliderProps } from "@/shared/types";

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  function Slider(props, ref) {
    const { marks: marksProp, label, showValue, ...rest } = props;
    const value = props.defaultValue ?? props.value;

    const marks = marksProp?.map((mark) => {
      if (typeof mark === "number") return { value: mark, label: undefined };
      return mark;
    });

    const hasMarkLabel = !!marks?.some((mark) => mark.label);

    return (
      <ChakraSlider.Root ref={ref} thumbAlignment="center" {...rest}>
        {label && !showValue && (
          <ChakraSlider.Label>{label}</ChakraSlider.Label>
        )}
        {label && showValue && (
          <HStack justify="space-between">
            <ChakraSlider.Label>{label}</ChakraSlider.Label>
            <ChakraSlider.ValueText />
          </HStack>
        )}
        <ChakraSlider.Control data-has-mark-label={hasMarkLabel || undefined}>
          <ChakraSlider.Track bg="#E0E0E0">
            {" "}
            {/* Track background */}
            <ChakraSlider.Range bg="#00BFFF" /> {/* Active range color */}
          </ChakraSlider.Track>
          <SliderThumbs value={value} />
          <SliderMarks marks={marks} />
        </ChakraSlider.Control>
      </ChakraSlider.Root>
    );
  }
);

function SliderThumbs(props: { value?: number[] }) {
  const { value } = props;
  return (
    <For each={value}>
      {(_, index) => (
        <ChakraSlider.Thumb
          key={index}
          index={index}
          bg="#00BFFF" // Thumb color
          border="2px solid white"
          _hover={{ bg: "#00BFFF" }} // Darker on hover
        >
          <ChakraSlider.HiddenInput />
        </ChakraSlider.Thumb>
      )}
    </For>
  );
}

const SliderMarks = React.forwardRef<HTMLDivElement, SliderMarksProps>(
  function SliderMarks(props, ref) {
    const { marks } = props;
    if (!marks?.length) return null;

    return (
      <ChakraSlider.MarkerGroup ref={ref}>
        {marks.map((mark, index) => {
          const value = typeof mark === "number" ? mark : mark.value;
          const label = typeof mark === "number" ? undefined : mark.label;
          return (
            <ChakraSlider.Marker key={index} value={value}>
              <ChakraSlider.MarkerIndicator
                bg="#00BFFF" // Marker dot color
              />
              {label}
            </ChakraSlider.Marker>
          );
        })}
      </ChakraSlider.MarkerGroup>
    );
  }
);
