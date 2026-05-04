import { MultiFilePreviewProps } from "@/shared/types";
import { SingleFilePreview } from "./SingleFilePreview";
import { Grid, GridItem } from "@chakra-ui/react";

export const MultiFilePreview = ({
  value,
  onRemove,
}: MultiFilePreviewProps) => {
  return (
    <Grid
      templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }}
      gapX={5}
      gapY={4}
    >
      {value.map((file, index) => (
        <GridItem key={index}>
          <SingleFilePreview value={file} onRemove={() => onRemove?.(index)} />
        </GridItem>
      ))}
    </Grid>
  );
};
