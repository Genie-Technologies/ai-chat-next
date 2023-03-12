/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import Image from "next/image";

const FileUploadAndPreview = ({
  _setFile,
}: {
  _setFile: (file: string | ArrayBuffer | null) => void;
}): JSX.Element => {
  const theme = useTheme();
  const [file, setFile] = React.useState<string | ArrayBuffer | null>(null);

  const uploadFile = (e: any) => {
    console.log(e.target.files);
    // Get the URL of the uploaded file
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
        setFile(reader.result);
        _setFile(reader.result);
      };
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        borderRadius: 2,
        padding: 2,
      }}
    >
      <Box>
        <Box marginBottom={1}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
            }}
          >
            Try For Free
          </Typography>
        </Box>
      </Box>
      {false && (
        <Box marginBottom={2}>
          {/** Preview of the image file uploaded */}
          <Box
            sx={{
              height: 300,
              width: 300,
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={file as string}
              alt="Uploaded Image"
              width={300}
              height={300}
            />
          </Box>
        </Box>
      )}
      {/* <Box marginY={3}>
        <Button
          variant="contained"
          component="label"
          startIcon={<FileUploadOutlinedIcon />}
          onChange={uploadFile}
          size="large"
        >
          Upload File
          <input type="file" hidden accept="image/png, image/jpeg" />
        </Button>
      </Box> */}
    </Box>
  );
};

export default FileUploadAndPreview;
