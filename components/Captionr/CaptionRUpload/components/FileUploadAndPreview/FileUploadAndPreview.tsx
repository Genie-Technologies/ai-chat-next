/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import Image from "next/image";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebase from "../../../../Shared/firebase";

firebase();

const FileUploadAndPreview = ({
  _setFile,
  setFileUrl,
  setSnackBarMessage,
  setSnackBarOpen,
  setStorageRefName,
}: {
  _setFile: (file: string | ArrayBuffer | null) => void;
  setFileUrl: (fileUrl: string) => void;
  setSnackBarMessage: (snackBarMessage: string) => void;
  setSnackBarOpen: (snackBarOpen: boolean) => void;
  setStorageRefName: (storageRefName: string) => void;
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

        // upload the file to firebase
        const storage = getStorage();
        const storageRefName = "captionr/" + file.name;
        const storageRef = ref(storage, storageRefName);

        uploadBytes(storageRef, file)
          .then((snapshot) => {
            console.log("Uploaded a blob or file! ", snapshot);

            // get the url of the uploaded file
            getDownloadURL(storageRef)
              .then((url) => {
                setFileUrl(url);
                setSnackBarMessage("File uploaded successfully");
                setSnackBarOpen(true);
              })
              .catch((error) => {
                console.log(error);
                setSnackBarMessage("Error getting file url");
                setSnackBarOpen(true);
              });

            setStorageRefName(storageRefName);
          })
          .catch((error) => {
            console.log(error);
            setSnackBarMessage("Error uploading file");
            setSnackBarOpen(true);
          });
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
      <Box marginY={3}>
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
      </Box>
    </Box>
  );
};

export default FileUploadAndPreview;
