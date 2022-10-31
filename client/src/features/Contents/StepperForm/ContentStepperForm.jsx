import { CONTENT_DEFAULT_VALUES } from "@features/Contents";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import { DetailsStep } from "./DetailsStep";
import { MediaStep } from "./MediaStep";
import { MovieStep } from "./MovieStep";
import { ReviewStep } from "./ReviewStep";

const steps = [
  { label: "Película", Component: MovieStep },
  { label: "Portadas", Component: MediaStep },
  { label: "Detalles", Component: DetailsStep },
  { label: "Review", Component: ReviewStep },
];

export function ContentStepperForm({ loading, onSubmit }) {

  const [activeStep, setActiveStep] = useState(0);
  const [newContent, setNewContent] = useState(CONTENT_DEFAULT_VALUES);

  function previousStep(formValues) {
    setNewContent(previous => ({
      ...previous,
      ...formValues,
    }));
    setActiveStep(previous => previous - 1);
  }

  function nextStep(formValues) {
    if(activeStep === steps.length - 1) {
      handleSubmit();
      return;
    }
    setNewContent(previous => ({
      ...previous,
      ...formValues,
    }));
    setActiveStep(previous => previous + 1);
  }

  function handleSubmit() {
    onSubmit({
      ...newContent,
      genres: newContent.genres.map(g => g.id),
      maturity_rating_id: newContent.maturity_rating.id,
    });
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step.label} completed={activeStep > index}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {/* All forms are rendered but only the active one is visible */}
      {steps.map((step, index) => (
        <step.Component
          key={step.label}
          active={activeStep === index}
          formValues={newContent}
          loading={loading}
          onNextStep={nextStep}
          onPreviousStep={previousStep}
        />
      ))}
    </Box>
  )
}
