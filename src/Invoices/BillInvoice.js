// import { useState, useEffect, useMemo,useRef } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Autocomplete, useMediaQuery, Box, Button, Typography, TextField, Drawer, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, Paper, } from '@mui/material';
// import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
// import CloseIcon from '@mui/icons-material/Close';
// import { useTheme } from "@mui/material/styles";
// import { DatePicker } from "@mui/x-date-pickers";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import moment from "moment";
// import { toast } from "react-toastify";
// import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
// import "react-toastify/dist/ReactToastify.css";
// import TextareaAutosize from '@mui/material/TextareaAutosize';
// import axios from 'axios';
// import jsPDF from "jspdf";
// import { toWords } from "number-to-words";
// import html2canvas from "html2canvas";
// import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

// const BillInvoice = () => {
//   const REACT_APP_URL = process.env.REACT_APP_URL
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   const handleDrawerOpen = () => { setIsDrawerOpen(true); setIsEditing(false); resetForm() };

//   const handleDrawerClose = () => {
//     setRowId('')
//     setIsDrawerOpen(false);
//     resetForm()
//   };

//   const [billNum, setBillNum] = useState()
//   const [billDate, setBillDate] = useState(null);
//   const [period, setPeriod] = useState()
//   const [dueDate, setDueDate] = useState(null);
//   const [amtInWords, setAmtInWords] = useState(null);
//   const [narration, setNarration] = useState(null);
//   const [rowId, setRowId] = useState('');

//   //Fetch Members
//   const [memberOption, setMemberOption] = useState([]);
//   const [selectedMemberOption, setSelectedMemberOption] = useState('');

//   const fetchMember = async () => {
//     try {
//       const response = await fetch(
//         `${REACT_APP_URL}/Member`
//       );
//       const result = await response.json();

//       // console.log("Branch info:", result);

//       const options = result.map((member) => ({
//         value: member._id,
//         // label: `${member.firstName} ${member.middleName} ${member.surname}`,
//         label:member.memberName
//       }));

//       setMemberOption(options);
//     } catch (error) {
//       console.error("Error fetching accounts:", error);
//     }
//   };

//   //fetch Sevices
//   const [serviceOption, setServiceOption] = useState([]);
//   const fetchServices = async () => {
//     try {
//       const response = await fetch(`${REACT_APP_URL}/Service`);
//       const result = await response.json();

//       // console.log("Service API response:", result);

//       const options = result.data.map((service) => ({
//         value: service._id,
//         label: service.name,
//       }));

//       setServiceOption(options);
//     } catch (error) {
//       console.error("Error fetching services:", error);
//     }
//   };

//   //detail table
//   const [rows, setRows] = useState([
//     {
//       SerialNo: "",
//       invoiceId: "",
//       serviceIds: null,
//       amounts: "",
//     }

//   ]);

//   const handleAddRow = () => {
//     setRows([
//       ...rows,
//       {
//         SerialNo: "",
//         invoiceId: "",
//         serviceIds: null,
//         amounts: ""
//       }
//     ]);
//   };

//   const handleDeleteRow = (index) => {
//     const updatedRows = rows.filter((_, i) => i !== index);
//     setRows(updatedRows);
//   };

//   const handleRowChange = (index, field, value) => {
//     const updatedRows = [...rows];
//     updatedRows[index][field] = value;
//     setRows(updatedRows);
//   };

//   //create annd update  Invoice 
//   //main
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formattedBilldate = moment(billDate).format("YYYY-MM-DD");
//       const formattedDueDate = moment(dueDate).format("YYYY-MM-DD");

//       const paymentHeaderData = {
//         invoiceDate: formattedBilldate,
//         memberId: selectedMemberOption,
//         period: period,
//         dueDate: formattedDueDate,
//         narration: narration,
//         amtInWords: amtInWords,
//         billinvoiceNumber: billNum,
//       };

//       let invoiceId;


//       if (rowId) {

//         await axios.patch(
//           `${REACT_APP_URL}/InvoiceHeader/${rowId}`,
//           paymentHeaderData
//         );
//         invoiceId = rowId;
//       } else {

//         const response = await axios.post(
//           `${REACT_APP_URL}/InvoiceHeader`,
//           paymentHeaderData
//         );
//         invoiceId = response.data._id; 
//       }


//       for (const [index, row] of rows.entries()) {
//         const detailData = {
//           invoiceId: invoiceId,
//           SRN: index + 1,
//           serviceIds: row.serviceIds,
//           amounts: Number(row.amounts),
//         };

//         if (row._id) {

//           await axios.put(
//             `${REACT_APP_URL}/InvoiceDetail/${row._id}`,
//             detailData
//           );
//         } else {

//           await axios.post(
//             `${REACT_APP_URL}/InvoiceDetail`,
//             detailData
//           );
//         }
//       }


//       setIsDrawerOpen(false);
//       toast.success(rowId ? "Invoice updated successfully!" : "Invoice created successfully!");

//       getInvHeader();
//       resetForm();

//     } catch (error) {
//       console.error("Error submitting invoice:", error);
//       toast.error("Something went wrong while saving invoice");
//     }
//   };

//   //get header
//   const [headerData, setheaderData] = useState([]);

//   const getInvHeader = () => {
//     const url = `${REACT_APP_URL}/invoiceheader`;
//     // console.log(" URL:", url);
//     const requestOptions = {
//       method: "GET",
//       redirect: "follow"
//     };
//     fetch(url, requestOptions)
//       .then((response) => response.json())
//       .then(data => {
//         // console.log('data', data);
//         setheaderData(data);

//       })
//       .catch((error) => console.error(error));
//   };

//   useEffect(() => {
//     fetchMember();
//     fetchServices();
//     getInvHeader();
//     fetchOrgData();
//   }, []);


//   const [previewData, setPreviewData] = useState(null);

//   const columns = useMemo(() => {
//     return [
//       {
//         accessorKey: 'srNo',
//         header: 'Sr No',
//         size: 100,
//         Cell: ({ row }) => row.index + 1,
//       },


//       {
//         accessorKey: 'invoiceDate',
//         header: 'Invoice Date',
//         size: 150,
//         Cell: ({ cell }) => <span>{moment(cell.getValue()).format('DD-MM-YYYY')}</span>,
//       },

//       {
//         accessorKey: 'period',
//         header: 'period',
//         size: 150,

//       },

//       {
//         accessorKey: 'dueDate',
//         header: 'Due Date',
//         size: 150,
//         Cell: ({ cell }) => <span>{moment(cell.getValue()).format('DD-MM-YYYY')}</span>,
//       },

//       {
//         accessorKey: 'amtInWords',
//         header: 'Amount In Words',
//         size: 150,
//       },

//       {
//         accessorKey: 'narration',
//         header: 'Narration',
//         size: 150,
//       },

//       {
//         header: 'Actions',
//         size: 200,
//         Cell: ({ row }) => (
//           <Box display="flex" gap={1}>
//             <Button
//               variant="contained"
//               size="small"
//               sx={{ background: 'var(--secondary-color)' }}
//               onClick={() => handleEdit(row.original)}
//             >
//               Edit
//             </Button>


//             <Button
//               variant="contained"
//               sx={{ background: '#1f5675' }}
//               size="small"
//               onClick={() => handlePreview(row.original)}
//             >
//               Preview
//             </Button>


//           </Box>
//         ),
//       },

//     ];
//   }, []);

//   const table = useMaterialReactTable({
//     columns,
//     data: headerData,
//     enablePagination: true,
//     muiTableHeadCellProps: {
//       style: {
//         backgroundColor: "#ecfbfd",
//         color: "black",
//         fontSize: "16px",
//       },
//     },


//   });

//   const buildInvoiceData = async (rowData) => {
//     // ===== HEADER =====
//     const header = {
//       _id: rowData._id,
//       invoiceDate: rowData.invoiceDate,
//       billinvoiceNumber: rowData.billinvoiceNumber,
//       period: rowData.period,
//       dueDate: rowData.dueDate,
//       amtInWords: rowData.amtInWords,
//       narration: rowData.narration,
//       memberId: rowData.memberId,
//     };

//     // ===== DETAILS =====
//     const res = await axios.get(
//       `${REACT_APP_URL}/InvoiceDetail/InvoiceId/${rowData._id}`
//     );

//     const details = res.data.map(d => ({
//       _id: d._id,
//       serviceIds: d.serviceIds,
//       amounts: d.amounts,
//     }));

//     return { header, details };
//   };

//   const handleEdit = async (rowData) => {
//     // console.log("This row has been clicked:", rowData);

//     setIsEditing(true);
//     setRowId(rowData._id);
//     const invoiceData = await buildInvoiceData(rowData);
//     // header
//     setBillDate(invoiceData.header.invoiceDate);
//     setBillNum(invoiceData.header.billinvoiceNumber);
//     setPeriod(invoiceData.header.period);
//     setDueDate(invoiceData.header.dueDate);
//     setAmtInWords(invoiceData.header.amtInWords);
//     setNarration(invoiceData.header.narration);
//     setSelectedMemberOption(invoiceData.header.memberId);
//     // details
//     setRows(invoiceData.details);
//     setIsDrawerOpen(true);
//   };

//   //main
//   // const handleEdit = async (rowData) => {
//   //   console.log("This row has been clicked:", rowData);
//   //   setIsDrawerOpen(true);
//   //   setIsEditing(true);
//   //   setRowId(rowData._id);
//   //   setBillDate(rowData.invoiceDate);
//   //   setBillNum(rowData.billinvoiceNumber);
//   //   setPeriod(rowData.period);
//   //   setDueDate(rowData.dueDate);
//   //   setAmtInWords(rowData.amtInWords);
//   //   setNarration(rowData.narration);
//   //   setSelectedMemberOption(rowData.memberId);

