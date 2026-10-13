import {
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Upload } from "lucide-react";

export default function UploadDocumentsPage() {
  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4" fontWeight={700}>
          Upload Documents
        </Typography>

        <Typography color="text.secondary">
          Upload supporting documents for your claims.
        </Typography>
      </Stack>

      <Card>
        <CardContent>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Document Name"
            />

            <TextField
              fullWidth
              label="Document Category"
            />

            <Button
              variant="outlined"
              startIcon={<Upload size={18} />}
            >
              Choose File
            </Button>

            <Button
              variant="contained"
              sx={{ alignSelf: "flex-start" }}
            >
              Upload Document
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
``