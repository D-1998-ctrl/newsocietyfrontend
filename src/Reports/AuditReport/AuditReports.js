
import { useState } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import Form1 from "./Form1";
import Form28 from "./Form28";
import Schdule from "./Schdule";
import TemplateForm from "./TemplateForm";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

const steps = ["Template Form", "Form 1", "Form 28", "Schedule"];
const REACT_APP_URL = process.env.REACT_APP_URL;

const AuditReports = () => {
  const [showStepper, setShowStepper] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const methods = useForm({
    defaultValues: {
      auditorname: "",
      auditoraddress: "",
      auditormobileno: "",
      templates: [],
      //form1
      presentAuditfromDate: null,
      presentAuditToDate: null,
      AuditcompletedfromDate: null,
      AuditcompletedToDate: null,
      AuditsubmittedDate: null,
      Ordinary: "",
      Normal: "",
      Societies: "",
      others: "",
      memberpaidentrancefee: false,
      memberapplicationsfilledproperty: false,
      membersIMSCRules: false,
      membersJMSCRules: false,
      decreaseddismissedorregister: false,
      resignationdulyaccepted: false,
      membersnominations: false,
      applicationforshares: false,
      Isshareregisteruptodate: false,
      entriesincashbook: false,
      writtenledger: false,
      totalofshareledger: false,
      sharecertificatesissued: false,
      sharestransfersandrefunds: false,
      byelawsborrowingssociety: false,
      hasitbeenexceeded: false,
      permissioncompetentauthority: false,
      AnnualGeneralMeetingDate: null,
      SpecialGeneralMeetingFromDate: null,
      SpecialGeneralMeetingToDate: null,
      NoOfBoardMeetings: "",
      NoOfSubCommitteeMeetings: "",
      NoofotherMeetings: "",
      societysubmittedauditrectification: false,
      societysubmittedauditrectificationDate: null,
      societysubmittedauditrectificationReson: "",
      importantpointsmentionedneglectedSociety: false,
      generalremarks: "",
      auditfees: "",
      detailsaboutoutstandingauditfees: "",
      internallocalaudit: "",
      CoordinationbetweenAuditor: "",
      Nameofofficer: "",
      PaydrawnGrade: "",
      otherallowances: "",
      whetherismember: null,
      hasBorrowed: " ",
      otherAmountsDue: null,
      listofStaff: "",
      hasCopyOfActRulesByeLaws: false,
      SectionNo: "",
      RulesNos: " ",
      ByeLawsNo: "",
      rulesundertheByelaws: false,
      Profitorloss: " ",
      netProfitDistributed: "",
      amountcounted: "",
      producedByDesignation: "",
      infoaccordingCashBook: false,
      ArrangementssafetyCash: false,
      BankReconciliationstatement: "",
      physicallysecurities: false,
      dividendscollected: false,
      relevantcertificates: false,
      investmentregister: false,
      Isrelevantregister: false,
      Verifypropertyphysically: "",
      Verifyimmovableproperty: "",
      propertydulyinsured: "",
      depreciationcharges: false,
      rateofdepreciation: "",
      draftofauditmemo: false,
      //form28
      AgencysanctioningLoan: "",
      Purposeloansanctioned: "",
      loansanctionedAmount: "",
      Maximumamountdrawn: "",
      Repaymentsmade: "",
      Outstanding: "",
      Amountoverdueifany: "",
      Remarks: "",
      repaymentsloanspunctual: false,
      conditionslaiddown: false,
      necessarydocuments: false,
      amountsubsidysanctioned: "",
      Hassanctionedamount: false,
      financialassistancemembership: "",
      certificatesfromofficers: "",
      declarationfrommembers: "",
      detailslandsforconstructions:"",
      titledeeds:false,
      ConstructionFlats:"",
      Constructionroads:"",
      OpenSpace:"",
      Otherpurposes:"",
      layoutsapproved:false,
      completioncertificates:false,
      buildingconstructioncommenced:false,
      Noofhousesflats:"",
      flatsallottedmembers:false,
      termsconditionscontracts:"",
      contractsproperlysanctioned:false,
      tendersofquotation: false,
      workprogresscertificate:false,
      architectsemployed:false,
      constructioncompletedtoplans:false,
      propertyregister:false,
      measurementbook:false,
      Stockregisters:false,
      valuationcertificates:false,
      expenditureallocated:false,
      buildingaccordingplans:"",
      flatownersociety:false,
      constructioninsured:false,
      promotersobligation:false,
      Examineagreements:false,
      favorofmembers:false,
      Societysinkingfund:false,
      Amountsrepaymentloan:false,
      Municipaltaxes:false,
      Leaserent:false,
      Servicecharges:false,
      Contributionsinkingfund:false,
      recoveriesofloan:false,
      amountsofoverdues:"",
      recoveroverdues:"",
      expenditureapproved:false,
      //schdule
      ScheduleI: false,
      ScheduleII: false,
      ScheduleIII: false,
      ScheduleIIIA: false,
      ScheduleIV: false,
      ScheduleV: false
    },
  });
  ;

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  //reset form
  const { reset } = methods;

  const handleSave = async (data) => {
    try {

      const cleanedTemplates =
        data.templates?.filter((t) => t.tempId && t.tempId !== "") || [];

      const finalData = {
        ...data,
        templates: cleanedTemplates,
      };

      console.log("Final Form Data:", finalData);

      const response = await fetch(`${REACT_APP_URL}/Audireport/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      const result = await response.json();
      console.log("Saved:", result);
      alert("Audit Report Saved Successfully!");
    setShowStepper(false)
    reset();  

    } catch (error) {
      console.error("Save Error:", error);
    }
  };


  const renderStepContent = (step) => {
    switch (step) {
      case 0: return <TemplateForm />;
      case 1: return <Form1 />;
      case 2: return <Form28 />;
      case 3: return <Schdule />;
      default: return <Typography>Unknown Step</Typography>;
    }
  };

  return (
    <Box p={3}>
      <Button sx={{ background: 'var(--complementary-color)',fontWeight:'bold' }} variant="contained" onClick={() => setShowStepper(true)}>
        Create Audit Reports
      </Button>

      {showStepper && (
        <Box mt={4}>
        
          <Stepper
            activeStep={activeStep}
            sx={{
              '& .MuiStepIcon-root.Mui-active': { color: 'var(--primary-color)' },
              '& .MuiStepIcon-root.Mui-completed': { color: 'var(--primary-color)' },
              '& .MuiStepConnector-root .MuiStepConnector-line': {
                borderColor: '#157497'
              }
            }}
          >
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>


          <FormProvider {...methods}>
            <Box mt={3}>{renderStepContent(activeStep)}</Box>

            <Box mt={2}>
              <Button disabled={activeStep === 0} onClick={handleBack}>

                <SkipPreviousIcon sx={{ color: 'var(--primary-color)' }} />
                back
              </Button>

              {activeStep !== steps.length - 1 ? (
                <Button
                  // variant="contained"
                  onClick={handleNext}
                  sx={{ ml: 2 }}
                >
                  next
                  <SkipNextIcon sx={{ color: 'var(--primary-color)' }} />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  sx={{ ml: 2 }}
                  onClick={methods.handleSubmit(handleSave)} 
                >
                  Save Audit Report
                </Button>
              )}
            </Box>
          </FormProvider>
        </Box>
      )}
    </Box>
  );
};

export default AuditReports;
