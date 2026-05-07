import { EditIcon, EyeCloseIcon, EyeOpenIcon } from "@/assets/svg";
import { TableActionsProps } from "@/shared/datatable";
import { Flex, IconButton } from "@chakra-ui/react";
import { Tooltip } from "../tooltip";

export const TableActions = ({
  onView,
  onEdit,
  onDelete,
}: TableActionsProps) => {
  return (
    <Flex alignItems="center" gap="3">
      {!!onView && (
        <Tooltip content="View">
          <IconButton
            aria-label="View"
            background="transparent"
            _focus={{ backgroundColor: "transparent" }}
            height="6"
            minWidth="6"
            onClick={onView}
          >
            <EyeOpenIcon />
          </IconButton>
        </Tooltip>
      )}

      {!!onEdit && (
        <Tooltip content="Edit">
          <IconButton
            aria-label="Edit"
            background="transparent"
            _focus={{
              backgroundColor: "transparent",
            }}
            height="6"
            minWidth="6"
            color={"black"}
          >
            <EditIcon onClick={onEdit} />
          </IconButton>
        </Tooltip>
      )}

      {!!onDelete && (
        <Tooltip content="Delete">
          <IconButton
            aria-label="Delete"
            background="transparent"
            _focus={{
              backgroundColor: "transparent",
            }}
            height="6"
            minWidth="6"
          >
            {/* <DeleteIcon onClick={onDelete} /> */}
          </IconButton>
        </Tooltip>
      )}
    </Flex>
  );
};