//   //   // 🔥 FETCH DETAILS
//   //   const res = await axios.get(
//   //     `${REACT_APP_URL}/InvoiceDetail/InvoiceId/${rowData._id}`
//   //   );

//   //   const mappedRows = res.data.map((d) => ({
//   //     _id: d._id,
//   //     serviceIds: d.serviceIds,
//   //     amounts: d.amounts,
//   //   }));

//   //   setRows(mappedRows);
//   // };
//   const [openPreview, setOpenPreview] = useState(false);
//   const handlePreview = async (rowData) => {
//     const invoiceData = await buildInvoiceData(rowData);
//     setPreviewData(invoiceData);
//     setOpenPreview(true);
//     // console.log("PREVIEW DATA:", invoiceData);
//   };

//   const resetForm = () => {
//     setSelectedMemberOption('')
//     setBillDate('')
//     setDueDate('')
//     setBillNum('')
//     setPeriod('')
//     setAmtInWords('')
//     setNarration('')
//     setRows([{
//       SerialNo: "",
//       invoiceId: "",
//       serviceIds: "",
//       amounts: ""
//     }])
//   }

//   //for org data 
//   const [orgData, setOrgData] = useState(null);
//   const fetchOrgData = async () => {
//     try {
//       const response = await fetch(`${REACT_APP_URL}/Organisation/`);

//       if (!response.ok) {
//         throw new Error("Failed to fetch organization data");
//       }

//       const data = await response.json();
//       // console.log(data);
//       setOrgData(data[0]);
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   //pdf preview
//   const previewRef = useRef();
//   const handleDownloadPDF = async () => {
//     const element = previewRef.current;
//     if (!element) return;

//     const canvas = await html2canvas(element, {
//       scale: 2,
//       useCORS: true,
//     });

//     const imgData = canvas.toDataURL("image/png");

//     const pdf = new jsPDF("p", "mm", "a4");

//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const pageHeight = pdf.internal.pageSize.getHeight();

//     const margin = 10;

//     const imgWidth = pageWidth - margin * 2;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;

//     let yPosition = margin;

//     // ---- SINGLE PAGE ----
//     if (imgHeight <= pageHeight - margin * 2) {
//       pdf.addImage(
//         imgData,
//         "PNG",
//         margin,
//         yPosition,
//         imgWidth,
//         imgHeight
//       );
//     }
//     // ---- MULTI PAGE ----
//     else {
//       let remainingHeight = imgHeight;

//       while (remainingHeight > 0) {
//         pdf.addImage(
//           imgData,
//           "PNG",
//           margin,
//           yPosition,
//           imgWidth,
//           imgHeight
//         );

//         remainingHeight -= pageHeight - margin * 2;

//         if (remainingHeight > 0) {
//           pdf.addPage();
//           yPosition = margin;
//         }
//       }
//     }
//     const billNo = previewData?.header?.billinvoiceNumber || "NA";
//     pdf.save(`Invoice_${billNo}.pdf`);
//   };
//   //subtotal of amounts
//   const subTotal = rows.reduce(
//     (sum, row) => sum + Number(row.amounts || 0),
//     0
//   );
//   //
//   const getAmountInWords = (amount) => {
//     if (!amount || amount === 0) return "Zero Rupees Only";

//     return (
//       toWords(Math.floor(amount))
//         .replace(/\b\w/g, (c) => c.toUpperCase()) +
//       " Rupees Only"
//     );
//   };
//   useEffect(() => {
//     setAmtInWords(getAmountInWords(subTotal));
//   }, [subTotal]);



//   return (
//     <Box>
//       <Box>
//         <Button ariant="contained" sx={{ background: 'var(--complementary-color)', color: '#fff', ml: 2,fontWeight:'bold' }} onClick={handleDrawerOpen}>Create Bill Invoice</Button>
//       </Box>

//       <Box mt={4} m={2} >
//         <MaterialReactTable table={table}

//           muiTableHeadCellProps={{
//             sx: { color: 'var(--primary-color)', },
//           }}
//         />
//       </Box>

//       {/* ///for preview///////// */}.
//       <Dialog
//         open={openPreview}
//         onClose={() => setOpenPreview(false)}
//         fullWidth
//         maxWidth={false}   // 🔥 IMPORTANT
//         PaperProps={{
//           sx: {
//             width: "1000px",   // increase here
//             // maxWidth: "1000px"
//           }
//         }}
//       >

//         <DialogContent dividers>
//           {previewData && orgData && (() => {

//             const memberName =
//               memberOption.find(
//                 (m) =>
//                   m.value?.toString() ===
//                   previewData?.header?.memberId?.toString()
//               )?.label || "Unknown";

//             // ✅ SAFE TOTAL CALCULATION
//             const totalAmount =
//               previewData?.details?.reduce(
//                 (sum, item) => sum + Number(item?.amounts || 0),
//                 0
//               ) || 0;

//             return (
//               <Box ref={previewRef} sx={{ border: "1px solid #000", fontSize: "14px" }}>

//                 {/* ===== SOCIETY HEADER ===== */}
//                 <Box sx={{ textAlign: "center", p: 1 }}>
//                   <Typography fontWeight={700}>
//                     {orgData?.SocietyName}
//                   </Typography>
//                   <Typography variant="body2">
//                     Reg.No.: {orgData?.Registration}
//                   </Typography>
//                   <Typography variant="body2">
//                     {orgData?.AddressLine1}
//                   </Typography>
//                 </Box>
//                 <DialogTitle sx={{ textAlign: "center", fontWeight: 700 }}>
//                   MAINTENANCE BILL
//                 </DialogTitle>
//                 <Divider />

//                 {/* ===== MEMBER & BILL INFO ===== */}
//                 <Box sx={{ display: "flex", borderTop: "1px solid #000" }}>
//                   <Box sx={{ width: "65%", p: 1, borderRight: "1px solid #000" }}>
//                     <Typography>
//                       <strong>Member:</strong> {memberName}
//                     </Typography>
//                     <Typography>
//                       {/* <strong>Flat:</strong> {previewData?.header?.flatNo || "-"} */}
//                     </Typography>
//                   </Box>

//                   <Box sx={{ width: "35%", p: 1 }}>
//                     <Typography>
//                       <strong>Bill No:</strong>{" "}
//                       {previewData?.header?.billinvoiceNumber || "-"}
//                     </Typography>
//                     <Typography>
//                       <strong>Date:</strong>{" "}
//                       {previewData?.header?.invoiceDate || "-"}
//                     </Typography>
//                     <Typography>
//                       <strong>Due Date:</strong>{" "}
//                       {previewData?.header?.dueDate || "-"}
//                     </Typography>
//                     <Typography>
//                       <strong>Billing Period:</strong>{" "}
//                       {previewData?.header?.period || "-"}
//                     </Typography>
//                   </Box>
//                 </Box>

//                 {/* ===== TABLE HEADER ===== */}
//                 <Box
//                   sx={{
//                     display: "flex",
//                     bgcolor: "#a9a9a9",
//                     borderTop: "1px solid #000",
//                     fontWeight: 700
//                   }}
//                 >
//                   <Box sx={{ width: "10%", p: 1, borderRight: "1px solid #000" }}>
//                     SR NO.
//                   </Box>
//                   <Box sx={{ width: "65%", p: 1, borderRight: "1px solid #000" }}>
//                     PARTICULARS
//                   </Box>
//                   <Box sx={{ width: "25%", p: 1, textAlign: "right" }}>
//                     AMOUNT
//                   </Box>
//                 </Box>

//                 {/* ===== TABLE ROWS ===== */}
//                 {previewData?.details?.length > 0 ? (
//                   previewData.details.map((row, index) => {
//                     const serviceName =
//                       serviceOption.find(
//                         (s) =>
//                           s.value?.toString() ===
//                           row?.serviceIds?.toString()
//                       )?.label || "Unknown";

//                     return (
//                       <Box
//                         key={index}
//                         sx={{ display: "flex", borderTop: "1px solid #000" }}
//                       >
//                         <Box
//                           sx={{ width: "10%", p: 1, borderRight: "1px solid #000" }}
//                         >
//                           {index + 1}
//                         </Box>
//                         <Box
//                           sx={{ width: "65%", p: 1, borderRight: "1px solid #000" }}
//                         >
//                           {serviceName}
//                         </Box>
//                         <Box sx={{ width: "25%", p: 1, textAlign: "right" }}>
//                           {Number(row?.amounts || 0).toFixed(2)}
//                         </Box>
//                       </Box>
//                     );
//                   })
//                 ) : (
//                   <Box sx={{ p: 1, borderTop: "1px solid #000" }}>
//                     No invoice details available
//                   </Box>
//                 )}

//                 {/* ===== TOTAL ===== */}
//                 <Box sx={{ display: "flex", borderTop: "1px solid #000" }}>
//                   <Box sx={{ width: "75%", p: 1, textAlign: "right" }}>
//                     <strong>Sub-Total</strong>
//                   </Box>
//                   <Box sx={{ width: "25%", p: 1, textAlign: "right" }}>
//                     <strong>{totalAmount.toFixed(2)}</strong>

//                   </Box>
//                 </Box>

//                 <Box sx={{ display: "flex", borderTop: "1px solid #000" }}>
//                   <Box sx={{ width: "75%", p: 1, textAlign: "right" }}>
//                     <strong>Dues / Excess (-)</strong>
//                   </Box>
//                   <Box sx={{ width: "25%", p: 1, textAlign: "right" }}>
//                     <strong>{totalAmount.toFixed(2)}</strong>
//                   </Box>
//                 </Box>

//                 {/* ===== AMOUNT IN WORDS ===== */}
//                 <Box sx={{ p: 1, borderTop: "1px solid #000" }}>
//                   <strong>Amount in Words:</strong>{" "}
//                   {previewData?.header?.amtInWords || "-"}
//                 </Box>

