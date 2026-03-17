
import { useState, useEffect, useMemo, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Autocomplete, useMediaQuery, Box, Button, Typography, TextField, Drawer, Divider, Table, TableBody, TableCell, TableHead, TableRow,  } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from "moment";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import "react-toastify/dist/ReactToastify.css";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import axios from 'axios';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

const Journalvouchers = () => {
  const REACT_APP_URL = process.env.REACT_APP_URL
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true); setIsEditing(false);
    resetForm()
  };

  const handleDrawerClose = () => {
    setJVId('')
    setIsDrawerOpen(false);
    resetForm()
  };


  const [narration, setNarration] = useState(null);
  const [crAmount, setCrAmount] = useState('');
  const [drAmount, setDrAmount] = useState('');
  const [JvId, setJVId] = useState('');

  //Fetch Dr ledger
  const [debitLedOption, setDebitLedOption] = useState([]);
  const [selectedDebitLedOption, setSelectedDebitLedOption] = useState(null);
  // const [date, setDate] = useState(null);
  const [date, setDate] = useState(new Date());

  const fetchDebitLedger = async () => {
    try {
      const response = await fetch(
        `${REACT_APP_URL}/Account`
      );
      const result = await response.json();

      console.log("ledger info:", result);


      const options = result.map((acc) => ({
        value: acc._id,
        label: acc.accountName
      }));

      setDebitLedOption(options);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const [crLedOption, setCrLedOption] = useState([]);
  const [selectedCrLedOption, setSelectedCrLedOption] = useState('');


  const fetchCrLedger = async () => {
    try {
      const response = await fetch(
        `${REACT_APP_URL}/Account`
      );
      const result = await response.json();

      // console.log("Branch info:", result);

      const options = result.map((cracc) => ({
        value: cracc._id,
        label: cracc.accountName
      }));

      setCrLedOption(options);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };


  //create annd update  Invoice 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedDate = moment(date).format("YYYY-MM-DD");

      const JournalVoucherData = {
        date: formattedDate,
        debitLedger: selectedDebitLedOption?._id || selectedDebitLedOption,
        creditLedger: selectedCrLedOption?._id || selectedCrLedOption,
        debitAmount: Number(drAmount),
        creditAmount: Number(crAmount),
        narration: narration || "",
      };

      if (JvId) {
        await axios.put(
          `${REACT_APP_URL}/JournalVoucher/${JvId}`,
          JournalVoucherData
        );

        toast.success("Journal Voucher updated successfully!");
      } else {
        await axios.post(
          `${REACT_APP_URL}/JournalVoucher`,
          JournalVoucherData
        );

        toast.success("Journal Voucher created successfully!");
      }

      setIsDrawerOpen(false);
      resetForm();
      getJV();

    } catch (error) {
      console.error("Error saving Journal Voucher:", error);
      toast.error("Something went wrong while saving Journal Voucher");
    }
  };


  const resetForm = () => {
    setDate('')
    setSelectedDebitLedOption('')
    setSelectedCrLedOption('')
    setDrAmount('')
    setCrAmount('')
    setNarration('')
  }


  //get header
  const [JVData, setJVData] = useState([]);

  const getJV = () => {
    const url = `${REACT_APP_URL}/JournalVoucher`;
    console.log(" URL:", url);
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then(data => {
        console.log('data', data);
        setJVData(data);

      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchDebitLedger();
    fetchCrLedger()
    getJV();
    fetchOrgData()

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
        accessorKey: 'date',
        header: 'Date',
        size: 150,
        Cell: ({ cell }) => <span>{moment(cell.getValue()).format('DD-MM-YYYY')}</span>,
      },

      {
        accessorKey: 'debitLedger.accountName',
        header: 'debitLedger',
        size: 150,

      },


      {
        accessorKey: 'debitAmount',
        header: 'Debit Amount',
        size: 150,
      },

      {
        accessorKey: 'creditLedger.accountName',
        header: 'creditLedger',
        size: 150,

      },

      {
        accessorKey: 'creditAmount',
        header: 'Credit Amount',
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
    data: JVData,
    enablePagination: true,
    muiTableHeadCellProps: {
      style: {
        backgroundColor: "#ecfbfd",
        color: "black",
        fontSize: "16px",
      },
    },


  });

  const handleEdit = async (rowData) => {
    console.log("This row has been clicked:", rowData);

    setIsEditing(true);
    setJVId(rowData._id);
    setDate(rowData.date);
    setSelectedDebitLedOption(rowData.debitLedger._id);
    setSelectedCrLedOption(rowData.creditLedger._id);
    setDrAmount(rowData.debitAmount)
    setCrAmount(rowData.creditAmount)
    setNarration(rowData.narration)
    setIsDrawerOpen(true);
  };

  const [openPreview, setOpenPreview] = useState(false);
  const handlePreview = async (rowData) => {
    setPreviewData(rowData);
    setOpenPreview(true);
    console.log("PREVIEW DATA:", rowData);
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
    const margin = 10;

    const imgWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);

    const JVNo = previewData?.JournalVoucherNumber || "NA";

    pdf.save(`JV_${JVNo}.pdf`);
  };

  const totalDebit = previewData?.debitAmount || 0;
  const totalCredit = previewData?.creditAmount || 0;

  //for org data 
  const [orgData, setOrgData] = useState(null);
  const fetchOrgData = async () => {
    try {
      const response = await fetch(`${REACT_APP_URL}/Organisation/`);

      if (!response.ok) {
        throw new Error("Failed to fetch organization data");
      }

      const data = await response.json();
      console.log(data);
      setOrgData(data[0]);
    } catch (err) {
      console.error(err.message);
    }
  };

  //delete JV
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDeleteTemp = () => {
    const url = `${REACT_APP_URL}/JournalVoucher/${JvId}`;

    fetch(url, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        //console.log('data',data)
        toast.success(`deleted successfully!`);
        getJV();
        handleDrawerClose();
        resetForm();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to delete template");
      });
  };

  const handleConfirmDelete = () => {
    handleDeleteTemp();
    setOpenDeleteDialog(false);
  };


  return (
    <Box>
      <Box>
        <Button ariant="contained" sx={{ background: 'var(--complementary-color)', color: '#fff', ml: 2 }} onClick={handleDrawerOpen}><b>Create Journal Vouchers</b></Button>
      </Box>

      <Box mt={4} m={2} >
        <MaterialReactTable
          table={table}

          muiTableHeadCellProps={{
            sx: { color: 'var(--primary-color)', },
          }}
        />
      </Box>

      {/* ///for preview///////// */}.
      <Dialog
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        fullWidth
        maxWidth={false}
        PaperProps={{
          sx: {
            width: "1000px",

          }
        }}
      >

        <DialogContent >
          {previewData && (
            <>
              <Box
                ref={previewRef}
                sx={{ textAlign: "center", p: 1, border: "1px solid black", }}>
                <Typography fontWeight={700}>
                  {orgData?.SocietyName}
                </Typography>
                <Typography variant="body2">
                  Reg.No.: {orgData?.Registration}
                </Typography>
                <Typography variant="body2">
                  {orgData?.AddressLine1}
                </Typography>


                <DialogTitle sx={{ textAlign: "center", fontWeight: 700, borderBottom: "1px solid black", }}>
                 Journal Voucher
                </DialogTitle>


                <Box
                  sx={{
                    // width: 500,
                    // border: "1px solid black",
                    p: 2,
                    fontFamily: "serif",
                    background: "#fff"
                  }}
                >


                  {/* Voucher info */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1, }}>
                    <Typography>
                      <b> Voucher No : {previewData?.JournalVoucherNumber}</b>
                    </Typography>

                    <Typography>
                      <b> Date : {previewData?.date}</b>
                    </Typography>
                  </Box>



                  <Table size="small" sx={{ border: "1px solid black" }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Particulars</TableCell>
                        <TableCell align="right">Debit (Rs)</TableCell>
                        <TableCell align="right">Credit (Rs)</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      <TableRow>
                        <TableCell>
                          {previewData?.debitLedger?.accountName}
                        </TableCell>

                        <TableCell align="right">
                          {previewData?.debitAmount}
                        </TableCell>

                        <TableCell align="right">-</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          {previewData?.creditLedger?.accountName}
                        </TableCell>

                        <TableCell align="right">-</TableCell>

                        <TableCell align="right">
                          {previewData?.creditAmount}
                        </TableCell>
                      </TableRow>

                      {/* Total Row */}
                      <TableRow>
                        <TableCell>
                          <b>Total</b>
                        </TableCell>

                        <TableCell align="right">
                          <b>{totalDebit}</b>
                        </TableCell>

                        <TableCell align="right">
                          <b>{totalCredit}</b>
                        </TableCell>
                      </TableRow>

                    </TableBody>
                  </Table>


                  <Box sx={{ mt: 2 }}>
                    <Typography>
                      <b>Narration :</b> {previewData?.narration}
                    </Typography>
                  </Box>

                </Box>
              </Box>
            </>
          )}
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
            <b>JOURNAL VOUCHER </b>
          </Button>


          <Button sx={{ borderColor: 'var(--secondary-color)', color: 'var(--secondary-color)', fontWeight: 600, }} variant="outlined" onClick={() => setOpenPreview(false)}>
            <b>Close </b>
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

            <Typography m={2} fontWeight="bold" variant="h6"  color='var(--primary-color)'>
              {isEditing ? "Update Journal Vouchers" : "Create Journal Vouchers"}
            </Typography>
            <CloseIcon sx={{ cursor: 'pointer' }} onClick={handleDrawerClose} />
          </Box>
          <Divider />

          <Box m={2} >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box >
                <DatePicker
                  label="Date"
                  value={date ? new Date(date) : null}
                  onChange={(newValue) => setDate(newValue)}
                  format="dd/MM/yyyy"
                  slotProps={{
                    textField: { size: "small", },
                  }}
                />
              </Box>

              <Box mt={1}>
                <Typography>Debit Accounts</Typography>
                <Autocomplete
                  options={debitLedOption}
                  getOptionLabel={(option) => option.label || ""}
                  value={
                    debitLedOption.find(
                      (opt) => opt.value === selectedDebitLedOption
                    ) || null
                  }
                  onChange={(event, newValue) => {
                    setSelectedDebitLedOption(newValue ? newValue.value : "");
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      size="small"
                      sx={{

                        '& .MuiInput-underline:after': {
                          borderBottomWidth: 1.5,
                          borderBottomColor: '#144145',
                        },
                      }}
                      focused
                    />
                  )}
                />
              </Box>

              <Box mt={1}>
                <Typography>Credit Accounts</Typography>
                <Autocomplete
                  options={crLedOption}
                  getOptionLabel={(option) => option.label || ""}
                  value={
                    crLedOption.find(
                      (opt) => opt.value === selectedCrLedOption
                    ) || null
                  }
                  onChange={(event, newValue) => {
                    setSelectedCrLedOption(newValue ? newValue.value : "");
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      size="small"
                      sx={{

                        '& .MuiInput-underline:after': {
                          borderBottomWidth: 1.5,
                          borderBottomColor: '#144145',
                        },
                      }}
                      focused
                    />
                  )}
                />
              </Box>

              <Box mt={3}>
                <Typography>
                  Dr Amount
                </Typography>

                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  value={drAmount}
                  onChange={(e) => setDrAmount(e.target.value)}
                  sx={{
                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#144145',
                      borderBottomWidth: 1.5,
                    },
                  }}
                  focused
                />
              </Box>

              <Box mt={3}>
                <Typography>
                  Cr Amount
                </Typography>

                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  value={crAmount}
                  onChange={(e) => setCrAmount(e.target.value)}
                  sx={{
                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#144145',
                      borderBottomWidth: 1.5,
                    },
                  }}
                  focused
                />
              </Box>

              <Box mt={3}>
                <Typography>Narration</Typography>

                <TextareaAutosize
                  minRows={1}
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

              <Dialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
              >
                <DialogTitle><b>Confirm Delete </b></DialogTitle>

                <DialogContent>
                  Are you sure you want to delete this Voucher?
                </DialogContent>

                <DialogActions>
                  <Button
                    sx={{ background: '#185259', color: '#ffffff' }}
                    onClick={() => setOpenDeleteDialog(false)}
                    variant="contained"
                  >
                    No
                  </Button>

                  <Button sx={{ borderColor: '#185259' }}

                    variant="outlined"
                    onClick={handleConfirmDelete}
                  >
                    <DeleteIcon color="error" />
                  </Button>
                </DialogActions>
              </Dialog>

            </LocalizationProvider>

          </Box>



          <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2} mt={5} mb={5}>
            <Box>
              <Button
                sx={{ background: 'var(--secondary-color)', color: '#ffffff',fontWeight:'bold' }}
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

            <Box>
              {isEditing && (
                <Button color="error" variant="contained"
                  onClick={() => setOpenDeleteDialog(true)}
                >
                  Delete
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  )
}

export default Journalvouchers
