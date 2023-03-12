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
import { Skeleton } from "@mui/material";
import Stack from "@mui/material/Stack";
import FileUploadAndPreview from "../FileUploadAndPreview/FileUploadAndPreview";

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

const Form = (): JSX.Element => {
  const theme = useTheme();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [caption, setCaption] = React.useState<string>("");
  const [file, setFile] = React.useState<string | ArrayBuffer | null>(null);

  const createCaption = (e: any) => {
    setLoading(true);
    e.preventDefault();
    console.log("create caption");
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

    console.log(data);

    if (imageUrl && socialMedia && category) {
      fetch("/api/captionr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(" RESULT: ", data);
          setLoading(false);
          setCaption(data.message);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
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
      <Stack spacing={2} alignItems="center" maxWidth={700}>
        <Box width={1} component={Card} boxShadow={1} padding={2}>
          <FileUploadAndPreview _setFile={setFile} />
        </Box>
        <Box
          padding={{ xs: 3, sm: 6 }}
          width={1}
          component={Card}
          boxShadow={caption ? 1 : 0}
          marginBottom={4}
          display={caption ? "block" : "none"}
          sx={{
            // have a gradient background
            backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            color: theme.palette.background.paper,
            // Animate the gradient
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
          <Typography variant="subtitle1" component="h2" gutterBottom>
            {loading ? (
              <Skeleton variant="text" height={100} width={"100%"} />
            ) : (
              caption
            )}
          </Typography>
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
              </Grid>
            </Grid>
          </form>
        </Box>
      </Stack>
    </Box>
  );
};

export default Form;
