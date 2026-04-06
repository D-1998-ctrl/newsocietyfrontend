
import { useState } from "react";
import jsPDF from "jspdf";
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
      detailslandsforconstructions: "",
      titledeeds: false,
      ConstructionFlats: "",
      Constructionroads: "",
      OpenSpace: "",
      Otherpurposes: "",
      layoutsapproved: false,
      completioncertificates: false,
      buildingconstructioncommenced: false,
      Noofhousesflats: "",
      flatsallottedmembers: false,
      termsconditionscontracts: "",
      contractsproperlysanctioned: false,
      tendersofquotation: false,
      workprogresscertificate: false,
      architectsemployed: false,
      constructioncompletedtoplans: false,
      propertyregister: false,
      measurementbook: false,
      Stockregisters: false,
      valuationcertificates: false,
      expenditureallocated: false,
      buildingaccordingplans: "",
      flatownersociety: false,
      constructioninsured: false,
      promotersobligation: false,
      Examineagreements: false,
      favorofmembers: false,
      Societysinkingfund: false,
      Amountsrepaymentloan: false,
      Municipaltaxes: false,
      Leaserent: false,
      Servicecharges: false,
      Contributionsinkingfund: false,
      recoveriesofloan: false,
      amountsofoverdues: "",
      recoveroverdues: "",
      expenditureapproved: false,
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

