
import { Box, Typography, Divider, TextField, FormControlLabel, RadioGroup, Radio } from "@mui/material";
import {
  LocalizationProvider,
  DatePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useFormContext, Controller } from "react-hook-form";

const Form1 = () => {
  const { watch, control, register, } = useFormContext();
  const auditorName = watch("auditorname");

  const ordinary = watch("Ordinary") || 0;
  const normal = watch("Normal") || 0;
  const sympathizer = watch("Sympathizer") || 0;
  const societies = watch("Societies") || 0;
  const others = watch("others") || 0;


  const total =
    Number(ordinary) +
    Number(normal) +
    Number(sympathizer) +
    Number(societies) +
    Number(others);

  const societysubmittedauditrectification = watch(
    "societysubmittedauditrectification"
  );

  const importantpointsmentionedneglectedSociety = watch(
    "importantpointsmentionedneglectedSociety"
  );

  return (
    <Box>
      <Box>
        <Typography variant="h5" align="center">
          FORM NO. 1
        </Typography>
        <Divider />
        <Box>
          <Box m={2}>
            <Box m={2}>
              <Typography variant='h6'><b>1. AUDIT INFORMATION:</b></Typography>
            </Box>

            <Box ml={2}>
              <Typography>a . Full name of the Auditor : {auditorName}</Typography>
            </Box>

            <Box display={'flex'} alignItems={'center'} gap={4} ml={2} >
              <Typography >
                b . Period covered during the present Audit:
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                  name="presentAuditfromDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="From Date"
                      value={field.value}
                      onChange={field.onChange}
                      slotProps={{ textField: { size: "small", sx: { mt: 2 } } }}
                    />
                  )}
                />

                <Controller
                  name="presentAuditToDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="To Date"
                      value={field.value}
                      onChange={field.onChange}
                      slotProps={{ textField: { size: "small", sx: { mt: 2 } } }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Box>

            <Box ml={3}  >
              <Typography >
                c .<b>Date on which </b>
              </Typography>
              <Box display={'flex'} alignItems={'center'} gap={4} >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Typography >1 . Audit was commenced and completed :</Typography>
                  <Controller
                    name="AuditcompletedfromDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label="From Date"
                        value={field.value}
                        onChange={field.onChange}
                        slotProps={{ textField: { size: "small", sx: { mt: 2 } } }}
                      />
                    )}
                  />

                  <Controller
                    name="AuditcompletedToDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label="To Date"
                        value={field.value}
                        onChange={field.onChange}
                        slotProps={{ textField: { size: "small", sx: { mt: 2 } } }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>

              <Box display={'flex'} alignItems={'center'} gap={4} >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Typography >2 . Audit was Submitted:</Typography>
                  <Controller
                    name="AuditsubmittedDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label="Submitted Audit Date"
                        value={field.value}
                        onChange={field.onChange}
                        slotProps={{ textField: { size: "small", sx: { mt: 2, ml: 16.5 } } }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>

            </Box>



          </Box>

          <Divider sx={{ mt: 2 }} />
          <Box m={2}>
            <Box m={2}>
              <Typography variant='h6'><b>2. MEMBERSHIP :</b></Typography>
            </Box>

            <Box ml={2}>
              <Box display="flex" alignItems="center">

                <Typography sx={{ width: 180 }}>
                  1. No. of members
                </Typography>

                <Typography sx={{ width: 160 }}>
                  (a) Individuals
                </Typography>

                <Typography sx={{ width: 150 }}>
                  (i) Ordinary
                </Typography>

                <TextField
                  variant="standard"
                  size="small"
                  {...register("Ordinary")}
                  sx={{
                    width: 240,
                    ml: 2,
                    '& .MuiInput-underline:after': {
                      borderBottomWidth: 1.5,
                      borderBottomColor: '#144145',
                    },
                  }}
                />
              </Box>
              <Box display="flex" alignItems="center" mt={1}>
                <Box sx={{ width: 180 }} />
                <Box sx={{ width: 160 }} />

                <Typography sx={{ width: 150 }}>
                  (ii) Normal
                </Typography>

                <TextField
                  variant="standard"
                  size="small"
                  {...register("Normal")}
                  sx={{
                    width: 240,
                    ml: 2,
                    '& .MuiInput-underline:after': {
                      borderBottomWidth: 1.5,
                      borderBottomColor: '#144145',
                    },
                  }}
                />

              </Box>

              <Box display="flex" alignItems="center" mt={1}>

                <Box sx={{ width: 180 }} />
                <Box sx={{ width: 160 }} />

                <Typography sx={{ width: 150 }}>
                  (iii) Sympathizer
                </Typography>
                <TextField
                  variant="standard"
                  size="small"
                  {...register("Sympathizer")}
                  sx={{
                    width: 240,
                    ml: 2,
                    '& .MuiInput-underline:after': {
                      borderBottomWidth: 1.5,
                      borderBottomColor: '#144145',
                    },
                  }}
                />
              </Box>

              <Box display="flex" alignItems="center" mt={1}>
                <Box sx={{ width: 180 }} />
                <Typography sx={{ width: 160 }}>
                  (b) Societies
                </Typography>
                <Box sx={{ width: 150 }} />

                <TextField
                  variant="standard"
                  size="small"
                  {...register("Societies")}
                  sx={{
                    width: 240,
                    ml: 2,
                    '& .MuiInput-underline:after': {
                      borderBottomWidth: 1.5,
                      borderBottomColor: '#144145',
                    },
                  }}
                />

              </Box>

              <Box display="flex" alignItems="center" mt={1}>

                <Box sx={{ width: 180 }} />

                <Typography sx={{ width: 160 }}>
                  (c) Others (Non Members)
                </Typography>

                <Box sx={{ width: 150 }} />
                <TextField
                  variant="standard"
                  size="small"
                  {...register("others")}
                  sx={{
                    width: 240,
                    ml: 2,
                    '& .MuiInput-underline:after': {
                      borderBottomWidth: 1.5,
                      borderBottomColor: '#144145',
                    },
                  }}
                />
              </Box>

              <Box display="flex" alignItems="center" mt={2}>

                <Box sx={{ width: 180 }} />
                <Typography sx={{ width: 160 }}>
                  <b>Total</b>
                </Typography>
                <Box sx={{ width: 150 }} />

                <TextField
                  size="small"
                  value={total}
                  InputProps={{ readOnly: true }}
                  variant="standard"
                  sx={{
                    width: 240,
                    ml: 2,
                    '& .MuiInput-underline:after': {
                      borderBottomWidth: 1.5,
                      borderBottomColor: '#144145',
                    },
                  }}
                />

              </Box>

            </Box>


            {/* <Box>
              <Box display="flex" alignItems="center" gap={19} ml={2} mt={1}>
                <Typography>
                  2. Have new members been duly admitted? Have they paid entrance fee?
                </Typography>

                <Controller
                  name="memberpaidentrancefee"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      value={field.value ? "yes" : "no"}
                      onChange={(e) => {
                        field.onChange(e.target.value === "yes");
                      }}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  )}
                />
              </Box>

            
              <Box display="flex" alignItems="center" gap={25} ml={2}>
                <Typography>
                  3.Are their written applications in order and are they filled property?
                </Typography>
                <Controller
                  name="memberapplicationsfilledproperty"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      value={field.value ? "yes" : "no"}
                      onChange={(e) => {
                        field.onChange(e.target.value === "yes");
                      }}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  )}
                />
              </Box>

              <Box display="flex" alignItems="center" gap={16.5} ml={2}>
                <Typography>
                  4. Is the members register kept in Form "I" prescribed under Rules 32
                  and 65 <br />(I) of the M.S.C. Rules 1961?
                </Typography>
                <Controller
                  name="membersIMSCRules"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      value={field.value ? "yes" : "no"}
                      onChange={(e) => {
                        field.onChange(e.target.value === "yes");
                      }}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  )}
                />

              </Box>

              <Box display="flex" alignItems="center" gap={13} ml={2}>
                <Typography>
                  5. Is a list of members kept in from "J" under Rules 39 of the M.S.C. Rules 1961?
                </Typography>
                <Controller
                  name="membersJMSCRules"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      value={field.value ? "yes" : "no"}
                      onChange={(e) => {
                        field.onChange(e.target.value === "yes");
                      }}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  )}
                />

              </Box>

              <Box display="flex" alignItems="center" gap={15} ml={2}>
                <Typography>
                  6. Have due remarks been passed against names of the decreased, dismissed <br /> or register?
                </Typography>
                <Controller
                  name="decreaseddismissedorregister"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      value={field.value ? "yes" : "no"}
                      onChange={(e) => {
                        field.onChange(e.target.value === "yes");
                      }}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  )}
                />

              </Box>

              <Box display="flex" alignItems="center" gap={39} ml={2}>
                <Typography>
                  7.Are resignation in order and are thy duly accepted
                </Typography>
                <Controller
                  name="resignationdulyaccepted"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      value={field.value ? "yes" : "no"}
                      onChange={(e) => {
                        field.onChange(e.target.value === "yes");
                      }}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  )}
                />

              </Box>

              <Box display="flex" alignItems="center" gap={13} ml={2}>
                <Typography>
                  8.Have nominations made under Rules 25 of them M.S.C. Rules 1961 been duly <br /> entered in the members register under Rules 26?
                </Typography>
                <Controller
                  name="membersnominations"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      value={field.value ? "yes" : "no"}
                      onChange={(e) => {
                        field.onChange(e.target.value === "yes");
                      }}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  )}
                />

              </Box>

            </Box> */}

            <Box sx={{ width: "100%", mt: 2 }}>
              {[
                {
                  name: "memberpaidentrancefee",
                  question:
                    "2. Have new members been duly admitted? Have they paid entrance fee?",
                },
                {
                  name: "memberapplicationsfilledproperty",
                  question:
                    "3. Are their written applications in order and are they filled properly?",
                },
                {
                  name: "membersIMSCRules",
                  question:
                    '4. Is the members register kept in Form "I" prescribed under Rules 32 and 65 (I) of the M.S.C. Rules 1961?',
                },
                {
                  name: "membersJMSCRules",
                  question:
                    '5. Is a list of members kept in Form "J" under Rules 39 of the M.S.C. Rules 1961?',
                },
                {
                  name: "decreaseddismissedorregister",
                  question:
                    "6. Have due remarks been passed against names of the deceased, dismissed or removed?",
                },
                {
                  name: "resignationdulyaccepted",
                  question:
                    "7. Are resignations in order and are they duly accepted?",
                },
                {
                  name: "membersnominations",
                  question:
                    "8. Have nominations made under Rules 25 of the M.S.C. Rules 1961 been duly entered in the members register under Rules 26?",
                },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    mb: 1,

                  }}
                >

                  <Typography sx={{ width: "60%" }}>
                    {item.question}
                  </Typography>


                  <Controller
                    name={item.name}
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <RadioGroup
                        row
                        value={field.value ? "yes" : "no"}
                        onChange={(e) =>
                          field.onChange(e.target.value === "yes")
                        }
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    )}
                  />
                </Box>
              ))}
            </Box>


          </Box>
          <Divider />

          <Box m={2}>
            <Box m={2}>
              <Typography variant='h6'><b>3. SHARES :</b></Typography>
            </Box>


            <Box sx={{ width: "100%", mt: 2 }}>
              {[
                {
                  name: "applicationforshares",
                  question:
                    " (i). Is application for shares in order?",
                },
                {
                  name: "  Isshareregisteruptodate",
                  question:
                    "(ii).Is share register written up-to date?",
                },
                {
                  name: "entriesincashbook",
                  question:
                    '(iii). Do the entries in the share register tally with the entries in the cash book?',
                },
                {
                  name: "writtenledger",
                  question:
                    '(iv). Is the ledger written up-to-date?',
                },
                {
                  name: "totalofshareledger",
                  question:
                    " (v).Does the total of share ledger balance tally with the figure of share capital <br /> in the balance sheet?",
                },
                {
                  name: "sharecertificatesissued",
                  question:
                    "(vi).Have share certificates been issued to the share holder for all share subscribed?",
                },
                {
                  name: "sharestransfersandrefunds",
                  question:
                    "  (vii)Are shares transfers and refunds in accordance with the provision of the bye-laws,<br /> Act & Rules?",
                },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    mb: 1,

                  }}
                >

                  <Typography sx={{ width: "60%" }}>
                    {item.question}
                  </Typography>


                  <Controller
                    name={item.name}
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <RadioGroup
                        row
                        value={field.value ? "yes" : "no"}
                        onChange={(e) =>
                          field.onChange(e.target.value === "yes")
                        }
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    )}
                  />
                </Box>
              ))}
            </Box>


          </Box>
          <Divider />


          <Box m={2}>
            <Box m={2}>
              <Typography variant='h6'><b>4.	OUTSIDE BORROWINGS:</b></Typography>
            </Box>


            <Box sx={{ width: "100%", mt: 2 }}>
              {[
                {
                  name: "byelawsborrowingssociety",
                  question:
                    " (i). What is the limit in the bye-laws for borrowings of the society?",
                },
                {
                  name: "  hasitbeenexceeded",
                  question:
                    "(ii).Has it been exceeded?",
                },
                {
                  name: "permissioncompetentauthority",
                  question:
                    '(iii). If so, state whether necessary permission has from the competent authority?',
                },

              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    mb: 1,

                  }}
                >

                  <Typography sx={{ width: "60%" }}>
                    {item.question}
                  </Typography>


                  <Controller
                    name={item.name}
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <RadioGroup
                        row
                        value={field.value ? "yes" : "no"}
                        onChange={(e) =>
                          field.onChange(e.target.value === "yes")
                        }
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    )}
                  />
                </Box>
              ))}
            </Box>


          </Box>
          <Divider />

          <Box m={2}>
            <Box ml={2} mt={1}>
              <Typography variant='h6'><b>5 . MEETINGS : </b></Typography>
            </Box>


            <Box >
              <Typography ml={2} >
                (i). Give dates of :
              </Typography>

              <Box display="flex" alignItems="center" justifyContent={'space-between'} ml={2}>
                <Box>
                  <Typography>
                    (a). Annual General Meeting:
                  </Typography>
                </Box>

                <Box>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Box sx={{ minWidth: "200px" }}>
                      <Controller
                        name="AnnualGeneralMeetingDate"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            label="Annual Date"
                            value={field.value}
                            onChange={field.onChange}
                            slotProps={{ textField: { size: "small", sx: { mt: 2 } } }}
                          />
                        )}
                      />
                    </Box>


                  </LocalizationProvider>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" justifyContent={'space-between'} mt={2}  >
                <Box>
                  <Typography ml={2} >
                    (b). Special General Meeting:
                  </Typography>
                </Box>

                <Box>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Box sx={{ minWidth: "200px" }}>
                      <Controller
                        name="SpecialGeneralMeetingFromDate"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            label="From Date"
                            value={field.value}
                            onChange={field.onChange}
                            slotProps={{ textField: { size: "small", sx: { mt: 2 } } }}
                          />
                        )}
                      />
                    </Box>


                  </LocalizationProvider>
                </Box>
                <Box>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Box sx={{ minWidth: "200px" }}>
                      <Controller
                        name="SpecialGeneralMeetingToDate"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            label="From Date"
                            value={field.value}
                            onChange={field.onChange}
                            slotProps={{ textField: { size: "small", sx: { mt: 2 } } }}
                          />
                        )}
                      />
                    </Box>


                  </LocalizationProvider>
                </Box>
              </Box>

              <Box ml={2} mt={2}>
                <Typography>
                  (ii) State the no. of meeting held during the period as follows:
                </Typography>


                <Box display="flex" alignItems="center" mt={3}>
                  <Typography sx={{ flex: 1 }}>
                    (a) Board or Managing Committee Meetings.
                  </Typography>

                  <TextField
                    variant="standard"
                    size="small"
                    {...register("NoOfBoardMeetings")}
                    sx={{
                      width: 240,
                      ml: 2,
                      '& .MuiInput-underline:after': {
                        borderBottomWidth: 1.5,
                        borderBottomColor: '#144145',
                      },
                    }}
                  />
                </Box>


                <Box display="flex" alignItems="center" mt={2}>
                  <Typography sx={{ flex: 1 }}>
                    (b) Executive or Sub-Committee Meetings.
                  </Typography>

                  <TextField
                    variant="standard"
                    size="small"
                    {...register("NoOfSubCommitteeMeetings")}
                    sx={{
                      width: 240,
                      ml: 2,
                      '& .MuiInput-underline:after': {
                        borderBottomWidth: 1.5,
                        borderBottomColor: '#144145',
                      },
                    }}
                  />
                </Box>


                <Box display="flex" alignItems="center" mt={2}>
                  <Typography sx={{ flex: 1 }}>
                    (c) Other Meetings.
                  </Typography>

                  <TextField
                    variant="standard"
                    size="small"
                    {...register("NoofotherMeetings")}
                    sx={{
                      width: 240,
                      ml: 2,
                      '& .MuiInput-underline:after': {
                        borderBottomWidth: 1.5,
                        borderBottomColor: '#144145',
                      },
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider />

          <Box m={2}>
            <Box ml={2} mt={1}>
              <Typography variant='h6'><b>6 . RECTIFICATION REPORTS : </b></Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography>
                  (i)Has the society submitted audit rectification reports of the
                  previous audit memos? If so give dates of submission if not, state the
                  reasons for non-submission.
                </Typography>


                <Controller
                  name="societysubmittedauditrectification"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      value={field.value ? "yes" : "no"}
                      onChange={(e) => field.onChange(e.target.value === "yes")}
                    >
                      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                  )}
                />
              </Box>





              {societysubmittedauditrectification === true && (
                <Box

                  m={2}
                >

                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Box sx={{ minWidth: "200px" }}>
                      <Controller
                        name="societysubmittedauditrectificationDate"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            label="Date Of Submission"
                            value={field.value}
                            onChange={field.onChange}
                            slotProps={{ textField: { size: "small", sx: { mt: 2 } } }}
                          />
                        )}
                      />
                    </Box>


                  </LocalizationProvider>
                </Box>
              )}

              {societysubmittedauditrectification === false && (
                <Box>
                  <Typography>Reasons for non-submission</Typography>
                  <TextField
                    variant="standard"
                    fullWidth
                    size="small"
                    {...register("societysubmittedauditrectificationReson")}
                    placeholder="Enter Reasons for non-submission"
                    sx={{
                      '& .MuiInput-underline:after': {
                        borderBottomWidth: 1.5,
                        borderBottomColor: '#144145',
                      },
                    }}
                  />
                </Box>
              )}
            </Box>

            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography>
                  (ii). Have any important points mentioned in the previous audit memos been
                  neglected by the Society? If so, state them in general remarks.
                </Typography>


                <Controller
                  name="importantpointsmentionedneglectedSociety"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      value={field.value ? "yes" : "no"}
                      onChange={(e) => field.onChange(e.target.value === "yes")}
                    >
                      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                  )}
                />
              </Box>

              {importantpointsmentionedneglectedSociety === true && (
                <Box>
                  <Typography>state general remarks.</Typography>
                  <TextField
                    variant="standard"
                    fullWidth
                    size="small"
                    {...register("importantpointsmentionedneglectedSociety")}
                    placeholder="Enter Reasons for non-submission"
                    sx={{
                      '& .MuiInput-underline:after': {
                        borderBottomWidth: 1.5,
                        borderBottomColor: '#144145',
                      },
                    }}
                  />
                </Box>
              )}
            </Box>

          </Box>
          <Divider />

          <Box m={2}>
            <Box ml={2} mt={1}>
              <Typography variant='h6'><b>7 . AUDIT FEE : </b></Typography>
            </Box>


            <Box>
              <Box ml={2}>
                <Box>
                  <Typography>
                    (i).Give amount of audit fees last assessed. State the period for which it is assessed. State the dates of recovery of audit fees, name of treasury and amount credited. (Give No. and date treasury Challan):
                  </Typography>
                </Box>

                <Box mt={1}>
                  <Typography>Details about auditfee. </Typography>
                  <TextField
                    {...register("auditfees")}
                    variant="standard"
                    sx={{
                      '& .MuiInput-underline:after': {
                        borderBottomWidth: 1.5,
                        borderBottomColor: '#144145',
                      },
                    }}
                    focused
                    size="small"
                    margin="none"
                    placeholder="Enter Details about auditfee"
                    fullWidth
                  />
                </Box>
              </Box>

              <Box mt={2} ml={2} >
                <Box>
                  <Typography  >
                    (ii). If audit fees have not been paid by the society. Give details about outstanding audit fees and reasons for non-payment.
                  </Typography>


                  <Box mt={1}>
                    <Typography>Give details about outstanding audit fees and reasons for non-payment. </Typography>
                    <TextField
                      {...register("detailsaboutoutstandingauditfees")}
                      variant="standard"
                      sx={{
                        '& .MuiInput-underline:after': {

                          borderBottomWidth: 1.5,
                          borderBottomColor: '#144145',
                        }, mt: 1
                      }}
                      focused
                      size="small"
                      margin="none"
                      placeholder="Enter Give details about outstanding audit fees and reasons for non-payment."
                      fullWidth
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider />

          <Box m={2}>
            <Box ml={2} mt={1}>
              <Typography variant='h6'><b>8.INTERNAL OR LOCAL AUDIT : </b></Typography>
            </Box>


            <Box>
              <Box ml={2}>
                <Box>
                  <Typography>
                    (i).If there is internal or local audit, state by whom done, period covered & whether memo is on the record of society.
                  </Typography>
                </Box>

                <Box mt={1}>
                  <Typography>Details about audit.</Typography>
                  <TextField
                    {...register("internallocalaudit")}
                    variant="standard"
                    sx={{
                      '& .MuiInput-underline:after': {
                        borderBottomWidth: 1.5,
                        borderBottomColor: '#144145',

                      }, mt: 1
                    }}
                    focused
                    size="small"
                    margin="none"
                    placeholder="Enter Details about auditfee"
                    fullWidth
                  />
                </Box>
              </Box>

              <Box mt={2} ml={2} >
                <Box>



                  <Box mt={1}>
                    <Typography>(ii). State whether there is proper Co-ordination between Statutory Auditor, Internal Auditor.

                      State whether there is proper Co-ordination between Statutory Auditor, Internal Auditor.</Typography>
                    <TextField
                      {...register("CoordinationbetweenAuditor")}
                      variant="standard"
                      sx={{
                        '& .MuiInput-underline:after': {
                          borderBottomWidth: 1.5,
                          borderBottomColor: '#144145',

                        }, mt: 1
                      }}
                      focused
                      size="small"
                      margin="none"
                      placeholder="Enter Give details about outstanding audit fees and reasons for non-payment."
                      fullWidth
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider />

          <Box m={2}>
            <Box m={1}>
              <Typography variant='h6'><b>9 .MANAGING DIRECTOR/MANAGER/ SECRETARY : </b></Typography>
            </Box>

            <Box m={1}>
              <Box display="flex" alignItems="center" mt={1}>
                <Box mt={1}>
                  <Typography>
                    (i).Name of officer (Secretary):
                  </Typography>

                  <TextField
                    fullWidth
                    variant="standard"
                    size="small"
                    {...register("Nameofofficer")}

                    sx={{

                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#144145',
                      },
                    }}
                  />
                </Box>

              </Box>


              <Box display="flex" alignItems="center" mt={1}>
                <Box mt={1}>
                  <Typography>
                    (ii).Pay drawn Grade:
                  </Typography>

                  <TextField
                    fullWidth
                    variant="standard"
                    size="small"
                    {...register("PaydrawnGrade")}

                    sx={{

                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#144145',
                      },
                    }}
                  />
                </Box>

              </Box>

              <Box display="flex" alignItems="center" mt={1}>
                <Box mt={1}>
                  <Typography>
                    (iii).State other allowances, if any, and facilities given such as rent free quarters etc:
                  </Typography>

                  <TextField
                    fullWidth
                    variant="standard"
                    size="small"
                    {...register("otherallowances")}

                    sx={{

                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#144145',
                      },
                    }}
                  />
                </Box>

              </Box>

              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Box  >
                  <Typography >(iii)State whether he is a member? -</Typography>
                </Box>
                <Controller
                  name="whetherismember"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      value={field.value ? "yes" : "no"}
                      onChange={(e) => {
                        field.onChange(e.target.value === "yes");
                      }}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  )}
                />
              </Box>


              <Box display="flex" alignItems="center" mt={1}>
                <Box mt={1}>
                  <Typography>
                    (iv).If so, whether he has borrowed or has been given any credit facilities?
                    State the amount borrowed and the amount of over dues if any.
                  </Typography>

                  <TextField
                    fullWidth
                    variant="standard"
                    size="small"
                    {...register("hasBorrowed")}

                    sx={{

                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#144145',
                      },
                    }}
                  />
                </Box>

              </Box>

              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Box  >
                  <Typography >(v).If other amounts are due from him, give details?</Typography>
                </Box>
                <Controller
                  name="otherAmountsDue"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      value={field.value ? "yes" : "no"}
                      onChange={(e) => {
                        field.onChange(e.target.value === "yes");
                      }}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  )}
                />
              </Box>

              <Box display="flex" alignItems="center" mt={1}>
                <Box mt={1}>
                  <Typography>
                    (vi)Obtain a list of Staff showing names, designation, qualifications, scales, present pay and allowances given, dates from which employed, security furnished etc.
                  </Typography>

                  <TextField
                    fullWidth
                    variant="standard"
                    size="small"
                    {...register("listofStaff")}

                    sx={{

                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#144145',
                      },
                    }}
                  />
                </Box>

              </Box>
            </Box>


          </Box>
          <Divider />

          <Box m={2}>
            <Box m={1}>
              <Typography variant='h6'><b>10 .BREACHES :</b></Typography>
            </Box>

            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} m={1}>
              <Box  >
                <Typography >(i).Do the society posses copy of the Act, Rules and its registered Bye-laws?</Typography>
              </Box>
              <Controller
                name="hasCopyOfActRulesByeLaws"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <RadioGroup
                    row
                    value={field.value ? "yes" : "no"}
                    onChange={(e) => {
                      field.onChange(e.target.value === "yes");
                    }}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                )}
              />
            </Box>

            <Box m={1}>
              <Box>
                <Typography>
                  (ii). Give only numbers of breaches of the Act, Rules and Bylaws :
                </Typography>
              </Box>


              <Box display="flex" alignItems="center" gap={2} mt={1}>

                <Typography sx={{ minWidth: "120px" }}>
                  1. Section No
                </Typography>

                <TextField
                  variant="standard"
                  size="small"
                  {...register("SectionNo")}
                  sx={{
                    flex: 1,
                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#144145',
                    },
                  }}
                />
              </Box>
            </Box>


            <Box m={1}>

              <Box display="flex" alignItems="center" gap={2} mt={1}>

                <Typography sx={{ minWidth: "120px" }}>
                  2. Rules No
                </Typography>

                <TextField
                  variant="standard"
                  size="small"
                  {...register("RulesNos")}
                  sx={{
                    flex: 1,
                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#144145',
                    },
                  }}
                />
              </Box>
            </Box>

            <Box m={1}>

              <Box display="flex" alignItems="center" gap={2} mt={1}>

                <Typography sx={{ minWidth: "120px" }}>
                  3. Bye Laws No
                </Typography>

                <TextField
                  variant="standard"
                  size="small"
                  {...register("ByeLawsNo")}
                  sx={{
                    flex: 1,
                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#144145',
                    },
                  }}
                />
              </Box>
            </Box>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              m={1}
            >
              <Typography sx={{ flex: 1, pr: 2 }}>
                (iii). Have any rules been framed under the Byelaws? Are they appropriate
                authority? Are they properly followed?
                <br />
                (These breaches should discuss brief in general remarks.)
              </Typography>


              <Controller
                name="rulesundertheByelaws"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <RadioGroup
                    row
                    value={field.value ? "yes" : "no"}
                    onChange={(e) => field.onChange(e.target.value === "yes")}
                  >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                )}
              />
            </Box>


          </Box>
          <Divider />

          <Box m={2}>
            <Box m={1}>
              <Typography variant='h6'><b>11 . PROFIT AND LOSS :</b></Typography>
            </Box>

            <Box ml={2} mt={1}>
              <Box>
                <Typography>
                  (i). What is the amount of Profit earned or loss incurred during the last Co-operative year?
                </Typography>

                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  {...register("Profitorloss")}

                  sx={{

                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#144145',
                    },
                  }}
                />
              </Box>

              <Box mt={3}>
                <Typography>
                  (ii). State if the net profits are distributed (In case of non business societies
                  figures of surplus or Deficit may be given against query No. II (I) above)


                </Typography>

                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  {...register("netProfitDistributed")}

                  sx={{

                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#144145',
                    },
                  }}
                />
              </Box>


            </Box>

          </Box>
          <Divider />

          <Box m={2}>
            <Box m={1}>
              <Typography variant='h6'><b>12.(A) CASH, BANK BALANCE AND SECURITIES :</b></Typography>
            </Box>

            <Box m={1}>
              <Box>

                <Typography>
                  (i) Count cash and sign the cash book stating the amount counted and date of which counted.
                </Typography>

                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  {...register("amountcounted")}

                  sx={{

                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#144145',
                    },
                  }}
                />
              </Box>

              <Box mt={2}>

                <Typography>
                  (ii). Who produced the Cash for Counting? Give his name & designation. Is the authorized to keep cash?
                </Typography>

                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  {...register("producedByDesignation")}

                  sx={{

                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#144145',
                    },
                  }}
                />
              </Box>

              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
                <Box  >
                  <Typography >(iii). Is it correct according to the Cash Book?</Typography>
                </Box>
                <Controller
                  name="infoaccordingCashBook"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      value={field.value ? "yes" : "no"}
                      onChange={(e) => {
                        field.onChange(e.target.value === "yes");
                      }}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  )}
                />
              </Box>

              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
                <Box  >
                  <Typography>(iv).Are Arrangements for safety of Cash safe and cash-in-transit adequate?</Typography>
                </Box>
                <Controller
                  name="ArrangementssafetyCash"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      value={field.value ? "yes" : "no"}
                      onChange={(e) => {
                        field.onChange(e.target.value === "yes");
                      }}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  )}
                />
              </Box>

            </Box>

            <Box m={1}>
              <Typography variant='h6'><b>(B) BANK BALANCES :</b></Typography>
            </Box>

            <Box m={2}>
              <Typography>
                (i) Do Bank balance shown in Bank Pass books or bank statements and Bank balance shown in Books of accounts? If not, check reconciliation statements.
              </Typography>

              <TextField
                fullWidth
                variant="standard"
                size="small"
                {...register("BankReconciliationstatement")}

                sx={{

                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#144145',
                  },
                }}
              />
            </Box>

            <Box m={1}>
              <Typography variant='h6'><b>(C) SECURITIES :</b></Typography>
            </Box>

            <Box ml={2}>
              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Box  >
                  <Typography >1.Verify securities physically and see whether they are in the name of society</Typography>
                </Box>
                <Controller
                  name="physicallysecurities"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      value={field.value ? "yes" : "no"}
                      onChange={(e) => {
                        field.onChange(e.target.value === "yes");
                      }}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  )}
                />
              </Box>

              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Box  >
                  <Typography >2.Are dividends and interest being duly collected?</Typography>
                </Box>
                <Controller
                  name="dividendscollected"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      value={field.value ? "yes" : "no"}
                      onChange={(e) => {
                        field.onChange(e.target.value === "yes");
                      }}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  )}
                />
              </Box>


              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Box  >
                  <Typography >3.If securities are lodged with the bank, are relevant certificates obtained?</Typography>
                </Box>
                <Controller
                  name="relevantcertificates"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      value={field.value ? "yes" : "no"}
                      onChange={(e) => {
                        field.onChange(e.target.value === "yes");
                      }}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  )}
                />
              </Box>



              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Box  >
                  <Typography>4.Is investment register maintains and written up-to-date?</Typography>
                </Box>
                <Controller
                  name="investmentregister"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      value={field.value ? "yes" : "no"}
                      onChange={(e) => {
                        field.onChange(e.target.value === "yes");
                      }}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  )}
                />
              </Box>
            </Box>


          </Box>
          <Divider />

          <Box m={2}>
            <Box m={1}>
              <Typography variant='h6'><b>13 .Movable and immovable property :</b></Typography>
            </Box>

            <Box ml={2}>
              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Box  >
                  <Typography >1. Is relevant register maintained and written up-to-date?</Typography>
                </Box>
                <Controller
                  name="Isrelevantregister"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      value={field.value ? "yes" : "no"}
                      onChange={(e) => {
                        field.onChange(e.target.value === "yes");
                      }}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  )}
                />
              </Box>

              <Box mt={1}>
                <Typography>
                  2. Verify property physically & obtain its list. Do the balance tally with
                  balance sheet Figures?
                </Typography>

                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  {...register("Verifypropertyphysically")}

                  sx={{

                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#144145',
                    },
                  }}
                />
              </Box>

              <Box mt={1}>
                <Typography>
                  3.In case of immovable property including lands verify title deeds and see
                  whether they are in the name of Society
                </Typography>

                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  {...register("Verifyimmovableproperty")}

                  sx={{

                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#144145',
                    },
                  }}
                />
              </Box>

              <Box mt={1}>
                <Typography>
                  4.Is the property duly insured where necessary? If so, give details in general remarks.
                </Typography>

                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  {...register("propertydulyinsured")}

                  sx={{

                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#144145',
                    },
                  }}
                />
              </Box>

              <Box mt={1}>
                <Typography >5.DEPRECIATION</Typography>

              </Box>

              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Box  >
                  <Typography >(i) Is due depreciation charges?</Typography>
                </Box>
                <Controller
                  name="depreciationcharges"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      value={field.value ? "yes" : "no"}
                      onChange={(e) => {
                        field.onChange(e.target.value === "yes");
                      }}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  )}
                />
              </Box>


              <Box mt={1}>
                <Typography>
                  (ii)State the rate of depreciation charges on various assets.
                </Typography>

                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  {...register("rateofdepreciation")}

                  sx={{

                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#144145',
                    },
                  }}
                />
              </Box>

            </Box>
          </Box>
          <Divider />

          <Box m={2}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Box  >
                <Typography ><b>14.</b> Have you discussed the draft of audit memo in the board of managing
                  committee meeting? If not state reasons for the same.</Typography>
              </Box>
              <Controller
                name="draftofauditmemo"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <RadioGroup
                    row
                    value={field.value ? "yes" : "no"}
                    onChange={(e) => {
                      field.onChange(e.target.value === "yes");
                    }}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                )}
              />
            </Box>
          </Box>

        </Box>
      </Box>


    </Box>
  );
};

export default Form1;