//                 {/* ===== TERMS ===== */}
//                 <Box sx={{ p: 1 }}>
//                   <Typography fontWeight={700}>Terms & Conditions</Typography>
//                   <Typography variant="body2">E & O.E.</Typography>
//                   <Typography variant="body2" mt={1}>
//                     1.Cheques to be in favour of "<b>{orgData.SocietyName} </b>"  & Cheques to be dropped in the cheque drop box.
//                   </Typography>
//                   <Typography variant="body2">
//                     2. Mention your Flat No. and Mobile No. on the reverse of the cheque.
//                   </Typography>
//                   <Typography variant="body2">
//                     3. Non Payment of Bill will attract interest @21 % PA.
//                   </Typography>
//                   <Typography variant="body2">
//                     4.Errors to be intimated within 7 days to Society Office
//                   </Typography>


//                 </Box>

//                 <Box sx={{ p: 1 }}>
//                   <Typography fontWeight={700}>Remarks</Typography>
//                   <Typography variant="body2" mt={1}>
//                     Maintenance bills for <b>{previewData?.header?.period} </b>  & Cheques to be dropped in the cheque drop box.
//                   </Typography>
//                 </Box>

//                 <Box sx={{ mt: 3, borderTop: "1px dashed #000", p: 2 }}>
//                   <Typography sx={{ fontWeight: "bold" }}>Bank Details for {orgData.societyName}</Typography>
//                   <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
//                     <Typography variant="body2">Bank Name: SVC Bank Ltd.</Typography>
//                     <Typography variant="body2">A/c No.: 300003000012169</Typography>
//                   </Box>
//                   <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
//                     <Typography variant="body2">Branch & IFSC: Bandra & SVCB0000003</Typography>
//                     <Typography variant="body2">Sign image</Typography>
//                   </Box>
//                 </Box>

//                 {/* ===== FOOTER ===== */}
//                 <Box sx={{ textAlign: "right", p: 1 }}>
//                   <Typography fontWeight={700}>
//                     Chairman / Secretary / Manager
//                   </Typography>
//                 </Box>
//               </Box>
//             );
//           })()}
//         </DialogContent>

//         <DialogActions>
//           <Button
//             variant="contained"
//             onClick={handleDownloadPDF}
//             endIcon={<DownloadForOfflineIcon />}
//             sx={{
//               backgroundColor: "var(--secondary-color)",

//               px: 2.5,
//               py: 1,
//               borderRadius: "6px",
//             }}
//           >
//             Invoice
//           </Button>


//           <Button sx={{ borderColor: 'var(--secondary-color)', color: 'var(--secondary-color)', fontWeight: 600, }} variant="outlined" onClick={() => setOpenPreview(false)}>
//             Close
//           </Button>


//         </DialogActions>
//       </Dialog>

//       <Drawer
//         anchor="right"
//         open={isDrawerOpen}
//         onClose={handleDrawerClose}
//         PaperProps={{
//           sx: {
//             borderRadius: isSmallScreen ? "0" : "10px 0 0 10px",
//             width: isSmallScreen ? "100%" : "50%",
//             zIndex: 1000,
//           },
//         }}
//       >

//         <Box>
//           <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ecfbfd' }}>

//             <Typography m={2} fontWeight="bold" variant="h6" color='var(--primary-color)'>
//               {isEditing ? "Update Audit Template" : "Create Audit Template"}
//             </Typography>
//             <CloseIcon sx={{ cursor: 'pointer' }} onClick={handleDrawerClose} />
//           </Box>
//           <Divider />

//           <Box>
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <Box m={2}>
//                 <Typography>DR Member Name</Typography>

//                 <Autocomplete
//                   options={memberOption}
//                   getOptionLabel={(option) => option.label || ""}
//                   value={
//                     memberOption.find(
//                       (opt) => opt.value === selectedMemberOption
//                     ) || null
//                   }
//                   onChange={(event, newValue) => {
//                     setSelectedMemberOption(newValue ? newValue.value : "");
//                   }}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       variant="standard"
//                       size="small"
//                       sx={{
//                         mt: 1,
//                         '& .MuiInput-underline:after': {
//                           borderBottomWidth: 1.5,
//                           borderBottomColor: '#144145',
//                         },
//                       }}
//                     />
//                   )}
//                 />
//               </Box>

//               <Box display={'flex'} alignItems={'center'} m={2} justifyContent={'space-between'}>
//                 <Box>
//                   <Typography>Bill Number</Typography>
//                   <TextField
//                     variant="standard"
//                     sx={{
//                       '& .MuiInput-underline:after': {
//                         borderBottomWidth: 1.5,
//                         borderBottomColor: '#144145',
//                       },
//                     }}
//                     focused
//                     InputProps={{
//                       readOnly: true,
//                     }}

//                     value={billNum}
//                     onChange={(e) => setBillNum(e.target.value)}
//                     type="number"
//                     size="small" placeholder="Bill No" fullWidth />
//                 </Box>

//                 <Box>
//                   <Typography>Bill Date</Typography>
//                   <DatePicker
//                     value={billDate ? new Date(billDate) : null}
//                     format="dd-MM-yyyy"
//                     onChange={(newValue) => setBillDate(newValue)}
//                     slotProps={{
//                       textField: { size: "small", fullWidth: true, },
//                     }}
//                   />
//                 </Box>

//               </Box>

//               <Box display={'flex'} alignItems={'center'} m={2} justifyContent={'space-between'}>
//                 <Box>
//                   <Typography>Period</Typography>
//                   <TextField
//                     variant="standard"
//                     sx={{
//                       '& .MuiInput-underline:after': {
//                         borderBottomWidth: 1.5,
//                         borderBottomColor: '#144145',
//                       },
//                     }}
//                     focused

//                     value={period}
//                     onChange={(e) => setPeriod(e.target.value)}

//                     size="small" placeholder="Period" fullWidth />
//                 </Box>

//                 <Box>
//                   <Typography>Due Date</Typography>
//                   <DatePicker
//                     value={dueDate ? new Date(dueDate) : null}
//                     format="dd-MM-yyyy"
//                     onChange={(newValue) => setDueDate(newValue)}
//                     slotProps={{
//                       textField: { size: "small", fullWidth: true, },
//                     }}
//                   />
//                 </Box>

//               </Box>
//               {/* detail table */}
//               <Box m={2}>
//                 <TableContainer component={Paper}>
//                   <Table>
//                     <TableHead>
//                       <TableRow>
//                         <TableCell>Sr No</TableCell>
//                         <TableCell>Particulars</TableCell>
//                         <TableCell>Amount</TableCell>
//                         <TableCell align="center">Action</TableCell>
//                       </TableRow>
//                     </TableHead>

//                     <TableBody>
//                       {rows.map((row, index) => (
//                         <TableRow key={index}>
//                           {/* Sr No */}
//                           <TableCell>{index + 1}</TableCell>

//                           {/* Service */}
//                           <TableCell>
//                             <Autocomplete
//                               options={serviceOption}
//                               getOptionLabel={(option) => option.label || ""}
//                               value={
//                                 serviceOption.find(
//                                   (opt) => opt.value === row.serviceIds
//                                 ) || null
//                               }
//                               onChange={(e, newValue) =>
//                                 handleRowChange(
//                                   index,
//                                   "serviceIds",
//                                   newValue ? newValue.value : null
//                                 )
//                               }
//                               renderInput={(params) => (
//                                 <TextField {...params} variant="standard" />
//                               )}
//                             />
//                           </TableCell>

//                           {/* Amount */}
//                           <TableCell>
//                             <TextField
//                               variant="standard"
//                               type="number"
//                               value={row.amounts}
//                               onChange={(e) =>
//                                 handleRowChange(index, "amounts", e.target.value)
//                               }
//                               placeholder="Amount"
//                               fullWidth
//                             />
//                           </TableCell>



//                           {/* Actions */}
//                           <TableCell align="center">
//                             <Box display="flex" justifyContent="center" gap={1}>
//                               <Button
//                                 sx={{ backgroundColor: "var(--primary-color)", color: "white" }}
//                                 onClick={handleAddRow}>
//                                 <AddIcon />
//                               </Button>
//                               <Button
//                                 sx={{ backgroundColor: "red", color: "white" }}
//                                 onClick={() => handleDeleteRow(index)}>
//                                 <DeleteIcon />
//                               </Button>
//                             </Box>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>

//                     <TableFooter>
//                       <TableRow>
//                         <TableCell colSpan={2} align="right" sx={{ color: 'black', fontSize: 15 }}>
//                           <b>Sub Total </b>
//                         </TableCell>
//                         <TableCell sx={{ color: 'black', fontSize: 15 }}>
//                           <b>₹ {subTotal.toFixed(2)} </b>
//                         </TableCell>
//                         <TableCell />
//                       </TableRow>
//                     </TableFooter>


//                   </Table>
//                 </TableContainer>
//               </Box>

//               {/* <Box m={2}>
//                 <Typography>Amount in Words</Typography>
//                 <TextField
//                   variant="standard"
//                   sx={{
//                     '& .MuiInput-underline:after': {
//                       borderBottomWidth: 1.5,
//                       borderBottomColor: '#144145',
//                     },
//                   }}
//                   focused


//                   value={amtInWords}
//                   onChange={(e) => setAmtInWords(e.target.value)}

//                   size="small" fullWidth />
//               </Box> */}

//               <Box m={2}>
//                 <Typography>Amount in Words</Typography>
//                 <TextField
//                   variant="standard"
//                   value={amtInWords || ""}
//                   fullWidth
//                   size="small"
//                   InputProps={{ readOnly: true }}
//                   sx={{
//                     '& .MuiInput-underline:after': {
//                       borderBottomWidth: 1.5,
//                       borderBottomColor: "#144145",
//                     },
//                   }}
//                 />
//               </Box>


