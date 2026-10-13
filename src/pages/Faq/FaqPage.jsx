import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    category: "Claims",
    question: "How long does claim processing take?",
    answer:
      "Most claims are processed within 7-15 business days after all required documents are submitted.",
  },
  {
    category: "Claims",
    question: "Can I track my claim online?",
    answer:
      "Yes. Navigate to the Claim Tracking section from the sidebar to view real-time progress.",
  },
  {
    category: "Documents",
    question: "What documents are required for a claim?",
    answer:
      "Typically government ID proof, policy information, invoices, incident evidence and supporting documentation are required.",
  },
  {
    category: "Payments",
    question: "How are settlement amounts paid?",
    answer:
      "Approved settlements are transferred to the registered bank account associated with the claim.",
  },
  {
    category: "Policies",
    question: "Can I submit multiple claims under one policy?",
    answer:
      "Yes, provided the policy coverage and claim conditions are satisfied.",
  },
];

export default function FaqPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const categoryMatch =
        category === "All" ||
        faq.category === category;

      const searchMatch =
        faq.question
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        faq.answer
          .toLowerCase()
          .includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [search, category]);

  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h4" fontWeight={700}>
          Frequently Asked Questions
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Find answers to common questions regarding claims,
          policies, documents, payments and account management.
        </Typography>
      </Box>

      <TextField
        fullWidth
        placeholder="Search questions..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
      >
        {[
          "All",
          "Claims",
          "Documents",
          "Payments",
          "Policies",
        ].map((item) => (
          <Chip
            key={item}
            label={item}
            clickable
            color={
              category === item
                ? "primary"
                : "default"
            }
            onClick={() => setCategory(item)}
          />
        ))}
      </Stack>

      <Stack spacing={2}>
        {filteredFaqs.map((faq, index) => (
          <Accordion
            key={index}
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ChevronDown size={18} />}
            >
              <Typography fontWeight={600}>
                {faq.question}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography color="text.secondary">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Stack>
  );
}
