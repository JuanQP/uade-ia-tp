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

type ContentStepperForm = {
  loading: boolean;
  onSubmit: (formValues: ContentFormValues) => void;
}

export function ContentStepperForm({ loading, onSubmit }: ContentStepperForm) {

  const [activeStep, setActiveStep] = useState(0);
  const [newContent, setNewContent] = useState<Content>();

  function previousStep(formValues: Partial<Content>) {
    setNewContent(previous => ({
      ...previous!,
      ...formValues,
    }));
    setActiveStep(previous => previous - 1);
  }

  function nextStep(formValues: Partial<Content>) {
    if(activeStep === steps.length - 1) {
      handleSubmit();
      return;
    }
    setNewContent(previous => ({
      ...previous!,
      ...formValues,
    }));
    setActiveStep(previous => previous + 1);
  }

  function handleSubmit() {
    const { genres, MaturityRating, ...values } = newContent!;
    onSubmit({
      ...values,
      genres: genres!.map(g => g.id),
      maturity_rating_id: MaturityRating!.id,
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
