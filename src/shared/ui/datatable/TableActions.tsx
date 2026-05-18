import { EditIcon, EyeCloseIcon, EyeIcon, EyeOpenIcon } from "@/assets/svg";
import { TableActionsProps } from "@/shared/datatable";
import { Flex, IconButton } from "@chakra-ui/react";
import { Tooltip } from "../tooltip";
import { DeleteIcon, EyeOff } from "lucide-react";
import { RxEyeOpen } from "react-icons/rx";

export const TableActions = ({
  onView,
  onEdit,
  onDelete,
}: TableActionsProps) => {
  return (
    <Flex alignItems="center" gap="3" >
      {!!onView && (
        <Tooltip content="View">
          <IconButton
            aria-label="View"
            background="transparent"
            _focus={{ backgroundColor: "transparent" }}
            height="6"
            minWidth="6"
            onClick={onView}
            color={"black"}

          >
            <RxEyeOpen />
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
            minWidth="8"
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
            <DeleteIcon onClick={onDelete} />
          </IconButton>
        </Tooltip>
      )}
    </Flex>
  );
};
