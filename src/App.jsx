import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";


// ✅ Validation Schema
const formSchema = z.object({
  username: z
    .string()
    .min(3, "Subject name must be at least 3 characters.")
    .max(10, "Subject name must be at most 10 characters.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Subject name can only contain letters, numbers, and underscores."
    ),
  files: z
    .array(
      z.object({
        address: z.instanceof(File).refine(f => f.size > 0, "File is required"),
      })
    )
    .min(1, "Add at least one file.")
    .max(5, "You can add up to 5 files."),
});


export default function App() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      files: [{ address: null }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "files",
  });

  function onSubmit(data) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-gray-100 text-gray-800 mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <Card className="w-full sm:max-w-md shadow-lg border border-gray-200">
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            Update your profile information below.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form id="profile-form" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Username Field */}
            <FieldGroup className="mb-6">
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="username">Subject Name</FieldLabel>
                    <Input
                      {...field}
                      id="username"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter subject name"
                      autoComplete="username"
                    />
                   
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {/* File Upload Fields */}
            <FieldSet className="gap-4">
              <FieldGroup className="gap-4">
                {fields.map((field, index) => (
                  <Controller
                    key={field.id}
                    name={`files.${index}.address`}
                    control={form.control}
                    render={({ field: controllerField, fieldState }) => (
                      <Field
                        orientation="horizontal"
                        data-invalid={fieldState.invalid}
                      >
                        <FieldContent>
                          <InputGroup>
                            <input
                              type="file"
                              onChange={(e) =>
                                controllerField.onChange(e.target.files[0])
                              }
                            />
                            {fields.length > 1 && (
                              <InputGroupAddon align="inline-end">
                                <InputGroupButton
                                  type="button"
                                  onClick={() => remove(index)}
                                >
                                  <X />
                                </InputGroupButton>
                              </InputGroupAddon>
                            )}
                          </InputGroup>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </FieldContent>
                      </Field>
                    )}
                  />
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ address: null })}
                  disabled={fields.length >= 5}
                >
                  Add Another File
                </Button>
              </FieldGroup>

              {form.formState.errors.files?.root && (
                <FieldError errors={[form.formState.errors.files.root]} />
              )}
            </FieldSet>
          </form>
        </CardContent>

        <CardFooter className="flex justify-end gap-2 border-t pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button type="submit" form="profile-form">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
