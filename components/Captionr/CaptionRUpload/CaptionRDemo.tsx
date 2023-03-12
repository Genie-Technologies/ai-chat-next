import React from "react";
import Grid from "@mui/material/Grid";
import { FileUploadAndPreview, Form } from "./components";

import Container from "../../Container";
import { Stack } from "@mui/material";

const Contact = (): JSX.Element => {
  const [file, setFile] = React.useState<string | ArrayBuffer | null>(null);

  return (
    <Container>
      <Stack spacing={2}>
        <Grid item xs={12} md={4}>
          <FileUploadAndPreview setFile={setFile} />
        </Grid>
        <Grid item container xs={12} md={10} lg={12} alignItems={"center"}>
          <Form file={file} />
        </Grid>
      </Stack>
    </Container>
  );
};

export default Contact;
