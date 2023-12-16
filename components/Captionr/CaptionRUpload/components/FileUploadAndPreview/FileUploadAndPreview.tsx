/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
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
  generationDone,
}: {
  _setFile: (file: string | ArrayBuffer | null) => void;
  setFileUrl: (fileUrl: string) => void;
  setSnackBarMessage: (snackBarMessage: string) => void;
  setSnackBarOpen: (snackBarOpen: boolean) => void;
  setStorageRefName: (storageRefName: string) => void;
  generationDone: boolean;
}): JSX.Element => {
  const theme = useTheme();
  const [file, setFile] = React.useState<string | ArrayBuffer | null>(null);

  const handleError = () => {
    setSnackBarMessage("Error getting file url");
    setSnackBarOpen(true);
  };

  const uploadFile = (e: any) => {
    // Get the URL of the uploaded file
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFile(reader.result);
        _setFile(reader.result);

        // upload the file to firebase
        const storage = getStorage();
        const storageRefName = "captionr/" + file.name;
        const storageRef = ref(storage, storageRefName);

        uploadBytes(storageRef, file)
          .then((snapshot) => {
            // get the url of the uploaded file
            getDownloadURL(storageRef)
              .then((url) => {
                setFileUrl(url);
                setSnackBarMessage("File uploaded successfully");
                setSnackBarOpen(true);
              })
              .catch((error) => {
                handleError();
              });

            setStorageRefName(storageRefName);
          })
          .catch((error) => {
            handleError();
          });
      };
    }
  };

  useEffect(() => {
    if (generationDone) {
      setFile(null);
      _setFile(null);
    }
  }, [generationDone]);

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
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            Upload an Image or Paste an Image URL to Get Started
          </Typography>
        </Box>
        <Box marginBottom={1}>
          {file && (
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
              <Image
                src={file as string}
                width={300}
                height={300}
                alt="Uploaded Image"
                style={{
                  borderRadius: 10,
                }}
              />
            </Box>
          )}
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
