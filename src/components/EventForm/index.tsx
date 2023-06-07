import { FC, useContext } from "react";
import Modal from "../Modal";
import {
  Control,
  Description,
  Label,
  Form,
  TextField,
  MainBtn,
  ErrorText,
  AddColorBtn,
  RemoveBtn,
  ColorPickerBlock,
  ActionBtnsBox,
} from "./EventForm.styles";
import { Formik, Field, ErrorMessage, FieldArray } from "formik";
import { FieldsNames, getInialEventFormValues } from "./initForm";
import * as Yup from "yup";
import { CalendarContext } from "../../contexts/calendar-context";

type EventFormProps = {
  onClose: () => void;
};
const ValidationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});
const EventForm: FC<EventFormProps> = ({ onClose }) => {
  const calendtCtx = useContext(CalendarContext);
  const initialValues = getInialEventFormValues(calendtCtx.editedEvent);
  return (
    <Modal onClose={onClose}>
      <Formik
        onSubmit={calendtCtx.onSaveEvent}
        initialValues={initialValues}
        validationSchema={ValidationSchema}
      >
        {({ handleSubmit, values }) => {
          const isChanged =
            initialValues.colors.join(",") !== values.colors.join(",") ||
            initialValues.description !== values.description.trim() ||
            initialValues.title !== values.title.trim();
          return (
            <Form onSubmit={handleSubmit}>
              <Control>
                <Label>Title</Label>
                <Field name={FieldsNames.title}>
                  {(props: any) => <TextField {...props.field} />}
                </Field>
                <ErrorMessage name={FieldsNames.title}>
                  {(msg) => <ErrorText>{msg}</ErrorText>}
                </ErrorMessage>
              </Control>
              <Control>
                <Label>Description</Label>
                <Field name={FieldsNames.description}>
                  {(props: any) => (
                    <Description rows={5} {...props.field}></Description>
                  )}
                </Field>
                <ErrorMessage name={FieldsNames.description}>
                  {(msg) => <ErrorText>{msg}</ErrorText>}
                </ErrorMessage>
              </Control>

              <Control>
                <Label>Add color marker</Label>
                <FieldArray
                  name={FieldsNames.colors}
                  render={(arrayHelpers) => {
                    return (
                      <div>
                        {values.colors.map((color, index) => (
                          <ColorPickerBlock key={index}>
                            <Field
                              name={FieldsNames.colors + `.${index}`}
                              type="color"
                            />
                            <RemoveBtn
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              remove
                            </RemoveBtn>
                          </ColorPickerBlock>
                        ))}
                        {values.colors.length < 3 && (
                          <AddColorBtn
                            type="button"
                            onClick={() => arrayHelpers.push("#000")}
                          >
                            +
                          </AddColorBtn>
                        )}
                      </div>
                    );
                  }}
                />
              </Control>
              <ActionBtnsBox>
                <MainBtn type="submit" disabled={!isChanged}>
                  Save
                </MainBtn>
                {calendtCtx.editedEvent && (
                  <MainBtn
                    type="button"
                    data-delete
                    onClick={calendtCtx.onDeleteEvent}
                  >
                    Delete
                  </MainBtn>
                )}
              </ActionBtnsBox>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default EventForm;
