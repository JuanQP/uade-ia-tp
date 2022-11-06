import { OptionsOrGroups } from "react-select";

type StepperFormStepProps = {
  active: boolean;
  formValues?: Partial<Content>;
  loading: boolean;
  onNextStep: (formValues: Partial<Content>) => void;
  onPreviousStep: (formValues: Partial<Content>) => void;
}

type ReactSelectCallbackType = (options: OptionsOrGroups<unknown,any>) => void;
type DelayedFetchCallback = (searchText: string, callback: ReactSelectCallbackType) => void;
