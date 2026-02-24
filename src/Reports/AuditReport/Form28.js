import { Box, Typography, Divider, TextField, FormControlLabel, RadioGroup, Radio } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

const Form28 = () => {
  const {  control, register, } = useFormContext();

  return (

    <Box>
      <Divider />
      <Box textAlign={'center'} p={2}>
        <Typography  >FORM NO. 28</Typography>
        <Typography   >AUDIT MEMO (CO-OP. HOUSING SOCIETIES)</Typography>
        <Typography ><b>PART II</b> </Typography>

      </Box>
      <Divider />

      <Box>
        <Box>
          <Box mt={1}>
            <Typography variant='h6'><b>1. BORROWINGS : </b></Typography>
          </Box>

          <Box ml={1}>
            <Typography ><b>i. State the loans obtained by the society for various purposes from Govt. & other agencies :</b></Typography>

            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
              <Typography>
                Agency sanctioning Loan :
              </Typography>

              <TextField
                variant="standard"
                size="small"
                {...register("AgencysanctioningLoan")}

                sx={{
                  width: "50%",
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#144145',
                  },
                }}
              />
            </Box>

            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
              <Typography>
                Purpose for which loan is sanctioned :
              </Typography>

              <TextField
                variant="standard"
                size="small"
                {...register("Purposeloansanctioned")}

                sx={{
                  width: "50%",
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#144145',
                  },
                }}
              />
            </Box>


            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
              <Typography>
                Amount for loan sanctioned :
              </Typography>

              <TextField
                variant="standard"
                size="small"
                {...register("loansanctionedAmount")}

                sx={{
                  width: "50%",
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#144145',
                  },
                }}
              />
            </Box>


            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
              <Typography>
                Maximum amount drawn :
              </Typography>

              <TextField
                variant="standard"
                size="small"
                {...register("Maximumamountdrawn")}

                sx={{
                  width: "50%",
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#144145',
                  },
                }}
              />
            </Box>


            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
              <Typography>
                Re-payments made :
              </Typography>

              <TextField
                variant="standard"
                size="small"
                {...register("Repaymentsmade")}

                sx={{
                  width: "50%",
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#144145',
                  },
                }}
              />
            </Box>



            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
              <Typography>
                Outstanding :
              </Typography>

              <TextField
                variant="standard"
                size="small"
                {...register("Outstanding")}

                sx={{
                  width: "50%",
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#144145',
                  },
                }}
              />
            </Box>


            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
              <Typography>
                Amount overdue if any :
              </Typography>

              <TextField
                variant="standard"
                size="small"
                {...register("Amountoverdueifany")}

                sx={{
                  width: "50%",
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#144145',
                  },
                }}
              />
            </Box>



            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
              <Typography>
                Remarks :
              </Typography>

              <TextField
                variant="standard"
                size="small"
                {...register("Remarks")}

                sx={{
                  width: "50%",

                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#144145',
                  },
                }}
              />
            </Box>


            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
              <Box  >
                <Typography >ii. Are repayments of loans punctual?</Typography>
              </Box>
              <Controller
                name="repaymentsloanspunctual"
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



            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
              <Box  >
                <Typography >iii. Are all conditions laid down for grant of various loans and credits observed? Note breaches if any.</Typography>
              </Box>
              <Controller
                name="conditionslaiddown"
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



            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
              <Box  >
                <Typography >iv. Are necessary documents executed in favors of the authority sanctioning the loan?</Typography>
              </Box>
              <Controller
                name="necessarydocuments"
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

        <Box>
          <Box m={1}>
            <Typography variant='h6'><b>2. GOVERNMENT FINANCIAL ASSISTANCE : </b></Typography>
          </Box>

          <Box ml={1}>
            <Box >
              <Typography>
                (i).What is the amount of Government subsidy sanctioned and received by the society?


              </Typography>

              <TextField
                fullWidth
                variant="standard"
                size="small"
                {...register("amountsubsidysanctioned")}

                sx={{

                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#144145',
                  },
                }}
              />
            </Box>
          </Box>

          <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
            <Box  >
              <Typography >(ii).Has Government sanctioned any amount for land development?
                If So, state the amount. Have development expenses exceeded the said amount</Typography>
            </Box>
            <Controller
              name="Hassanctionedamount"
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
        <Divider sx={{ mt: 2 }} />

        <Box>
          <Box m={1}>
            <Typography variant='h6'><b>3. MEMBERSHIP :</b></Typography>
          </Box>

          <Box ml={1}>

            <Box>
              <Typography>
                (i). State whether in case of backward class of co-operative housing societies,
                certificates from the social welfare officers are obtained for their eligibility to
                membership and obtaining of financial assistance?
              </Typography>

              <TextField
                fullWidth
                variant="standard"
                size="small"
                {...register("financialassistancemembership")}

                sx={{

                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#144145',
                  },
                }}
              />

            </Box>

            <Box mt={2}>
              <Typography>
                (ii). State whether certificates are obtained from officers of the concerned industry
                in case of subsidized industrial housing scheme?
              </Typography>

              <TextField
                fullWidth
                variant="standard"
                size="small"
                {...register("certificatesfromofficers")}

                sx={{

                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#144145',
                  },
                }}
              />

            </Box>



            <Box mt={2}>
              <Typography>
                (iii). Have declaration been obtained from members that they and their family
                members do not own lands or houses.
              </Typography>

              <TextField
                fullWidth
                variant="standard"
                size="small"
                {...register("declarationfrommembers")}

                sx={{

                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#144145',
                  },
                }}
              />

            </Box>



          </Box>

        </Box>
        <Divider sx={{ mt: 2 }} />



        <Box>
          <Box m={1}>
            <Typography variant='h6'><b>4 . LANDS AND THEIR DEVELOPMENT :</b></Typography>
          </Box>


          <Box ml={1}>
            <Box mt={1}>
              <Typography>
                (i). State whether lands for constructions of houses have been secured purchased or
                obtained on lease. Give details for the lands, stating total area, survey nos. &
                CRS nos. if any, price for which purchased, lease rent etc.
              </Typography>

              <TextField
                fullWidth
                variant="standard"
                size="small"
                {...register("detailslandsforconstructions")}

                sx={{

                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#144145',
                  },
                }}
              />
            </Box>

            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
              <Box  >
                <Typography >(ii). See the title deeds and ascertain whether they are properly executed in favor of society.</Typography>
              </Box>
              <Controller
                name="titledeeds"
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

            <Typography>
              (iii) State how the lands has been utilized for:
            </Typography>

            <Box mt={1} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Typography>
                (a) Construction of Flats
              </Typography>

              <TextField
                fullWidth
                variant="standard"
                size="small"
                {...register("ConstructionFlats")}

                sx={{
                  width: "60%",
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#144145',
                  },
                }}
              />
            </Box>



            <Box mt={1} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Typography>
                (b) Construction of roads
              </Typography>

              <TextField
                fullWidth
                variant="standard"
                size="small"
                {...register("Constructionroads")}

                sx={{
                  width: "60%",
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#144145',
                  },
                }}
              />
            </Box>



            <Box mt={1} display={'flex'} alignItems={'center'} justifyContent={'space-between'} >
              <Typography>
                (c) Open Space
              </Typography>

              <TextField
                fullWidth
                variant="standard"
                size="small"
                {...register("OpenSpace")}

                sx={{
                  width: "60%",
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#144145',
                  },
                }}
              />
            </Box>



            <Box mt={1} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Typography>
                (d) Other purposes (give details)
              </Typography>

              <TextField
                fullWidth
                variant="standard"
                size="small"
                {...register("Otherpurposes")}

                sx={{
                  width: "60%",
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#144145',
                  },
                }}
              />
            </Box>


            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
              <Box  >
                <Typography >(iv). Have the layouts and plans for development been approved the
                  Municipal Authorities before actual commencement of the work?</Typography>
              </Box>
              <Controller
                name="layoutsapproved"
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


            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
              <Box  >
                <Typography >(v). Have completion certificates been obtained from appropriate authorities
                  for drainage, water supply, roads, etc before period <br /> construction work
                  of building is commenced?</Typography>
              </Box>
              <Controller
                name="completioncertificates"
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
        <Divider sx={{ mt: 2 }} />


        <Box>
          <Box m={1}>
            <Typography variant='h6'><b>5 . CONSTRUCTION OF BUILDINGS : </b></Typography>
          </Box>


          <Box ml={1}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Box  >
                <Typography >(i).(a) Have building construction commenced?</Typography>
              </Box>
              <Controller
                name="buildingconstructioncommenced"
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

            <Box mt={1} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Typography>
                (b). State the No of houses of flats constructed and under construction
              </Typography>

              <TextField
                fullWidth
                variant="standard"
                size="small"
                {...register("Noofhousesflats")}

                sx={{
                  width: "40%",
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#144145',
                  },
                }}
              />
            </Box>

            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Box  >
                <Typography >(c) Have the completed houses and flats allotted to members?</Typography>
              </Box>
              <Controller
                name="flatsallottedmembers"
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

            <Box mt={1} display={'flex'} alignItems={'center'} justifyContent={'space-between'} >
              <Typography>
                (ii).Are building constructed on contract basis? See the <br /> terms & conditions of contracts and state whether they been property observed. Note breaches if any.
              </Typography>

              <TextField
                fullWidth
                variant="standard"
                size="small"
                {...register("termsconditionscontracts")}

                sx={{
                  width: "40%",
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#144145',
                  },
                }}
              />
            </Box>

            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Box  >
                <Typography >(iii).Are these contracts properly sanctioned by the competent authority
                  as per bye laws of the society?</Typography>
              </Box>
              <Controller
                name="contractsproperlysanctioned"
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
                <Typography >(iv).Have tenders of quotation been called after giving due advertisement
                  in local news papers? If the works are giving to the contractors <br /> quoting the
                  lowest figures, see whether reason for the same are recorded.</Typography>
              </Box>
              <Controller
                name="tendersofquotation"
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
                <Typography >(v).Are contractors paid after necessary work progress certificate are obtained <br />
                  from the architects? Are running & final bills obtained before payments are made
                  to the contractors?</Typography>
              </Box>
              <Controller
                name="workprogresscertificate"
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
                <Typography >(vi).See the terms on which the architects are employed. Are there any breaches?</Typography>
              </Box>
              <Controller
                name="architectsemployed"
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
                <Typography >(vii).See whether completion certificate have been obtained from qualified engineers
                  & architects, stating that the construction <br /> have been completed according to approved
                  plans, specifications and other terms of contract.</Typography>
              </Box>
              <Controller
                name="constructioncompletedtoplans"
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
                <Typography >(viii).Is a property register kept in proper form? Is it written up-to date?</Typography>
              </Box>
              <Controller
                name="propertyregister"
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
            {/* *************** */}
            <Box>
              <Box>
                <Typography ><b>(ix) .When building is built departmentally, state whether the following books are kept and written up-to date?</b></Typography>
              </Box>

              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Box  >
                  <Typography >(a).Job registers and measurement book</Typography>
                </Box>
                <Controller
                  name="measurementbook"
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
                  <Typography >(b).Stock registers</Typography>
                </Box>
                <Controller
                  name="Stockregisters"
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
                  <Typography >(c).Are valuation certificates from qualified engineers & /or architects obtained?</Typography>
                </Box>
                <Controller
                  name="valuationcertificates"
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
                  <Typography >(d).Is expenditure allocated properly between items of capital & revenue nature?</Typography>
                </Box>
                <Controller
                  name="expenditureallocated"
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

            <Box mt={1}>
              <Typography>
                (x).State whether building has been constructed according to the original plans and estimates submitted with the loan applications and which are approved by the competent authority. Are there any deviations? If so, are they got approved from the competent authority?
              </Typography>

              <TextField
                fullWidth
                variant="standard"
                size="small"
                {...register("buildingaccordingplans")}

                sx={{

                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#144145',
                  },
                }}
              />
            </Box>

            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Box  >
                <Typography >(xi).In case of flat owner’s society, see whether titles to the land have been transferred
                  in the name of the society.</Typography>
              </Box>
              <Controller
                name="flatownersociety"
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
                <Typography >(xii).Are building and other construction got insured?</Typography>
              </Box>
              <Controller
                name="constructioninsured"
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
                <Typography >(xiii).In case of flat owner’s society have the promoters fulfilled their obligation as per
                  agreements entered with <br /> them by the members prior to the registration of the society?</Typography>
              </Box>
              <Controller
                name="promotersobligation"
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
                <Typography >(xiv).Examine the agreements entered into with the promoters & see whether they are
                  in the interest of the society</Typography>
              </Box>
              <Controller
                name="Examineagreements"
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
                <Typography >(xv).Has the society executed lease deeds in favor of members for giving plots and/or
                  buildings on lease to them?</Typography>
              </Box>
              <Controller
                name="favorofmembers"
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
                <Typography >(xvi).Has the Society created sinking fund as per the provision of the bye-laws?</Typography>
              </Box>
              <Controller
                name="Societysinkingfund"
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

            <Box>
              <Box >
                <Typography ><b>(xvii).Examine the basis on which monthly rents or contribution are fixed in case of tenants co-partnership <br /> society or flat owners Societies and see that following items are adequately covered.</b></Typography>
              </Box>


              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Box  >
                  <Typography >(a).Amounts required for the repayment loan installments.</Typography>
                </Box>
                <Controller
                  name="Amountsrepaymentloan"
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
                  <Typography >(b).Municipal and other taxes.</Typography>
                </Box>
                <Controller
                  name="Municipaltaxes"
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
                  <Typography >(c).Lease rent.</Typography>
                </Box>
                <Controller
                  name="Leaserent"
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
                  <Typography >(d).Service charges and common expenses</Typography>
                </Box>
                <Controller
                  name="Servicecharges"
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
                  <Typography >(e).Contribution to sinking fund.</Typography>
                </Box>
                <Controller
                  name="Contributionsinkingfund"
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
        <Divider sx={{ mt: 2 }} />

{/* ********* */}
        <Box>
          <Box m={1}>
            <Typography variant='h6'><b>6. LOANS TO MEMBERS : </b></Typography>
          </Box>

          <Box ml={1}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Box  >
                <Typography >(i). Are recoveries of loan punctual?</Typography>
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

            <Box mt={1} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Typography>
                (ii).State the amounts of over dues.
              </Typography>

              <TextField
                fullWidth
                variant="standard"
                size="small"
                {...register("Nameofofficer")}

                sx={{
                  width: "50%",
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#144145',
                  },
                }}
              />
            </Box>

            <Box mt={1} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Typography>
                (iii).State What steps are being taken to recover over dues?
              </Typography>

              <TextField
                fullWidth
                variant="standard"
                size="small"
                {...register("Nameofofficer")}

                sx={{
                  width: "50%",
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#144145',
                  },
                }}
              />
            </Box>


          </Box>
        </Box>

        <Divider sx={{ mt: 3 }} />

        <Box>
          <Box m={1}>
            <Typography variant='h6'><b>7 .EXPENDITURE : </b></Typography>
          </Box>

          <Box ml={1}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Box  >
                <Typography >Has the expenditure been approved by managing committee from time to time.</Typography>
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
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default Form28;
