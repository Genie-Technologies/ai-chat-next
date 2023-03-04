import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  color: "secondary" | "success" | "inherit" | "primary";
  variant: "determinate" | "indeterminate";
  sx?: {};
  value?: number;
};

export const CircularLoader = ({ color, variant, value, sx }: Props) => {
  return (
    <div className="circular-loader">
      <CircularProgress
        color={color}
        variant={variant}
        value={value}
        sx={{ ...sx }}
      />
    </div>
  );
};
