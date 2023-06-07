import { EventData } from "../../contexts/calendar-context";

export interface EventFormState {
  title: string;
  description: string;
  colors: string[];
}
export enum FieldsNames {
  title = "title",
  description = "description",
  colors = "colors",
}

export const getInialEventFormValues = (
  eventValues: EventData | null
): EventFormState => {
  if (eventValues) {
    const colors = eventValues.colors.split(",").filter((c) => c);
    return {
      title: eventValues.title,
      description: eventValues.description,
      colors,
    };
  } else {
    return {
      title: "",
      description: "",
      colors: [],
    };
  }
};
