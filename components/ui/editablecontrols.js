import { EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  ButtonGroup,
  IconButton,
  Flex,
  useEditableControls,
} from "@chakra-ui/react";

export default function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
      <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : (
    <Flex >
      <IconButton size="lg" width='100%' icon={<EditIcon />} {...getEditButtonProps()} />
    </Flex>
  );
}