//               <Box m={2}>
//                 <Typography>Narration</Typography>

//                 <TextareaAutosize
//                   minRows={2}
//                   value={narration}
//                   onChange={(e) => setNarration(e.target.value)}
//                   style={{
//                     width: "100%",
//                     border: "none",
//                     borderBottom: "1.5px solid #144145",
//                     outline: "none",
//                     padding: "8px 0",
//                     fontFamily: "inherit",
//                   }}
//                 />
//               </Box>

//             </LocalizationProvider>

//           </Box>



//           <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2} mt={5} mb={5}>
//             <Box>
//               <Button
//                 sx={{ background: 'var(--secondary-color)', color: '#ffffff',fontWeight:'bold'  }}
//                 onClick={handleSubmit}
//                 variant="contained"
//               >
//                 {isEditing ? "Update" : "Save"}
//               </Button>
//             </Box>

//             <Box>
//               <Button
//                    sx={{ borderColor: 'var(--secondary-color)', color: 'var(--secondary-color)' }}
//                 onClick={handleDrawerClose} variant='outlined'><b>Cancel</b> </Button>
//             </Box>
//           </Box>
//         </Box>
//       </Drawer>
//     </Box>
//   )
// }

// export default BillInvoice

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Input, Dialog, DialogTitle, DialogContent, DialogActions, Autocomplete, useMediaQuery, Box, Button, Typography, TextField, Drawer, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, Paper, } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from "moment";
import { toast } from "react-toastify";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import "react-toastify/dist/ReactToastify.css";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import axios from 'axios';
import jsPDF from "jspdf";
import { toWords } from "number-to-words";
import html2canvas from "html2canvas";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import Cookies from "js-cookie";


