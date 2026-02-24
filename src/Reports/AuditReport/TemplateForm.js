import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Autocomplete,
  Box,
  Typography,
  Paper
} from "@mui/material";
import { useFormContext, Controller, useFieldArray } from "react-hook-form";

const TemplateForm = () => {
  const REACT_APP_URL = process.env.REACT_APP_URL;
  const { register, control, setValue } = useFormContext();
  const [templateOptions, setTemplateOptions] = useState([]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "templates",
  });

  useEffect(() => {
    const getTemplates = async () => {
      try {
        const res = await fetch(`${REACT_APP_URL}/Auditemp/`);
        const data = await res.json();
        setTemplateOptions(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (REACT_APP_URL) {
      getTemplates();
    }
  }, [REACT_APP_URL]);

  const options = templateOptions.map((t) => ({
    value: t._id,
    label: t.tempName,
    subject: t.subject,
    tempBody: t.tempBody,
  }));

  return (
    <Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h6"><b>Template Form </b></Typography>
      </Box>

      <Box mt={1}>
        <Paper
          elevation={3}
          sx={{
            mt: 2,
            p: 4,
            width: 400,
            margin: "auto",

          }}
        >

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,

            }}
          >
            <Box>
              <Typography>Auditor Name</Typography>

              <TextField
                variant="standard"
                fullWidth
                size="small"
                // placeholder="Auditor Name"
                {...register("auditorname")}
                sx={{
                  '& .MuiInput-underline:after': {
                    borderBottomWidth: 1.5,
                    borderBottomColor: '#144145',
                  },
                }}
              />
            </Box>
            <Box>
              <Typography>Auditor Address</Typography>
              <TextField
                variant="standard"
                fullWidth
                size="small"
                {...register("auditoraddress")}
                sx={{
                  '& .MuiInput-underline:after': {
                    borderBottomWidth: 1.5,
                    borderBottomColor: '#144145',
                  },
                }}
              />
            </Box>

            <Box>
              <Typography>Mobile No</Typography>
              <TextField
                variant="standard"
                fullWidth
                size="small"
                type="number"
                {...register("auditormobileno")}
                sx={{
                  '& .MuiInput-underline:after': {
                    borderBottomWidth: 1.5,
                    borderBottomColor: '#144145',
                  },
                }}
              />
            </Box>

            {fields.map((item, index) => (
              <Box
                key={item.id}
                sx={{ border: "1px solid #ccc", p: 2, mt: 2 }}
              >
                {/* TEMPLATE DROPDOWN */}
                <Controller
                  name={`templates.${index}.tempId`}
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      options={options}
                      getOptionLabel={(option) => option.label || ""}
                      onChange={(e, newValue) => {
                        field.onChange(newValue?.value || "");

                        setValue(
                          `templates.${index}.subject`,
                          newValue?.subject || ""
                        );

                        setValue(
                          `templates.${index}.tempBody`,
                          newValue?.tempBody || ""
                        );

                        setValue(
                          `templates.${index}.tempName`,
                          newValue?.label || ""
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Template"
                          size="small"
                        />
                      )}
                    />
                  )}
                />

                {/* SUBJECT */}
                <TextField
                  label="Subject"
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                  {...register(`templates.${index}.subject`)}
                />

                {/* CONTENT */}
                <TextField
                  label="Content"
                  fullWidth
                  multiline
                  minRows={4}
                  size="small"
                  sx={{ mt: 2 }}
                  {...register(`templates.${index}.tempBody`)}
                />

                <Button
                  color="error"
                  sx={{ mt: 1 }}
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </Box>
            ))}

            <Button
              variant="contained"
              sx={{ background: '#10370d', color: '#ffffff' }}
              onClick={() =>
                append({
                  tempId: "",
                  tempName: "",
                  subject: "",
                  tempBody: "",
                })
              }
            >
              Add Template
            </Button>
          </Box>

        </Paper>
      </Box>

    </Box>
  );
};

export default TemplateForm;
