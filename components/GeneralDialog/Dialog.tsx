import MUIDialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";

type DialogProps = {
  open: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
  showActions?: boolean;
  title?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
};

export default function Dialog({
  open,
  handleClose,
  children = null,
  showActions = false,
  title = "",
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel",
}: DialogProps) {
  const theme = useTheme();

  return (
    <MUIDialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      {title && <DialogTitle>{title}</DialogTitle>}
      {children && (
        <DialogContent
          sx={{
            backgroundColor: theme.palette.background.paper,
          }}
        >
          {children}
        </DialogContent>
      )}
      {showActions && (
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            {cancelButtonText}
          </Button>
          <Button onClick={handleClose} variant="contained" color="success">
            {confirmButtonText}
          </Button>
        </DialogActions>
      )}
    </MUIDialog>
  );
}