const BillInvoice = () => {
  const REACT_APP_URL = process.env.REACT_APP_URL;
  const societyId = Cookies.get("societyId");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDrawerOpen = () => { setIsDrawerOpen(true); setIsEditing(false); resetForm() };

  const handleDrawerClose = () => {
    setRowId('')
    setIsDrawerOpen(false);
    resetForm()
  };

  const [billNum, setBillNum] = useState()
  const [billDate, setBillDate] = useState(null);
  const [period, setPeriod] = useState()
  const [dueDate, setDueDate] = useState(null);
  const [amtInWords, setAmtInWords] = useState(null);
  const [narration, setNarration] = useState(null);
  const [rowId, setRowId] = useState('');

  //Fetch Members
  const [memberOption, setMemberOption] = useState([]);
  const [selectedMemberOption, setSelectedMemberOption] = useState('');

  const fetchMember =useCallback( async () => {
    try {
      const response = await fetch(
        `${REACT_APP_URL}/Member/society/${societyId}`
      );
      const result = await response.json();

      // console.log("Branch info:", result);

      const options = result.map((member) => ({
        value: member._id,
        // label: `${member.firstName} ${member.middleName} ${member.surname}`,
        label: member.memberName
      }));

      setMemberOption(options);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  },[REACT_APP_URL,societyId]);

  //fetch Sevices
  const [serviceOption, setServiceOption] = useState([]);
  const fetchServices =useCallback( async () => {
    try {
      const response = await fetch(`${REACT_APP_URL}/Service/society/${societyId}`);
      const result = await response.json();

      // console.log("Service API response:", result);

      const options = result.map((service) => ({
        value: service._id,
        label: service.name,
      }));

      setServiceOption(options);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  },[REACT_APP_URL,societyId]);

  //detail table
  const [rows, setRows] = useState([
    {
      SerialNo: "",
      invoiceId: "",
      serviceIds: null,
      amounts: "",
    }

  ]);

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        SerialNo: "",
        invoiceId: "",
        serviceIds: null,
        amounts: ""
      }
    ]);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  //create annd update  Invoice 
  //main
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedBilldate = moment(billDate).format("YYYY-MM-DD");
      const formattedDueDate = moment(dueDate).format("YYYY-MM-DD");

      const paymentHeaderData = {
        invoiceDate: formattedBilldate,
        memberId: selectedMemberOption,
        period: period,
        dueDate: formattedDueDate,
        narration: narration,
        amtInWords: amtInWords,
        billinvoiceNumber: billNum,
      };

      let invoiceId;


      if (rowId) {

        await axios.put(
          `${REACT_APP_URL}/InvoiceHeader/society/${societyId}/invoiceheader/${rowId}`,
          paymentHeaderData
        );
        invoiceId = rowId;
      } else {

        const response = await axios.post(
          `${REACT_APP_URL}/InvoiceHeader/society/${societyId}`,
          paymentHeaderData
        );
        invoiceId = response.data._id;
      }


      for (const [index, row] of rows.entries()) {
        const detailData = {
          invoiceId: invoiceId,
          SRN: index + 1,
          serviceIds: row.serviceIds,
          amounts: Number(row.amounts),
        };

        if (row._id) {

          await axios.put(
            `${REACT_APP_URL}/InvoiceDetail/society/${societyId}/invdetail/${row._id}`,
            detailData
          );
        } else {

          await axios.post(
            `${REACT_APP_URL}/InvoiceDetail/society/${societyId}`,
            detailData
          );
        }
      }


      setIsDrawerOpen(false);
      toast.success(rowId ? "Invoice updated successfully!" : "Invoice created successfully!");

      getInvHeader();
      resetForm();

    } catch (error) {
      console.error("Error submitting invoice:", error);
      toast.error("Something went wrong while saving invoice");
    }
  };

  //get header
  const [headerData, setheaderData] = useState([]);

  const getInvHeader = () => {
    const url = `${REACT_APP_URL}/InvoiceHeader/society/${societyId}`;
    // console.log(" URL:", url);
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then(data => {
        // console.log('data', data);
        setheaderData(data);

      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchMember();
    fetchServices();
    getInvHeader();
    fetchOrgData();
  }, []);


  const [previewData, setPreviewData] = useState(null);

  const columns = useMemo(() => {
    return [
      {
        accessorKey: 'srNo',
        header: 'Sr No',
        size: 100,
        Cell: ({ row }) => row.index + 1,
      },


      {
        accessorKey: 'invoiceDate',
        header: 'Invoice Date',
        size: 150,
        Cell: ({ cell }) => <span>{moment(cell.getValue()).format('DD-MM-YYYY')}</span>,
      },

      {
        accessorKey: 'period',
        header: 'period',
        size: 150,

      },

      {
        accessorKey: 'dueDate',
        header: 'Due Date',
        size: 150,
        Cell: ({ cell }) => <span>{moment(cell.getValue()).format('DD-MM-YYYY')}</span>,
      },

      {
        accessorKey: 'amtInWords',
        header: 'Amount In Words',
        size: 150,
      },

      {
        accessorKey: 'narration',
        header: 'Narration',
        size: 150,
      },

      {
        header: 'Actions',
        size: 200,
        Cell: ({ row }) => (
          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              size="small"
              sx={{ background: 'var(--secondary-color)' }}
              onClick={() => handleEdit(row.original)}
            >
              Edit
            </Button>


            <Button
              variant="contained"
              sx={{ background: '#1f5675' }}
              size="small"
              onClick={() => handlePreview(row.original)}
            >
              Preview
            </Button>


          </Box>
        ),
      },

    ];
  }, []);

  const table = useMaterialReactTable({
    columns,
    data: headerData,
    enablePagination: true,
    muiTableHeadCellProps: {
      style: {
        backgroundColor: "#ecfbfd",
        color: "black",
        fontSize: "16px",
      },
    },


  });

  const buildInvoiceData = async (rowData) => {
    // ===== HEADER =====
    const header = {
      _id: rowData._id,
      invoiceDate: rowData.invoiceDate,
      billinvoiceNumber: rowData.billinvoiceNumber,
      period: rowData.period,
      dueDate: rowData.dueDate,
      amtInWords: rowData.amtInWords,
      narration: rowData.narration,
      memberId: rowData.memberId,
    };

    // ===== DETAILS =====
    const res = await axios.get(
      // `${REACT_APP_URL}/InvoiceDetail/InvoiceId/${rowData._id}`
      `${REACT_APP_URL}/InvoiceDetail/society/${societyId}/invid/${rowData._id}`
    );

    const details = res.data.map(d => ({
      _id: d._id,
      serviceIds: d.serviceIds,
      amounts: d.amounts,
    }));

    return { header, details };
  };

  const handleEdit = async (rowData) => {
    // console.log("This row has been clicked:", rowData);

    setIsEditing(true);
    setRowId(rowData._id);
    const invoiceData = await buildInvoiceData(rowData);
    // header
    setBillDate(invoiceData.header.invoiceDate);
    setBillNum(invoiceData.header.billinvoiceNumber);
    setPeriod(invoiceData.header.period);
    setDueDate(invoiceData.header.dueDate);
    setAmtInWords(invoiceData.header.amtInWords);
    setNarration(invoiceData.header.narration);
    setSelectedMemberOption(invoiceData.header.memberId);
    // details
    setRows(invoiceData.details);
    setIsDrawerOpen(true);
  };

  //main
  // const handleEdit = async (rowData) => {
  //   console.log("This row has been clicked:", rowData);
  //   setIsDrawerOpen(true);
  //   setIsEditing(true);
  //   setRowId(rowData._id);
  //   setBillDate(rowData.invoiceDate);
  //   setBillNum(rowData.billinvoiceNumber);
  //   setPeriod(rowData.period);
  //   setDueDate(rowData.dueDate);
  //   setAmtInWords(rowData.amtInWords);
  //   setNarration(rowData.narration);
  //   setSelectedMemberOption(rowData.memberId);

  //   // 🔥 FETCH DETAILS
  //   const res = await axios.get(
  //     `${REACT_APP_URL}/InvoiceDetail/InvoiceId/${rowData._id}`
  //   );

  //   const mappedRows = res.data.map((d) => ({
  //     _id: d._id,
  //     serviceIds: d.serviceIds,
  //     amounts: d.amounts,
  //   }));

  //   setRows(mappedRows);
  // };
  const [openPreview, setOpenPreview] = useState(false);
  const handlePreview = async (rowData) => {
    const invoiceData = await buildInvoiceData(rowData);
    setPreviewData(invoiceData);
    setOpenPreview(true);
    // console.log("PREVIEW DATA:", invoiceData);
  };

  const resetForm = () => {
    setSelectedMemberOption('')
    setBillDate('')
    setDueDate('')
    setBillNum('')
    setPeriod('')
    setAmtInWords('')
    setNarration('')
    setRows([{
      SerialNo: "",
      invoiceId: "",
      serviceIds: "",
      amounts: ""
    }])
  }

  //for org data 
  const [orgData, setOrgData] = useState(null);
  const fetchOrgData = async () => {
    try {
      const response = await fetch(`${REACT_APP_URL}/Organisation/`);

      if (!response.ok) {
        throw new Error("Failed to fetch organization data");
      }

      const data = await response.json();
      // console.log(data);
      setOrgData(data[0]);
    } catch (err) {
      console.error(err.message);
    }
  };

  //pdf preview
  const previewRef = useRef();
  const handleDownloadPDF = async () => {
    const element = previewRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const margin = 10;

    const imgWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let yPosition = margin;

    // ---- SINGLE PAGE ----
    if (imgHeight <= pageHeight - margin * 2) {
      pdf.addImage(
        imgData,
        "PNG",
        margin,
        yPosition,
        imgWidth,
        imgHeight
      );
    }
    // ---- MULTI PAGE ----
    else {
      let remainingHeight = imgHeight;

      while (remainingHeight > 0) {
        pdf.addImage(
          imgData,
          "PNG",
          margin,
          yPosition,
          imgWidth,
          imgHeight
        );

        remainingHeight -= pageHeight - margin * 2;

        if (remainingHeight > 0) {
          pdf.addPage();
          yPosition = margin;
        }
      }
    }
    const billNo = previewData?.header?.billinvoiceNumber || "NA";
    pdf.save(`Invoice_${billNo}.pdf`);
  };
  //subtotal of amounts
  const subTotal = rows.reduce(
    (sum, row) => sum + Number(row.amounts || 0),
    0
  );
  //
  const getAmountInWords = (amount) => {
    if (!amount || amount === 0) return "Zero Rupees Only";

    return (
      toWords(Math.floor(amount))
        .replace(/\b\w/g, (c) => c.toUpperCase()) +
      " Rupees Only"
    );
  };
  useEffect(() => {
    setAmtInWords(getAmountInWords(subTotal));
  }, [subTotal]);


  /////Import Excel
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewInvoices, setPreviewInvoices] = useState([]);
  const [isFirstTemplateDownload, setIsFirstTemplateDownload] = useState(true);


  const handleDownloadTemplate = async () => {
    const detailRowsPerMember = 20;

    // ✅ Fetch members safely
    let memberOption = [];
    try {
      const memberRes = await axios.get(`${REACT_APP_URL}/member`);
      memberOption = memberRes.data || [];
    } catch (err) {
      alert("Failed to fetch members. Please try again.");
      return;
    }

    const membersList = memberOption
      .map(opt => (opt?.memberName || opt?.label || "").replace(/,/g, ""))
      .filter(Boolean)
      .join(",");

    const serviceList = (serviceOption || [])
      .map(opt => (opt?.label || opt?.name || "").replace(/,/g, ""))
      .filter(Boolean)
      .join(",");

    // ──────────────────────────────────────────
    // FIRST TIME → BLANK TEMPLATE
    // ──────────────────────────────────────────
    if (isFirstTemplateDownload) {
      if (!memberOption?.length) {
        alert("No members available. Please try again later.");
        return;
      }

      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Invoice Template");

      sheet.getColumn(1).width = 25;
      sheet.getColumn(2).width = 30;

      let currentRow = 1;

      sheet.mergeCells(`A${currentRow}:B${currentRow}`);
      sheet.getCell(`A${currentRow}`).value =
        "📌 TEMPLATE: Fill this block for each member. Leave one blank row between members.";
      sheet.getCell(`A${currentRow}`).font = {
        italic: true,
        color: { argb: "FFFF0000" },
      };
      currentRow += 2;

      const headerFields = [
        "memberId",
        "invoiceDate",
        "period",
        "dueDate",
        "narration",
        "amtInWords",
      ];

      const numberOfMembers = 100;

      for (let m = 1; m <= numberOfMembers; m++) {
        sheet.mergeCells(`A${currentRow}:B${currentRow}`);
        sheet.getCell(`A${currentRow}`).value = `Member ${m}`;
        sheet.getCell(`A${currentRow}`).font = {
          bold: true,
          size: 14,
          color: { argb: "FF0000FF" },
        };
        currentRow++;

        const headerStartRow = currentRow;

        headerFields.forEach(field => {
          sheet.getCell(`A${currentRow}`).value = field;
          sheet.getCell(`A${currentRow}`).font = { bold: true };

          if (field === "memberId") {
            sheet.getCell(`B${currentRow}`).dataValidation = {
              type: "list",
              allowBlank: true,
              formulae: [`"${membersList}"`],
              showErrorMessage: true,
            };
          } else {
            sheet.getCell(`B${currentRow}`).value = "";
          }
          currentRow++;
        });

        currentRow++; // blank gap before service header

        sheet.getCell(`A${currentRow}`).value = "Service ID";
        sheet.getCell(`B${currentRow}`).value = "Amount";
        sheet.getRow(currentRow).font = { bold: true, color: { argb: "FFFFFFFF" } };
        sheet.getRow(currentRow).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF4CAF50" },
        };
        currentRow++;

        const detailStartRow = currentRow;

        for (let i = 0; i < detailRowsPerMember; i++) {
          sheet.getCell(`A${currentRow}`).dataValidation = {
            type: "list",
            allowBlank: true,
            formulae: [`"${serviceList}"`],
            showErrorMessage: true,
          };
          sheet.getCell(`B${currentRow}`).value = "";
          currentRow++;
        }

        const detailEndRow = currentRow - 1;

        sheet.getCell(`A${currentRow}`).value = "Total";
        sheet.getCell(`A${currentRow}`).font = { bold: true };
        sheet.getCell(`B${currentRow}`).value = {
          formula: `SUM(B${detailStartRow}:B${detailEndRow})`,
        };
        sheet.getCell(`B${currentRow}`).font = { bold: true };

        const amountInWordsRow =
          headerStartRow + headerFields.indexOf("amtInWords");
        sheet.getCell(`B${amountInWordsRow}`).value = {
          formula: `B${currentRow}`,
        };

        currentRow += 2;
      }

      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), "Bill_Invoice_Template.xlsx");
      setIsFirstTemplateDownload(false);

      // ──────────────────────────────────────────
      // SUBSEQUENT → EXPORT EXISTING DATA
      // ──────────────────────────────────────────
    } else {
      try {
        const [headersResponse, detailsResponse, membersResponse] =
          await Promise.all([
            axios.get(`${REACT_APP_URL}/InvoiceHeader`),
            axios.get(`${REACT_APP_URL}/InvoiceDetail`),
            axios.get(`${REACT_APP_URL}/Member`),
          ]);

        const headers = headersResponse.data || [];
        const details = detailsResponse.data || [];
        const members = membersResponse.data || [];

        const memberIdToName = {};
        members.forEach(member => {
          memberIdToName[member._id] = member.memberName;
        });

        const serviceIdToName = {};
        (serviceOption || []).forEach(service => {
          serviceIdToName[service.value] = service.label;
        });

        const workbook = new ExcelJS.Workbook();
        // ✅ Sheet name must match what handleFileChange looks for
        const sheet = workbook.addWorksheet("Invoice Export");

        sheet.getColumn(1).width = 25;
        sheet.getColumn(2).width = 30;

        let currentRow = 1;

        sheet.mergeCells(`A${currentRow}:B${currentRow}`);
        sheet.getCell(`A${currentRow}`).value =
          "📌 EXPORT: Update values as needed. Leave one blank row between members.";
        sheet.getCell(`A${currentRow}`).font = {
          italic: true,
          color: { argb: "FFFF0000" },
        };
        currentRow += 2;

        headers.forEach((header, index) => {
          // ── Member title ──
          sheet.mergeCells(`A${currentRow}:B${currentRow}`);
          sheet.getCell(`A${currentRow}`).value = `Member ${index + 1}`;
          sheet.getCell(`A${currentRow}`).font = {
            bold: true,
            size: 14,
            color: { argb: "FF0000FF" },
          };
          currentRow++;

          // ── header_id (needed for update) ──
          sheet.getCell(`A${currentRow}`).value = "header_id";
          sheet.getCell(`A${currentRow}`).font = { bold: true };
          sheet.getCell(`B${currentRow}`).value = header._id;
          currentRow++;

          const headerFields = [
            ["memberId", memberIdToName[header.memberId] || header.memberId],
            ["invoiceDate", header.invoiceDate],
            ["period", header.period],
            ["dueDate", header.dueDate],
            ["narration", header.narration],
            ["amtInWords", header.amtInWords],
          ];

          // Row where amtInWords will land (used for the formula reference later)
          const amtInWordsRowIndex =
            currentRow + headerFields.findIndex(([f]) => f === "amtInWords");

          headerFields.forEach(([field, value]) => {
            sheet.getCell(`A${currentRow}`).value = field;
            sheet.getCell(`A${currentRow}`).font = { bold: true };
            sheet.getCell(`B${currentRow}`).value = value ?? "";

            if (field === "memberId") {
              sheet.getCell(`B${currentRow}`).dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: [`"${membersList}"`],
              };
            }
            currentRow++;
          });

          currentRow++; // blank gap before service header

          // ── Service header row ──
          sheet.getCell(`A${currentRow}`).value = "Service ID";
          sheet.getCell(`B${currentRow}`).value = "Amount";
          sheet.getRow(currentRow).font = { bold: true, color: { argb: "FFFFFFFF" } };
          sheet.getRow(currentRow).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF4CAF50" },
          };
          currentRow++;

          // ── Detail rows (matched from DB) ──
          const matchedDetails = details.filter(d => d.invoiceId === header._id);
          const detailStartRow = currentRow;

          matchedDetails.forEach(detail => {
            // ✅ FIX: guard against non-array serviceIds / amounts
            const serviceIds = Array.isArray(detail.serviceIds)
              ? detail.serviceIds
              : detail.serviceIds
                ? [detail.serviceIds]
                : [];

            const amounts = Array.isArray(detail.amounts)
              ? detail.amounts
              : detail.amounts
                ? [detail.amounts]
                : [];

            serviceIds.forEach((serviceId, i) => {
              const serviceName =
                serviceIdToName[serviceId] || `Service-${serviceId}`;
              const amount = amounts[i] ?? 0;

              sheet.getCell(`A${currentRow}`).value = serviceName;
              sheet.getCell(`A${currentRow}`).dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: [`"${serviceList}"`],
              };
              sheet.getCell(`B${currentRow}`).value = amount;
              currentRow++;
            });
          });

          // ── Pad remaining blank rows up to detailRowsPerMember ──
          const filledRows = currentRow - detailStartRow;
          const remainingRows = Math.max(0, 20 - filledRows);

          for (let i = 0; i < remainingRows; i++) {
            sheet.getCell(`A${currentRow}`).dataValidation = {
              type: "list",
              allowBlank: true,
              formulae: [`"${serviceList}"`],
            };
            sheet.getCell(`B${currentRow}`).value = "";
            currentRow++;
          }

          const detailEndRow = currentRow - 1;

          // ── Total row ──
          sheet.getCell(`A${currentRow}`).value = "Total";
          sheet.getCell(`A${currentRow}`).font = { bold: true };
          sheet.getCell(`B${currentRow}`).value = {
            formula: `SUM(B${detailStartRow}:B${detailEndRow})`,
          };
          sheet.getCell(`B${currentRow}`).font = { bold: true };

          // ── amtInWords references Total cell ──
          sheet.getCell(`B${amtInWordsRowIndex}`).value = {
            formula: `B${currentRow}`,
          };

          currentRow += 2;
        });

        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), `Invoice_Export_${timestamp}.xlsx`);

      } catch (error) {
        console.error("Error exporting invoice data:", error);
        alert("Failed to export invoice data");
      }
    }
  };



  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const buffer = e.target.result;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);

        // ✅ Try both sheet names (template vs export)
        const worksheet =
          workbook.getWorksheet("Invoice Export") ||
          workbook.getWorksheet("Invoice Template") ||
          workbook.worksheets[0];

        if (!worksheet) throw new Error("No worksheet found in Excel");

        const invoices = [];
        const numberOfMembers = 100;

        for (let m = 1; m <= numberOfMembers; m++) {
          // Find the row labelled "Member m"
          let memberRow = null;
          for (let r = 1; r <= worksheet.rowCount; r++) {
            const cellVal = worksheet.getCell(`A${r}`).value;
            if (cellVal && cellVal.toString().trim() === `Member ${m}`) {
              memberRow = r;
              break;
            }
          }
          if (!memberRow) continue;

          let currentRow = memberRow + 1;

          const headerData = {};
          let header_id = null;

          // ── Optional header_id row (present in Export, absent in Template) ──
          const firstKey = worksheet.getCell(`A${currentRow}`).value;
          if (firstKey === "header_id" || firstKey === "_id") {
            header_id = worksheet.getCell(`B${currentRow}`).value;
            currentRow++;
          }

          // ── Fixed header fields ──
          const headerFields = [
            "memberId",
            "invoiceDate",
            "period",
            "dueDate",
            "narration",
            "amtInWords",
          ];

          for (const field of headerFields) {
            const keyCell = worksheet.getCell(`A${currentRow}`);
            const valCell = worksheet.getCell(`B${currentRow}`);
            if (keyCell?.value === field) {
              // amtInWords may be a formula result — read the calculated value
              const raw = valCell?.result ?? valCell?.value;
              if (raw !== null && raw !== undefined && raw !== "") {
                headerData[field] =
                  raw instanceof Date
                    ? raw.toLocaleDateString("en-GB")
                    : raw;
              }
            }
            currentRow++;
          }

          if (!headerData.memberId) continue;

          currentRow++; // blank row
          currentRow++; // "Service ID / Amount" header

          // ── Service detail rows ──
          const services = [];
          let currentDetailId = null;
          let currentInvoiceId = null;

          while (currentRow <= worksheet.rowCount) {
            const keyCell = worksheet.getCell(`A${currentRow}`);
            const valCell = worksheet.getCell(`B${currentRow}`);

            const keyVal = keyCell?.value;

            // Completely empty row → skip (merged-cell artefact)
            if (keyVal === null || keyVal === undefined || keyVal === "") {
              currentRow++;
              continue;
            }

            if (keyVal === "Total") break;

            if (keyVal === "detail_id") {
              currentDetailId = valCell?.value ?? null;
              currentRow++;
              continue;
            }

            if (keyVal === "invoiceId") {
              currentInvoiceId = valCell?.value ?? null;
              currentRow++;
              continue;
            }

            // ── Regular service row ──
            const rawAmount = valCell?.result ?? valCell?.value;
            const amount = parseFloat(rawAmount);
            if (!isNaN(amount)) {
              services.push({
                detail_id: currentDetailId,
                invoiceId: currentInvoiceId,
                serviceName: keyVal.toString(),
                amount,
              });
              currentDetailId = null;
              currentInvoiceId = null;
            }

            currentRow++;
          }

          if (services.length > 0) {
            invoices.push({
              _id: header_id || null,
              ...headerData,
              services,
            });
          }
        }

        setPreviewInvoices(invoices);
      } catch (error) {
        console.error("Error reading Excel:", error);
        alert(`Error reading Excel: ${error.message}`);
      }
    };

    reader.readAsArrayBuffer(file);
  };
  const handleExcelSave = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    const formatToISODate = (val) => {
      if (!val) return null;

      if (val instanceof Date) {
        return val.toISOString();
      }

      if (typeof val === "string" && val.includes("/")) {
        const [day, month, year] = val.split("/");
        return new Date(`${year}-${month}-${day}`).toISOString();
      }

      return val;
    };

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const buffer = e.target.result;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);

        const membersResponse = await axios.get(`${REACT_APP_URL}/Member`);
        const members = membersResponse.data || [];

        const templateSheet = workbook.getWorksheet("Invoice Template");

        // ===================== POST FLOW =====================
        if (templateSheet) {
          const invoices = [];

          for (let m = 1; m <= 100; m++) {
            let memberRow = null;

            for (let r = 1; r <= templateSheet.rowCount; r++) {
              const cell = templateSheet.getCell(`A${r}`);
              if (cell.value && cell.value.toString().trim() === `Member ${m}`) {
                memberRow = r;
                break;
              }
            }

            if (!memberRow) continue;

            let currentRow = memberRow + 1;
            const headerData = {};

            const headerFields = [
              "memberId",
              "invoiceDate",
              "period",
              "dueDate",
              "narration",
              "amtInWords",
            ];

            for (const field of headerFields) {
              let val = templateSheet.getCell(`B${currentRow}`).value;

              if (val?.formula !== undefined) {
                val = val.result ?? "";
              }

              // ✅ FIXED DATE HANDLING
              if (["invoiceDate", "dueDate"].includes(field)) {
                headerData[field] = formatToISODate(val);
              } else {
                headerData[field] = val;
              }

              currentRow++;
            }

            if (!headerData.memberId) continue;

            const member = members.find(
              (mem) =>
                mem.memberName?.trim() ===
                headerData.memberId.toString().trim()
            );

            if (!member) continue;

            headerData.memberId = member._id;

            currentRow += 2;

            const services = [];

            while (currentRow <= templateSheet.rowCount) {
              const serviceCell = templateSheet.getCell(`A${currentRow}`);
              const amountCell = templateSheet.getCell(`B${currentRow}`);

              if (!serviceCell.value) {
                currentRow++;
                continue;
              }

              if (serviceCell.value === "Total") break;

              const serviceName = serviceCell.value.toString().trim();
              const amount = parseFloat(amountCell.value);

              const service = serviceOption.find(
                (opt) => opt.label.trim() === serviceName
              );

              if (service && !isNaN(amount)) {
                services.push({
                  serviceId: service.value,
                  amount: amount,
                });
              }

              currentRow++;
            }

            if (services.length > 0) {
              invoices.push({ header: headerData, services });
            }
          }

          // SAVE
          for (const invoice of invoices) {
            try {
              const headerRes = await axios.post(
                `${REACT_APP_URL}/InvoiceHeader`,
                invoice.header
              );

              const invoiceId = headerRes.data._id;

              for (let i = 0; i < invoice.services.length; i++) {
                const s = invoice.services[i];

                await axios.post(`${REACT_APP_URL}/InvoiceDetail`, {
                  invoiceId,
                  SRN: i + 1,
                  serviceIds: [s.serviceId],
                  amounts: Number(s.amount),
                });
              }
            } catch (err) {
              console.error("Error saving invoice:", err.response?.data);
            }
          }

          alert(`${invoices.length} invoices saved successfully!`);
          return;
        }

        // ===================== PATCH FLOW =====================
        const sheet = workbook.worksheets[0];
        const invoices = [];

        for (let m = 1; m <= 100; m++) {
          let memberRow = null;

          for (let r = 1; r <= sheet.rowCount; r++) {
            const cell = sheet.getCell(`A${r}`);
            if (cell.value && cell.value.toString().trim() === `Member ${m}`) {
              memberRow = r;
              break;
            }
          }

          if (!memberRow) continue;

          let currentRow = memberRow + 1;
          let header_id = null;
          const headerData = {};

          if (sheet.getCell(`A${currentRow}`).value === "header_id") {
            header_id = sheet.getCell(`B${currentRow}`).value;
            currentRow++;
          }

          const headerFields = [
            "memberId",
            "invoiceDate",
            "period",
            "dueDate",
            "narration",
            "amtInWords",
          ];

          for (const field of headerFields) {
            let val = sheet.getCell(`B${currentRow}`).value;

            if (val?.formula !== undefined) {
              val = val.result ?? "";
            }

            if (["invoiceDate", "dueDate"].includes(field)) {
              headerData[field] = formatToISODate(val);
            } else {
              headerData[field] = val;
            }

            currentRow++;
          }

          if (!header_id) continue;

          const member = members.find(
            (mem) =>
              mem.memberName?.trim() ===
              headerData.memberId?.toString().trim()
          );

          if (!member) continue;

          headerData.memberId = member._id;

          currentRow += 2;

          const services = [];

          while (currentRow <= sheet.rowCount) {
            const keyCell = sheet.getCell(`A${currentRow}`);
            const valCell = sheet.getCell(`B${currentRow}`);

            if (!keyCell.value) {
              currentRow++;
              continue;
            }

            if (keyCell.value === "Total") break;

            const serviceName = keyCell.value.toString().trim();
            const amount = parseFloat(valCell.value);

            const service = serviceOption.find(
              (opt) => opt.label.trim() === serviceName
            );

            if (service && !isNaN(amount)) {
              services.push({
                serviceId: service.value,
                amount: amount,
              });
            }

            currentRow++;
          }

          invoices.push({
            header: { _id: header_id, ...headerData },
            services,
          });
        }

        for (const invoice of invoices) {
          try {
            await axios.patch(
              `${REACT_APP_URL}/InvoiceHeader/${invoice.header._id}`,
              invoice.header
            );

            for (let i = 0; i < invoice.services.length; i++) {
              const s = invoice.services[i];

              await axios.patch(
                `${REACT_APP_URL}/InvoiceDetail/${invoice.header._id}`,
                {
                  invoiceId: invoice.header._id,
                  SRN: i + 1,
                  serviceIds: [s.serviceId],
                  amounts: Number(s.amount),
                }
              );
            }
          } catch (err) {
            console.error("Patch error:", err.response?.data);
          }
        }

        alert("Headers and details updated successfully!");
      } catch (error) {
        console.error("Error processing file:", error);
        alert("Error processing file");
      }
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  const [showImportView, setShowImportView] = useState(false);

  return (
    <Box>

      <Box sx={{ display: 'flex', gap: 3 }}>

        <Button ariant="contained" sx={{ background: 'var(--complementary-color)', color: '#fff', ml: 2, fontWeight: 'bold' }} onClick={handleDrawerOpen}>Create Bill Invoice</Button>


        <Button variant="contained" sx={{ background: 'var(--complementary-color)', color: '#fff', ml: 2, fontWeight: 'bold' }} onClick={() => setShowImportView(true)} >
          Import Invoices
        </Button>
      </Box>
      <Box mt={4} m={2} >

        {showImportView ? (
          <>
            <Box display="flex" alignItems="center" gap={2} mb={3} mt={2}>
              <Input
                type="file"
                inputProps={{ accept: ".xlsx,.xls" }}
                onChange={handleFileChange}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleExcelSave}
              >
                Save
              </Button>
              <Button variant="outlined" color="primary" onClick={handleDownloadTemplate}>
                Export Template
              </Button>
            </Box>

            {previewInvoices.length > 0 && (
              <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {previewInvoices.some(inv => inv._id) && <TableCell>_id</TableCell>}
                      <TableCell>Member</TableCell>
                      <TableCell>Invoice Date</TableCell>
                      <TableCell>Period</TableCell>
                      <TableCell>Due Date</TableCell>
                      <TableCell>Narration</TableCell>
                      <TableCell>Services</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {previewInvoices.map((inv, idx) => (
                      <TableRow key={idx}>
                        {inv._id && <TableCell>{inv._id}</TableCell>}
                        <TableCell>{inv.memberId}</TableCell>
                        <TableCell>{inv.invoiceDate}</TableCell>
                        <TableCell>{inv.period}</TableCell>
                        <TableCell>{inv.dueDate}</TableCell>
                        <TableCell>{inv.narration}</TableCell>
                        <TableCell>
                          {inv.services.map((s, i) => (
                            <div key={i}>
                              {s.detail_id && <strong>detail_id:</strong>} {s.detail_id || ""} <br />
                              {s.invoiceId && <strong>invoiceId:</strong>} {s.invoiceId || ""} <br />
                              {s.serviceName} — ₹{s.amount}
                            </div>
                          ))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

          </>
        ) : (
          <>
            <Box mt={4}>
              <MaterialReactTable table={table}

                muiTableHeadCellProps={{
                  sx: { color: 'var(--primary-color)', },
                }}
              />
            </Box>
          </>
        )}
      </Box>

      {/* ///for preview///////// */}.
      <Dialog
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        fullWidth
        maxWidth={false}   // 🔥 IMPORTANT
        PaperProps={{
          sx: {
            width: "1000px",   // increase here
            // maxWidth: "1000px"
          }
        }}
      >

        <DialogContent dividers>
          {previewData && orgData && (() => {

            const memberName =
              memberOption.find(
                (m) =>
                  m.value?.toString() ===
                  previewData?.header?.memberId?.toString()
              )?.label || "Unknown";

            // ✅ SAFE TOTAL CALCULATION
            const totalAmount =
              previewData?.details?.reduce(
                (sum, item) => sum + Number(item?.amounts || 0),
                0
              ) || 0;

            return (
              <Box ref={previewRef} sx={{ border: "1px solid #000", fontSize: "14px" }}>

                {/* ===== SOCIETY HEADER ===== */}
                <Box sx={{ textAlign: "center", p: 1 }}>
                  <Typography fontWeight={700}>
                    {orgData?.SocietyName}
                  </Typography>
                  <Typography variant="body2">
                    Reg.No.: {orgData?.Registration}
                  </Typography>
                  <Typography variant="body2">
                    {orgData?.AddressLine1}
                  </Typography>
                </Box>
                <DialogTitle sx={{ textAlign: "center", fontWeight: 700 }}>
                  MAINTENANCE BILL
                </DialogTitle>
                <Divider />

                {/* ===== MEMBER & BILL INFO ===== */}
                <Box sx={{ display: "flex", borderTop: "1px solid #000" }}>
                  <Box sx={{ width: "65%", p: 1, borderRight: "1px solid #000" }}>
                    <Typography>
                      <strong>Member:</strong> {memberName}
                    </Typography>
                    <Typography>
                      {/* <strong>Flat:</strong> {previewData?.header?.flatNo || "-"} */}
                    </Typography>
                  </Box>

                  <Box sx={{ width: "35%", p: 1 }}>
                    <Typography>
                      <strong>Bill No:</strong>{" "}
                      {previewData?.header?.billinvoiceNumber || "-"}
                    </Typography>
                    <Typography>
                      <strong>Date:</strong>{" "}
                      {previewData?.header?.invoiceDate || "-"}
                    </Typography>
                    <Typography>
                      <strong>Due Date:</strong>{" "}
                      {previewData?.header?.dueDate || "-"}
                    </Typography>
                    <Typography>
                      <strong>Billing Period:</strong>{" "}
                      {previewData?.header?.period || "-"}
                    </Typography>
                  </Box>
                </Box>

                {/* ===== TABLE HEADER ===== */}
                <Box
                  sx={{
                    display: "flex",
                    bgcolor: "#a9a9a9",
                    borderTop: "1px solid #000",
                    fontWeight: 700
                  }}
                >
                  <Box sx={{ width: "10%", p: 1, borderRight: "1px solid #000" }}>
                    SR NO.
                  </Box>
                  <Box sx={{ width: "65%", p: 1, borderRight: "1px solid #000" }}>
                    PARTICULARS
                  </Box>
                  <Box sx={{ width: "25%", p: 1, textAlign: "right" }}>
                    AMOUNT
                  </Box>
                </Box>

                {/* ===== TABLE ROWS ===== */}
                {previewData?.details?.length > 0 ? (
                  previewData.details.map((row, index) => {
                    const serviceName =
                      serviceOption.find(
                        (s) =>
                          s.value?.toString() ===
                          row?.serviceIds?.toString()
                      )?.label || "Unknown";

                    return (
                      <Box
                        key={index}
                        sx={{ display: "flex", borderTop: "1px solid #000" }}
                      >
                        <Box
                          sx={{ width: "10%", p: 1, borderRight: "1px solid #000" }}
                        >
                          {index + 1}
                        </Box>
                        <Box
                          sx={{ width: "65%", p: 1, borderRight: "1px solid #000" }}
                        >
                          {serviceName}
                        </Box>
                        <Box sx={{ width: "25%", p: 1, textAlign: "right" }}>
                          {Number(row?.amounts || 0).toFixed(2)}
                        </Box>
                      </Box>
                    );
                  })
                ) : (
                  <Box sx={{ p: 1, borderTop: "1px solid #000" }}>
                    No invoice details available
                  </Box>
                )}

                {/* ===== TOTAL ===== */}
                <Box sx={{ display: "flex", borderTop: "1px solid #000" }}>
                  <Box sx={{ width: "75%", p: 1, textAlign: "right" }}>
                    <strong>Sub-Total</strong>
                  </Box>
                  <Box sx={{ width: "25%", p: 1, textAlign: "right" }}>
                    <strong>{totalAmount.toFixed(2)}</strong>

                  </Box>
                </Box>

                <Box sx={{ display: "flex", borderTop: "1px solid #000" }}>
                  <Box sx={{ width: "75%", p: 1, textAlign: "right" }}>
                    <strong>Dues / Excess (-)</strong>
                  </Box>
                  <Box sx={{ width: "25%", p: 1, textAlign: "right" }}>
                    <strong>{totalAmount.toFixed(2)}</strong>
                  </Box>
                </Box>

                {/* ===== AMOUNT IN WORDS ===== */}
                <Box sx={{ p: 1, borderTop: "1px solid #000" }}>
                  <strong>Amount in Words:</strong>{" "}
                  {previewData?.header?.amtInWords || "-"}
                </Box>

                {/* ===== TERMS ===== */}
                <Box sx={{ p: 1 }}>
                  <Typography fontWeight={700}>Terms & Conditions</Typography>
                  <Typography variant="body2">E & O.E.</Typography>
                  <Typography variant="body2" mt={1}>
                    1.Cheques to be in favour of "<b>{orgData.SocietyName} </b>"  & Cheques to be dropped in the cheque drop box.
                  </Typography>
                  <Typography variant="body2">
                    2. Mention your Flat No. and Mobile No. on the reverse of the cheque.
                  </Typography>
                  <Typography variant="body2">
                    3. Non Payment of Bill will attract interest @21 % PA.
                  </Typography>
                  <Typography variant="body2">
                    4.Errors to be intimated within 7 days to Society Office
                  </Typography>


                </Box>

                <Box sx={{ p: 1 }}>
                  <Typography fontWeight={700}>Remarks</Typography>
                  <Typography variant="body2" mt={1}>
                    Maintenance bills for <b>{previewData?.header?.period} </b>  & Cheques to be dropped in the cheque drop box.
                  </Typography>
                </Box>

                <Box sx={{ mt: 3, borderTop: "1px dashed #000", p: 2 }}>
                  <Typography sx={{ fontWeight: "bold" }}>Bank Details for {orgData.societyName}</Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                    <Typography variant="body2">Bank Name: SVC Bank Ltd.</Typography>
                    <Typography variant="body2">A/c No.: 300003000012169</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                    <Typography variant="body2">Branch & IFSC: Bandra & SVCB0000003</Typography>
                    <Typography variant="body2">Sign image</Typography>
                  </Box>
                </Box>

                {/* ===== FOOTER ===== */}
                <Box sx={{ textAlign: "right", p: 1 }}>
                  <Typography fontWeight={700}>
                    Chairman / Secretary / Manager
                  </Typography>
                </Box>
              </Box>
            );
          })()}
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            onClick={handleDownloadPDF}
            endIcon={<DownloadForOfflineIcon />}
            sx={{
              backgroundColor: "var(--secondary-color)",

              px: 2.5,
              py: 1,
              borderRadius: "6px",
            }}
          >
            Invoice
          </Button>


          <Button sx={{ borderColor: 'var(--secondary-color)', color: 'var(--secondary-color)', fontWeight: 600, }} variant="outlined" onClick={() => setOpenPreview(false)}>
            Close
          </Button>


        </DialogActions>
      </Dialog>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: {
            borderRadius: isSmallScreen ? "0" : "10px 0 0 10px",
            width: isSmallScreen ? "100%" : "50%",
            zIndex: 1000,
          },
        }}
      >

        <Box>
          <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ecfbfd' }}>

            <Typography m={2} fontWeight="bold" variant="h6" color='var(--primary-color)'>
              {isEditing ? "Update Invoice" : "Create Invoice"}
            </Typography>
            <CloseIcon sx={{ cursor: 'pointer' }} onClick={handleDrawerClose} />
          </Box>
          <Divider />

          <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box m={2}>
                <Typography>DR Member Name</Typography>

                <Autocomplete
                  options={memberOption}
                  getOptionLabel={(option) => option.label || ""}
                  value={
                    memberOption.find(
                      (opt) => opt.value === selectedMemberOption
                    ) || null
                  }
                  onChange={(event, newValue) => {
                    setSelectedMemberOption(newValue ? newValue.value : "");
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      size="small"
                      sx={{
                        mt: 1,
                        '& .MuiInput-underline:after': {
                          borderBottomWidth: 1.5,
                          borderBottomColor: '#144145',
                        },
                      }}
                    />
                  )}
                />
              </Box>

              <Box display={'flex'} alignItems={'center'} m={2} justifyContent={'space-between'}>
                <Box>
                  <Typography>Bill Number</Typography>
                  <TextField
                    variant="standard"
                    sx={{
                      '& .MuiInput-underline:after': {
                        borderBottomWidth: 1.5,
                        borderBottomColor: '#144145',
                      },
                    }}
                    focused
                    InputProps={{
                      readOnly: true,
                    }}

                    value={billNum}
                    onChange={(e) => setBillNum(e.target.value)}
                    type="number"
                    size="small" placeholder="BillNo is Auto-generated" fullWidth />
                </Box>

                <Box>
                  <Typography>Bill Date</Typography>
                  <DatePicker
                    value={billDate ? new Date(billDate) : null}
                    format="dd-MM-yyyy"
                    onChange={(newValue) => setBillDate(newValue)}
                    slotProps={{
                      textField: { size: "small", fullWidth: true, },
                    }}
                  />
                </Box>

              </Box>

              <Box display={'flex'} alignItems={'center'} m={2} justifyContent={'space-between'}>
                <Box>
                  <Typography>Period</Typography>
                  <TextField
                    variant="standard"
                    sx={{
                      '& .MuiInput-underline:after': {
                        borderBottomWidth: 1.5,
                        borderBottomColor: '#144145',
                      },
                    }}
                    focused

                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}

                    size="small" placeholder="Period" fullWidth />
                </Box>

                <Box>
                  <Typography>Due Date</Typography>
                  <DatePicker
                    value={dueDate ? new Date(dueDate) : null}
                    format="dd-MM-yyyy"
                    onChange={(newValue) => setDueDate(newValue)}
                    slotProps={{
                      textField: { size: "small", fullWidth: true, },
                    }}
                  />
                </Box>

              </Box>
              {/* detail table */}
              <Box m={2}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Sr No</TableCell>
                        <TableCell>Particulars</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {rows.map((row, index) => (
                        <TableRow key={index}>
                          {/* Sr No */}
                          <TableCell>{index + 1}</TableCell>

                          {/* Service */}
                          <TableCell>
                            <Autocomplete
                              options={serviceOption}
                              getOptionLabel={(option) => option.label || ""}
                              value={
                                serviceOption.find(
                                  (opt) => opt.value === row.serviceIds
                                ) || null
                              }
                              onChange={(e, newValue) =>
                                handleRowChange(
                                  index,
                                  "serviceIds",
                                  newValue ? newValue.value : null
                                )
                              }
                              renderInput={(params) => (
                                <TextField {...params} variant="standard" />
                              )}
                            />
                          </TableCell>

                          {/* Amount */}
                          <TableCell>
                            <TextField
                              variant="standard"
                              type="number"
                              value={row.amounts}
                              onChange={(e) =>
                                handleRowChange(index, "amounts", e.target.value)
                              }
                              placeholder="Amount"
                              fullWidth
                            />
                          </TableCell>



                          {/* Actions */}
                          <TableCell align="center">
                            <Box display="flex" justifyContent="center" gap={1}>
                              <Button
                                sx={{ backgroundColor: "var(--primary-color)", color: "white" }}
                                onClick={handleAddRow}>
                                <AddIcon />
                              </Button>
                              <Button
                                sx={{ backgroundColor: "red", color: "white" }}
                                onClick={() => handleDeleteRow(index)}>
                                <DeleteIcon />
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>

                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={2} align="right" sx={{ color: 'black', fontSize: 15 }}>
                          <b>Sub Total </b>
                        </TableCell>
                        <TableCell sx={{ color: 'black', fontSize: 15 }}>
                          <b>₹ {subTotal.toFixed(2)} </b>
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    </TableFooter>


                  </Table>
                </TableContainer>
              </Box>

              {/* <Box m={2}>
                <Typography>Amount in Words</Typography>
                <TextField
                  variant="standard"
                  sx={{
                    '& .MuiInput-underline:after': {
                      borderBottomWidth: 1.5,
                      borderBottomColor: '#144145',
                    },
                  }}
                  focused


                  value={amtInWords}
                  onChange={(e) => setAmtInWords(e.target.value)}

                  size="small" fullWidth />
              </Box> */}

              <Box m={2}>
                <Typography>Amount in Words</Typography>
                <TextField
                  variant="standard"
                  value={amtInWords || ""}
                  fullWidth
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{
                    '& .MuiInput-underline:after': {
                      borderBottomWidth: 1.5,
                      borderBottomColor: "#144145",
                    },
                  }}
                />
              </Box>


              <Box m={2}>
                <Typography>Narration</Typography>

                <TextareaAutosize
                  minRows={2}
                  value={narration}
                  onChange={(e) => setNarration(e.target.value)}
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: "1.5px solid #144145",
                    outline: "none",
                    padding: "8px 0",
                    fontFamily: "inherit",
                  }}
                />
              </Box>

            </LocalizationProvider>

          </Box>



          <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2} mt={5} mb={5}>
            <Box>
              <Button
                sx={{ background: 'var(--secondary-color)', color: '#ffffff', fontWeight: 'bold' }}
                onClick={handleSubmit}
                variant="contained"
              >
                {isEditing ? "Update" : "Save"}
              </Button>
            </Box>

            <Box>
              <Button
                sx={{ borderColor: 'var(--secondary-color)', color: 'var(--secondary-color)' }}
                onClick={handleDrawerClose} variant='outlined'><b>Cancel</b> </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  )
}

export default BillInvoice
