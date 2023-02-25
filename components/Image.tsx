import React from "react";
import NextImage from "next/image";
import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/material/styles";

interface Props {
  src: string;
  imageProps?: {
    width?: string | number;
    height?: string | number;
    layout?: "fill" | "fixed" | "responsive" | "intrinsic";
    // All other props
    [x: string]: any;
  };
  style?: SxProps<Theme>;
  // All other props
  [x: string]: any;
}

const Image = ({
  src,
  imageProps = {},
  style = {},
  ...rest
}: Props): JSX.Element => {
  return (
    <Box
      className={"image"}
      sx={{
        "&.image > span": {
          height: "100% !important",
          width: "100% !important",
        },
        ...style,
      }}
      {...rest}
    >
      <NextImage
        src={src}
        {...imageProps}
        alt="Exampe Image"
        width={1000}
        height={1000}
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
    </Box>
  );
};

export default Image;