const generatePDF = async (data) => {
  const doc = new jsPDF();

  // =========================
  // 🔹 Fetch Organisation Data
  // =========================
  let orgData = null;
  try {
    const res = await fetch(`${REACT_APP_URL}/Organisation`);
    const json = await res.json();
    orgData = Array.isArray(json) ? json[0] : json;
  } catch (err) {
    console.error("Failed to fetch organisation data:", err);
  }

  // =========================
  // 🔹 Layout Config
  // =========================
  const margin = 15;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = 285;
  const valueX = 90;
  const labelX = margin;

  let y = 0;

  // =========================
  // 🔹 Helpers
  // =========================

  const checkPageBreak = (height = 8) => {
    if (y + height > pageHeight) {
      doc.addPage();
      addHeader();
    }
  };

const addHeader = () => {
    y = 10;

    if (orgData) {
      // ── LEFT SIDE: Society Name + Address ──────────────────
      doc.setFontSize(11);
      doc.setFont(undefined, "bold");
      const societyName = orgData.SocietyName || "-";
      const wrappedName = doc.splitTextToSize(societyName, 95);
      doc.text(wrappedName, margin, y);

      doc.setFontSize(8);
      doc.setFont(undefined, "normal");
      const addressLine = `${orgData.AddressLine1 || ""}${orgData.AddressLine2 ? ", " + orgData.AddressLine2 : ""}`;
      const stateLine = `${orgData.State || ""} - ${orgData.Pin || ""}`;
      const wrappedAddr = doc.splitTextToSize(addressLine, 95);
      doc.text(wrappedAddr, margin, y + wrappedName.length * 5 + 1);
      doc.text(stateLine, margin, y + wrappedName.length * 5 + wrappedAddr.length * 4 + 4);

      // ── RIGHT SIDE: Registration Details ──────────────────
      const rightColX = pageWidth / 2 + 15; // start of right column
      const rightLabelX = rightColX;
      const rightValueX = rightColX + 22;   // value aligned after label

      let ry = y;

      // "Registration Details" heading
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text("Registration Details", rightLabelX, ry);
      ry += 6;

      doc.setFontSize(8);

      // Date row
      const regDate = orgData.RegisteredDate
        ? new Date(orgData.RegisteredDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "-";

      doc.setFont(undefined, "bold");
      doc.text("Date:", rightLabelX, ry);
      doc.setFont(undefined, "normal");
      doc.text(regDate, rightValueX, ry);
      ry += 5;

      // No row
      doc.setFont(undefined, "bold");
      doc.text("No:", rightLabelX, ry);
      doc.setFont(undefined, "normal");
      doc.text(orgData.Registration || "-", rightValueX, ry);
      ry += 5;

      // Authority row
      doc.setFont(undefined, "bold");
      doc.text("Authority:", rightLabelX, ry);
      doc.setFont(undefined, "normal");
      const authorityText = doc.splitTextToSize(
        orgData.RegisteringAuthority || "-",
        pageWidth - rightValueX - margin
      );
      doc.text(authorityText, rightValueX, ry);
      ry += authorityText.length * 4 + 2;

      // ── GREEN BADGE: top-right corner ─────────────────────
      const badgeText = orgData.Registration || "";
      const badgePadX = 4;
      const badgePadY = 2.5;
      const badgeTextW = doc.getTextWidth(badgeText);
      const badgeW = badgeTextW + badgePadX * 2;
      const badgeH = 6;
      const badgeX = pageWidth - margin - badgeW;
      const badgeY = 6;

      doc.setFillColor(220, 245, 220);
      doc.setDrawColor(80, 160, 80);
      doc.roundedRect(badgeX, badgeY, badgeW, badgeH, 1.5, 1.5, "FD");

      doc.setFontSize(7);
      doc.setTextColor(30, 120, 30);
      doc.setFont(undefined, "bold");
      doc.text(badgeText, badgeX + badgePadX, badgeY + badgePadY + 1);
      doc.setTextColor(0, 0, 0);
      doc.setFont(undefined, "normal");
    }

    // ── Vertical divider between left and right ────────────
    doc.setDrawColor(210);
    doc.line(pageWidth / 2 + 10, 8, pageWidth / 2 + 10, 34);

    // ── Horizontal divider below org block ─────────────────
    y = 36;
    doc.setDrawColor(150);
    doc.line(margin, y, pageWidth - margin, y);
    y += 7;

    // ── AUDIT REPORT title ─────────────────────────────────
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("AUDIT REPORT", pageWidth / 2, y, { align: "center" });
    y += 5;

    // ── Generated on (right-aligned) ───────────────────────
    doc.setFontSize(8);
    doc.setFont(undefined, "normal");
    doc.text(
      `Generated on: ${new Date().toLocaleDateString()}`,
      pageWidth - margin,
      y,
      { align: "right" }
    );
    y += 4;

    // ── Bottom divider ─────────────────────────────────────
    doc.setDrawColor(0);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;
  };

  // ✅ Section with optional line
  const addSection = (title, showLine = true) => {
    checkPageBreak(10);

    y += 5;

    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.text(title, margin, y);

    y += 3;

    if (showLine) {
      doc.setDrawColor(150);
      doc.line(margin, y, pageWidth - margin, y);
      y += 5;
    } else {
      y += 3;
    }

    doc.setFontSize(10);
    doc.setFont(undefined, "normal");
  };

  const addRow = (label, value) => {
    if (typeof value === "boolean") {
      value = value ? "Yes" : "No";
    } else if (value instanceof Date) {
      value = value.toLocaleDateString();
    } else if (!value) {
      value = "-";
    }

    const splitLabel = doc.splitTextToSize(label, valueX - labelX - 5);
    const splitValue = doc.splitTextToSize(
      value.toString(),
      pageWidth - valueX - margin
    );

    const rowHeight = Math.max(splitLabel.length, splitValue.length) * 6;

    checkPageBreak(rowHeight);

    doc.text(splitLabel, labelX, y);
    doc.text(splitValue, valueX, y);

    y += rowHeight;
  };

  const drawBox = (startY, endY) => {
    doc.setDrawColor(200);
    doc.rect(
      margin - 3,
      startY - 4,
      pageWidth - margin * 2 + 6,
      endY - startY + 8
    );
  };

  // =========================
  // 🔹 Start Document
  // =========================
  addHeader();

  // =========================
  // 🔹 Auditor Details
  // =========================
  let sectionStart = y;
  addSection("Auditor Details", false);
  addRow("Auditor Name",  data.auditorname);
  addRow("Mobile Number", data.auditormobileno);
  addRow("Address",       data.auditoraddress);
  drawBox(sectionStart, y);

  // =========================
  // 🔹 Templates
  // =========================
  sectionStart = y;
  addSection("Templates", false);

  if (data.templates?.length > 0) {
    data.templates.forEach((temp, index) => {
      checkPageBreak(10);
      doc.setFont(undefined, "bold");
      doc.text(`Template ${index + 1}`, margin, y);
      y += 5;
      doc.setFont(undefined, "normal");
      Object.entries(temp).forEach(([key, value]) => {
        addRow(key, value);
      });
      y += 3;
    });
  } else {
    addRow("Templates", "No Templates Available");
  }

  drawBox(sectionStart, y);

  // =========================
  // 🔹 FORM 1
  // =========================
  doc.addPage();
  addHeader();

  sectionStart = y;
  addSection("Form 1 Details");

  const form1Fields = [
    "presentAuditfromDate", "presentAuditToDate", "AuditcompletedfromDate",
    "AuditcompletedToDate", "AuditsubmittedDate", "Ordinary", "Normal",
    "Societies", "others", "memberpaidentrancefee", "memberapplicationsfilledproperty",
    "membersIMSCRules", "membersJMSCRules", "decreaseddismissedorregister",
    "resignationdulyaccepted", "membersnominations", "applicationforshares",
    "Isshareregisteruptodate", "entriesincashbook", "writtenledger",
    "totalofshareledger", "sharecertificatesissued", "sharestransfersandrefunds",
    "byelawsborrowingssociety", "hasitbeenexceeded", "permissioncompetentauthority",
    "AnnualGeneralMeetingDate", "SpecialGeneralMeetingFromDate", "SpecialGeneralMeetingToDate",
    "NoOfBoardMeetings", "NoOfSubCommitteeMeetings", "NoofotherMeetings",
    "societysubmittedauditrectification", "societysubmittedauditrectificationDate",
    "societysubmittedauditrectificationReson", "importantpointsmentionedneglectedSociety",
    "generalremarks", "auditfees",
  ];

  form1Fields.forEach((key) => addRow(key, data[key]));
  drawBox(sectionStart, y);

  // =========================
  // 🔹 FORM 28
  // =========================
  doc.addPage();
  addHeader();

  sectionStart = y;
  addSection("Form 28 Details");

  const form28Fields = [
    "AgencysanctioningLoan", "Purposeloansanctioned", "loansanctionedAmount",
    "Maximumamountdrawn", "Repaymentsmade", "Outstanding", "Amountoverdueifany",
    "Remarks", "repaymentsloanspunctual", "conditionslaiddown", "necessarydocuments",
    "amountsubsidysanctioned", "Hassanctionedamount", "financialassistancemembership",
  ];

  form28Fields.forEach((key) => addRow(key, data[key]));
  drawBox(sectionStart, y);

  // =========================
  // 🔹 SCHEDULE
  // =========================
  doc.addPage();
  addHeader();

  sectionStart = y;
  addSection("Schedule Details");

  const scheduleFields = [
    "ScheduleI", "ScheduleII", "ScheduleIII",
    "ScheduleIIIA", "ScheduleIV", "ScheduleV",
  ];

  scheduleFields.forEach((key) => addRow(key, data[key]));
  drawBox(sectionStart, y);

  // =========================
  // 🔹 Save
  // =========================
  doc.save("Audit_Report.pdf");
};

  // const generatePDF = (data) => {
  //   const doc = new jsPDF();

  //   // =========================
  //   // 🔹 Layout Config
  //   // =========================
  //   const margin = 15;
  //   const pageWidth = doc.internal.pageSize.getWidth();
  //   const pageHeight = 285;

  //   let y = 40;

  //   const labelX = margin;
  //   const valueX = 90;

  //   // =========================
  //   // 🔹 Helpers
  //   // =========================

  //   const checkPageBreak = (height = 8) => {
  //     if (y + height > pageHeight) {
  //       doc.addPage();
  //       addHeader();
  //       y = 30;
  //     }
  //   };

  //   const addHeader = () => {
  //     doc.setFontSize(16);
  //     doc.setFont(undefined, "bold");
  //     doc.text("AUDIT REPORT", pageWidth / 2, 15, { align: "center" });

  //     doc.setFontSize(9);
  //     doc.setFont(undefined, "normal");
  //     doc.text(
  //       `Generated on: ${new Date().toLocaleDateString()}`,
  //       pageWidth - margin,
  //       15,
  //       { align: "right" }
  //     );

  //     doc.setDrawColor(0);
  //     doc.line(margin, 18, pageWidth - margin, 18);
  //   };

  //   // ✅ Section with optional line
  //   const addSection = (title, showLine = true) => {
  //     checkPageBreak(10);

  //     y += 5;

  //     doc.setFontSize(12);
  //     doc.setFont(undefined, "bold");
  //     doc.text(title, margin, y);

  //     y += 3;

  //     if (showLine) {
  //       doc.setDrawColor(150);
  //       doc.line(margin, y, pageWidth - margin, y);
  //       y += 5;
  //     } else {
  //       y += 3;
  //     }

  //     doc.setFontSize(10);
  //     doc.setFont(undefined, "normal");
  //   };

  //   const addRow = (label, value) => {
  //     if (typeof value === "boolean") {
  //       value = value ? "Yes" : "No";
  //     } else if (value instanceof Date) {
  //       value = value.toLocaleDateString();
  //     } else if (!value) {
  //       value = "-";
  //     }

  //     const splitLabel = doc.splitTextToSize(label, valueX - labelX - 5);
  //     const splitValue = doc.splitTextToSize(
  //       value.toString(),
  //       pageWidth - valueX - margin
  //     );

  //     const rowHeight =
  //       Math.max(splitLabel.length, splitValue.length) * 6;

  //     checkPageBreak(rowHeight);

  //     doc.text(splitLabel, labelX, y);
  //     doc.text(splitValue, valueX, y);

  //     y += rowHeight;
  //   };

  //   const drawBox = (startY, endY) => {
  //     doc.setDrawColor(200);
  //     doc.rect(
  //       margin - 3,
  //       startY - 4,
  //       pageWidth - margin * 2 + 6,
  //       endY - startY + 8
  //     );
  //   };

  //   // =========================
  //   // 🔹 Start Document
  //   // =========================
  //   addHeader();

  //   // =========================
  //   // 🔹 Auditor Details (NO LINE)
  //   // =========================
  //   let sectionStart = y;

  //   addSection("Auditor Details", false);

  //   addRow("Auditor Name", data.auditorname);
  //   addRow("Mobile Number", data.auditormobileno);
  //   addRow("Address", data.auditoraddress);

  //   drawBox(sectionStart, y);

  //   // =========================
  //   // 🔹 Templates (NO LINE)
  //   // =========================
  //   sectionStart = y;

  //   addSection("Templates", false);

  //   if (data.templates?.length > 0) {
  //     data.templates.forEach((temp, index) => {
  //       checkPageBreak(10);

  //       doc.setFont(undefined, "bold");
  //       doc.text(`Template ${index + 1}`, margin, y);
  //       y += 5;

  //       doc.setFont(undefined, "normal");

  //       Object.entries(temp).forEach(([key, value]) => {
  //         addRow(key, value);
  //       });

  //       y += 3;
  //     });
  //   } else {
  //     addRow("Templates", "No Templates Available");
  //   }

  //   drawBox(sectionStart, y);

  //   // =========================
  //   // 🔹 FORM 1
  //   // =========================
  //   doc.addPage();
  //   addHeader();
  //   y = 30;

  //   sectionStart = y;

  //   addSection("Form 1 Details"); // line enabled

  //   const form1Fields = [
  //     "presentAuditfromDate",
  //     "presentAuditToDate",
  //     "AuditcompletedfromDate",
  //     "AuditcompletedToDate",
  //     "AuditsubmittedDate",
  //     "Ordinary",
  //     "Normal",
  //     "Societies",
  //     "others",
  //     "memberpaidentrancefee",
  //     "memberapplicationsfilledproperty",
  //     "membersIMSCRules",
  //     "membersJMSCRules",
  //     "decreaseddismissedorregister",
  //     "resignationdulyaccepted",
  //     "membersnominations",
  //     "applicationforshares",
  //     "Isshareregisteruptodate",
  //     "entriesincashbook",
  //     "writtenledger",
  //     "totalofshareledger",
  //     "sharecertificatesissued",
  //     "sharestransfersandrefunds",
  //     "byelawsborrowingssociety",
  //     "hasitbeenexceeded",
  //     "permissioncompetentauthority",
  //     "AnnualGeneralMeetingDate",
  //     "SpecialGeneralMeetingFromDate",
  //     "SpecialGeneralMeetingToDate",
  //     "NoOfBoardMeetings",
  //     "NoOfSubCommitteeMeetings",
  //     "NoofotherMeetings",
  //     "societysubmittedauditrectification",
  //     "societysubmittedauditrectificationDate",
  //     "societysubmittedauditrectificationReson",
  //     "importantpointsmentionedneglectedSociety",
  //     "generalremarks",
  //     "auditfees",
  //   ];

  //   form1Fields.forEach((key) => {
  //     addRow(key, data[key]);
  //   });

  //   drawBox(sectionStart, y);

  //   // =========================
  //   // 🔹 FORM 28
  //   // =========================
  //   doc.addPage();
  //   addHeader();
  //   y = 30;

  //   sectionStart = y;

  //   addSection("Form 28 Details");

  //   const form28Fields = [
  //     "AgencysanctioningLoan",
  //     "Purposeloansanctioned",
  //     "loansanctionedAmount",
  //     "Maximumamountdrawn",
  //     "Repaymentsmade",
  //     "Outstanding",
  //     "Amountoverdueifany",
  //     "Remarks",
  //     "repaymentsloanspunctual",
  //     "conditionslaiddown",
  //     "necessarydocuments",
  //     "amountsubsidysanctioned",
  //     "Hassanctionedamount",
  //     "financialassistancemembership",
  //   ];

  //   form28Fields.forEach((key) => {
  //     addRow(key, data[key]);
  //   });

  //   drawBox(sectionStart, y);

  //   // =========================
  //   // 🔹 SCHEDULE
  //   // =========================
  //   doc.addPage();
  //   addHeader();
  //   y = 30;

  //   sectionStart = y;

  //   addSection("Schedule Details");

  //   const scheduleFields = [
  //     "ScheduleI",
  //     "ScheduleII",
  //     "ScheduleIII",
  //     "ScheduleIIIA",
  //     "ScheduleIV",
  //     "ScheduleV",
  //   ];

  //   scheduleFields.forEach((key) => {
  //     addRow(key, data[key]);
  //   });

  //   drawBox(sectionStart, y);

  //   // =========================
  //   // 🔹 Save
  //   // =========================
  //   doc.save("Audit_Report_Professional.pdf");
  // };
  // const generatePDF = (data) => {
  //   const doc = new jsPDF();

  //   let y = 10;

  //   const addLine = (label, value) => {
  //     if (y > 280) {
  //       doc.addPage();
  //       y = 10;
  //     }

  //     doc.text(`${label}: ${value ?? ""}`, 10, y);
  //     y += 6;
  //   };

  //   doc.setFontSize(14);
  //   doc.text("Audit Report", 10, y);
  //   y += 10;

  //   doc.setFontSize(10);

  //   // 🔹 Loop through ALL fields except templates
  //   Object.keys(data).forEach((key) => {
  //     if (key === "templates") return;

  //     let value = data[key];

  //     // Format values
  //     if (typeof value === "boolean") {
  //       value = value ? "Yes" : "No";
  //     } else if (value instanceof Date) {
  //       value = value.toLocaleDateString();
  //     } else if (value === null) {
  //       value = "";
  //     }

  //     addLine(key, value);
  //   });

  //   // 🔹 Templates Section
  //   y += 10;
  //   doc.setFontSize(12);
  //   doc.text("Templates:", 10, y);
  //   y += 8;

  //   doc.setFontSize(10);

  //   if (data.templates && data.templates.length > 0) {
  //     data.templates.forEach((temp, index) => {
  //       addLine(`Template ${index + 1}`, "");

  //       Object.keys(temp).forEach((tKey) => {
  //         let tValue = temp[tKey];

  //         if (typeof tValue === "boolean") {
  //           tValue = tValue ? "Yes" : "No";
  //         } else if (tValue === null) {
  //           tValue = "";
  //         }

  //         addLine(`   ${tKey}`, tValue);
  //       });

  //       y += 5;
  //     });
  //   } else {
  //     addLine("No Templates", "");
  //   }

  //   doc.save("Audit_Report.pdf");
  // };

  const handleSave = async (data) => {
    try {

      const cleanedTemplates =
        data.templates?.filter((t) => t.tempId && t.tempId !== "") || [];

      const finalData = {
        ...data,
        templates: cleanedTemplates,
      };

      console.log("Final Form Data:", finalData);
      // ✅ Generate PDF BEFORE API call (or after, your choice)
      generatePDF(finalData);
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
      <Button sx={{ background: 'var(--complementary-color)', fontWeight: 'bold' }} variant="contained" onClick={() => setShowStepper(true)}>
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
