/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { Alert, Chip, Skeleton } from "@mui/material";
import Stack from "@mui/material/Stack";
import FileUploadAndPreview from "../FileUploadAndPreview/FileUploadAndPreview";
import firebase from "../../../../Shared/firebase";

import Snackbar from "@mui/material/Snackbar";
import { CopyAllOutlined } from "@mui/icons-material";
import { deleteObject, getStorage, ref } from "firebase/storage";

const SocialMedias = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "twitter", label: "Twitter" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "all", label: "All" },
];

const categories = [
  { value: "food", label: "Food" },
  { value: "travel", label: "Travel" },
  { value: "nature", label: "Nature" },
  { value: "people", label: "People" },
  { value: "animals", label: "Animals" },
  { value: "motivation", label: "Motivation" },
  { value: "funny", label: "Funny" },
];

firebase();

const Form = (): JSX.Element => {
  const theme = useTheme();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [caption, setCaption] = React.useState<string>("");
  const [file, setFile] = React.useState<string | ArrayBuffer | null>(null);

  const [fileUrl, setFileUrl] = React.useState<string>("");
  const [snackBarMessage, setSnackBarMessage] = React.useState<string>("");
  const [snackBarOpen, setSnackBarOpen] = React.useState<boolean>(false);
  const [storageRefName, setStorageRefName] = React.useState<string>("");
  const [hashtags, setHashtags] = React.useState<string[]>([]);

  const createCaption = (e: any) => {
    e.preventDefault();
    let imageUrl: any = document.querySelector(
      'input[name="imageUrl"]'
    ) as HTMLInputElement;
    const socialMedia = document.querySelector(
      'input[name="social-media-radio-buttons-group"]:checked'
    ) as HTMLInputElement;
    const category = document.querySelector(
      'input[name="category-radio-buttons-group"]:checked'
    ) as HTMLInputElement;

    if (imageUrl.value === "") {
      imageUrl = file;
    } else {
      imageUrl = imageUrl.value;
    }

    const data = {
      imageFile: imageUrl,
      socialMedia: socialMedia.value,
      category: category.value,
    };

    if (imageUrl && socialMedia && category) {
      setLoading(true);

      fetch("/api/captionr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            // Format the caption
            let formattedCaption = data.message.replace(/'/g, "\\'");
            // if there are hashtags in the caption, put them in an array
            let hashtags = formattedCaption.match(/#[a-zA-Z0-9]+/g);

            // If there are hashtags, remove them from the caption
            if (hashtags) {
              formattedCaption = formattedCaption.replace(/#[a-zA-Z0-9]+/g, "");
            }

            // Set the caption in the state
            setCaption(formattedCaption);
            // Set the hashtags in the state
            setHashtags(hashtags);

            setSnackBarMessage("Caption created successfully!");
            setSnackBarOpen(true);
            // Make the user scroll to the caption section
            let captionSection: any = document.querySelector(
              "#file-section"
            ) as HTMLInputElement;
            captionSection.scrollIntoView({ behavior: "smooth" });
          } else {
            setCaption("");
            setSnackBarMessage("Something went wrong! Please try again later.");
            setSnackBarOpen(true);
          }

          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setSnackBarMessage("Something went wrong!");
          setSnackBarOpen(true);
        })
        .finally(() => {
          setFile(null);
          setFileUrl("");

          // Delete the image from firebase storage
          let storage = getStorage();
          let storageRef = ref(storage, storageRefName);

          deleteObject(storageRef)
            .then(() => {
              console.log("File deleted");
            })
            .catch((error) => {
              console.log("File deletion error: ");
            });
        });
    } else {
      setLoading(false);
    }
  };

  const setUrlInInput = (fileUrlFromFirebase: string) => {
    setFileUrl(fileUrlFromFirebase);
    // set the url in the input field
    let imageUrl: any = document.querySelector(
      'input[name="imageUrl"]'
    ) as HTMLInputElement;
    imageUrl.value = fileUrlFromFirebase;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        width: "100%",
        borderRadius: 10,
        padding: 2,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 0 50px 50px ${theme.palette.primary.main} inset`,
        minWidth: 300,
      }}
    >
      <Stack spacing={2} alignItems="center" maxWidth={700} id="file-section">
        <Box width={1} component={Card} boxShadow={1} padding={2}>
          <FileUploadAndPreview
            _setFile={setFile}
            setFileUrl={setUrlInInput}
            setSnackBarMessage={setSnackBarMessage}
            setSnackBarOpen={setSnackBarOpen}
            setStorageRefName={setStorageRefName}
          />
        </Box>
        <Box
          padding={{ xs: 3, sm: 6 }}
          width={1}
          component={Card}
          boxShadow={caption ? 1 : 0}
          marginBottom={4}
          display={caption ? "block" : "none"}
          sx={{
            backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            color: theme.palette.background.paper,
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",

            "@keyframes gradient": {
              "0%": {
                backgroundPosition: "0% 50%",
              },
              "50%": {
                backgroundPosition: "100% 50%",
              },
              "100%": {
                backgroundPosition: "0% 50%",
              },
            },
          }}
        >
          <Typography
            variant="subtitle1"
            component="h2"
            gutterBottom
            color={"white"}
          >
            {loading ? (
              <Skeleton variant="text" height={100} width={"100%"} />
            ) : (
              caption
            )}

            {hashtags && !loading && (
              <Typography variant="subtitle1" component="h2" gutterBottom>
                {hashtags.map((hashtag: string) => (
                  <Chip
                    label={hashtag}
                    color="secondary"
                    key={hashtag + Math.random()}
                    sx={{
                      margin: 1,
                      backgroundColor: theme.palette.background.paper,
                      color: theme.palette.primary.main,
                      "&:hover": {
                        // Have a hover effect on the hashtags
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.background.default,
                      },
                    }}
                  />
                ))}
              </Typography>
            )}
          </Typography>
          {caption && !loading && (
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={() => {
                // COmbine the caption and hashtags
                let _caption = `${caption} ${hashtags.join(" ")}`;
                navigator.clipboard.writeText(_caption);
                setSnackBarMessage("Copied to clipboard!");
                setSnackBarOpen(true);
              }}
              startIcon={<CopyAllOutlined />}
            >
              Copy
            </Button>
          )}
        </Box>
        <Box
          padding={{ xs: 3, sm: 6 }}
          width={1}
          component={Card}
          boxShadow={1}
          marginBottom={4}
        >
          <form noValidate autoComplete="off">
            <Grid container spacing={4}>
              <Grid item xs={12}>
                {loading ? (
                  <Skeleton
                    variant="text"
                    height={54}
                    width={"100%"}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                    }}
                  />
                ) : (
                  <TextField
                    sx={{ height: 54 }}
                    label="Image URL"
                    type="url"
                    variant="outlined"
                    color="primary"
                    size="medium"
                    name="imageUrl"
                    fullWidth
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <Typography variant="h6" color="secondary">
                    Social Media
                  </Typography>
                  <RadioGroup
                    aria-labelledby="social-media-radio-select"
                    defaultValue={SocialMedias[0].value}
                    name="social-media-radio-buttons-group"
                  >
                    {SocialMedias.map((socialMedia) => (
                      <FormControlLabel
                        key={socialMedia.value}
                        value={socialMedia.value}
                        control={<Radio />}
                        label={socialMedia.label}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <Typography variant="h6" color="secondary">
                    Category
                  </Typography>
                  <RadioGroup
                    aria-labelledby="category-radio-select"
                    defaultValue={categories[0].value}
                    name="category-radio-buttons-group"
                  >
                    {categories.map((category) => (
                      <FormControlLabel
                        key={category.value}
                        value={category.value}
                        control={<Radio />}
                        label={category.label}
                        sx={{
                          color: theme.palette.text.primary,
                          "& .MuiSvgIcon-root": {
                            color: theme.palette.text.primary,
                          },
                        }}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item container justifyContent={"center"} xs={12}>
                {loading ? (
                  <Skeleton
                    variant="rectangular"
                    height={54}
                    width={"100%"}
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                    }}
                  />
                ) : (
                  <Button
                    sx={{ height: 54, minWidth: 150 }}
                    variant="contained"
                    color="primary"
                    size="medium"
                    type="submit"
                    fullWidth
                    onClick={createCaption}
                  >
                    Create Caption
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </Box>
      </Stack>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackBarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success">{snackBarMessage}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Form;
