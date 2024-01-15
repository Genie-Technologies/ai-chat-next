import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

interface Props {
  colorInvert?: boolean;
}

const TopNav = ({ colorInvert = false }: Props): JSX.Element => {
  return (
    <Box display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
      <Box
        marginRight={{ xs: 1, sm: 2 }}
        display={process.env.CHAT_FEATURE_ENABLED === "true" ? "block" : "none"}
      >
        <Link
          underline="none"
          component="a"
          href="/chat"
          color={colorInvert ? "common.white" : "text.primary"}
          sx={{
            alignItems: "center",
          }}
        > 
          Try Now
          <Box
            padding={0.5}
            display={"inline-flex"}
            borderRadius={1}
            bgcolor={"primary.main"}
            marginLeft={1}
          >
            <Typography
              variant={"caption"}
              sx={{ color: "common.white", lineHeight: 1 }}
            >
              new
            </Typography>
          </Box>
        </Link>
      </Box>
    </Box>
  );
};

export default TopNav;
