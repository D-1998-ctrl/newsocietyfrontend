
import { useState, useEffect, useMemo, } from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio, Autocomplete, useMediaQuery, Box, Button, Typography, TextField, Drawer, Divider, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
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
import axios from 'axios';

const Member = () => {
  const REACT_APP_URL = process.env.REACT_APP_URL
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [memberName, setMemberName] = useState('')
  const [floor, setFloor] = useState("");
  const [unitNo, setUnitNo] = useState("");
  const [unitType, setUnitType] = useState("");
  const [parkingDetail, setParkingDetail] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [pan, setPAN] = useState("");
  const [dateofAdmission, setDateofAdmission] = useState(null);
  const [dateofEntrance, setDateofEntrance] = useState(null);
  const [occupation, setOccupation] = useState("");
  const [age, setAge] = useState("");
  const [nameofNominee, setNameofNominee] = useState("");
  const [dateofNomination, setDateofNomination] = useState(null);
  const [dateofCessation, setDateofCessatione] = useState(null);
  const [resonOfCessation, setResonOfCessation] = useState("");
  const [remark, setremark] = useState("");
  const [typeOfArea, setTypeOfArea] = useState("");

  //fetch ledgers
  const [ledgerOption, setLedgerOption] = useState([]);
  const [selectedLedgerOption, setSelectedLedgerOption] = useState('');

  const fetchLedgers = async () => {
    try {
      const response = await fetch(
        `${REACT_APP_URL}/Account`
      );
      const result = await response.json();

      // console.log("ledger info:", result);

      const options = result.map((acc) => ({
        value: acc._id,
        label: acc.accountName
      }));

      setLedgerOption(options);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  //fetch wing
  const [wingOptions, setWingOptions] = useState([]);
  const [selectedWing, setSelectedWing] = useState(null);
  const fetchWings = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_URL}/wings/`,
      );
      // console.log(response.data);
      processWingData(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  const processWingData = (data) => {
    if (Array.isArray(data)) {

      const wingOptions = data.map((wing) => ({
        value: wing?._id || "",
        label: wing?.name,
        numberOfFloors: wing?.numberOfFloors,
        totalUnits: wing?.totalUnits,
        //  unitTypes:wing.unitTypes
        unitTypes: wing.unitTypes?.map((u) => u.propertyType)
      }));

      // console.log('options', wingOptions)
      setWingOptions(wingOptions);
    }
  };

  //fetch chargesTemp
  const [chargesTempOption, setChargesTempOption] = useState([]);
  const [selectedChargesTempOption, setSelectedChargesTempOption] = useState('');

  const fetchChargesTemp = async () => {
    try {
      const response = await fetch(`${REACT_APP_URL}/service`);
      const result = await response.json();

      // console.log("service info:", result);

      if (result?.data && Array.isArray(result.data)) {
        const options = result.data.map((service) => ({
          value: service._id,
          label: service.name,
        }));

        setChargesTempOption(options);
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  //fetch supplementary charges temp
  const [supplementaryChargesTempOption, setSupplementaryChargesTempOption] = useState([]);
  const [selectedSupplementaryChargesTempOption, setSelectedSupplementaryChargesTempOption] = useState('');

  const fetchSupplementaryChargesTemp = async () => {
    try {
      const response = await fetch(`${REACT_APP_URL}/service`);
      const result = await response.json();

      // console.log("service info:", result);

      if (result?.data && Array.isArray(result.data)) {
        const options = result.data.map((service) => ({
          value: service._id,
          label: service.name,
        }));

        setSupplementaryChargesTempOption(options);
      }

    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  useEffect(() => {
    fetchMemberData()
    fetchLedgers()
    fetchWings()
    fetchChargesTemp()
    fetchSupplementaryChargesTemp()
  }, []);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true); setIsEditing(false);
    resetForm()
  };

  const handleDrawerClose = () => {
    setMemberId('')
    setIsDrawerOpen(false);
    resetForm()
  };

  //get member
  const [memberData, setMemberData] = useState([]);
  const fetchMemberData = async () => {
    try {
      const response = await fetch(`${REACT_APP_URL}/Member/`);

      if (!response.ok) {
        throw new Error("Failed to fetch organization data");
      }

      const data = await response.json();
      // console.log(data);
      setMemberData(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const [memberId, setMemberId] = useState('');

  const handleEdit = async (rowData) => {
    // console.log("This row has been clicked:", rowData);
    setIsEditing(true);
    setMemberId(rowData._id);
    setMemberName(rowData.memberName)
    setSelectedLedgerOption(rowData.ledger)
    setSelectedWing(rowData.wingName)
    setFloor(rowData.floor)
    setUnitNo(rowData.unitNum)
    setUnitType(rowData.unitType)
    setTypeOfArea(rowData.typeOfArea)
    setSelectedChargesTempOption(rowData.chargesTemp)
    setSelectedSupplementaryChargesTempOption(rowData.supllimentarychargesTemp)
    setParkingDetail(rowData.parkingDetail)
    setContactPerson(rowData.contactNum)
    setPhoneNum(rowData.mobileNum)
    setEmail(rowData.email)
    setPAN(rowData.pannumber)
    setDateofAdmission(rowData.dateOfAdmission)
    setDateofEntrance(rowData.dateOfEntranceFeePayment)
    setOccupation(rowData.occupation)
    setAge(rowData.age)
    setNameofNominee(rowData.NameOfNominee)
    setDateofNomination(rowData.DateOfNomination)
    setDateofCessatione(rowData.DateCessationMembership)
    //
    setResonOfCessation(rowData.ReasonOfCessation)
    setremark(rowData.Remark)
    setIsDrawerOpen(true);
  };

  const columns = useMemo(() => {
    return [
      {
        accessorKey: 'srNo',
        header: 'Sr No',
        size: 100,
        Cell: ({ row }) => row.index + 1,
      },

      {
        accessorKey: 'memberName',
        header: 'Member Name',
        size: 150,

      },

      {
        accessorKey: 'floor',
        header: 'floor',
        size: 150,

      },


      {
        accessorKey: 'unitNum',
        header: 'unitNum',
        size: 150,

      },


      // {
      //   accessorKey: 'unitType',
      //   header: 'unitType',
      //   size: 150,

      // },


      // {
      //   accessorKey: 'typeOfArea',
      //   header: 'typeOfArea',
      //   size: 150,

      // },


      {
        accessorKey: 'mobileNum',
        header: 'Mobile Num',
        size: 150,

      },

      // {
      //   accessorKey: 'email',
      //   header: 'email',
      //   size: 150,

      // },


      // {
      //   accessorKey: 'pannumber',
      //   header: 'pannumber',
      //   size: 150,

      // },

      {
        accessorKey: 'dateOfAdmission',
        header: 'Admission Date',
        size: 150,
        Cell: ({ cell }) => <span>{moment(cell.getValue()).format('DD-MM-YYYY')}</span>,
      },

      {
        accessorKey: 'dateOfEntranceFeePayment',
        header: 'EntranceFeePaymentDate',
        size: 150,
        Cell: ({ cell }) => <span>{moment(cell.getValue()).format('DD-MM-YYYY')}</span>,
      },

      {
        accessorKey: 'DateOfNomination',
        header: 'Nomination Date',
        size: 150,
        Cell: ({ cell }) => <span>{moment(cell.getValue()).format('DD-MM-YYYY')}</span>,
      },

      {
        accessorKey: 'DateCessationMembership',
        header: 'CessationMembershipDate',
        size: 150,
        Cell: ({ cell }) => <span>{moment(cell.getValue()).format('DD-MM-YYYY')}</span>,
      },

      {
        accessorKey: 'NameOfNominee',
        header: 'NameOfNominee',
        size: 150,
      },

      // {
      //   header: 'Actions',
      //   size: 200,
      //   Cell: ({ row }) => (
      //     <Box display="flex" gap={1}>
      //       <Button
      //         variant="contained"
      //         size="small"
      //         sx={{ background: '#10370d' }}
      //         onClick={() => handleEdit(row.original)}
      //       >
      //         Edit
      //       </Button>

      //     </Box>
      //   ),
      // },

    ];
  }, []);

  const table = useMaterialReactTable({
    columns,
    data: memberData,
    enablePagination: true,

    muiTableHeadCellProps: {
      style: {
        backgroundColor: "#ecfbfd",
        color: "black",
        fontSize: "16px",
      },
    },

    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => handleEdit(row.original),
      sx: {
        cursor: 'pointer',
      },
    }),
  });


  //create and update member
  const handleSubmit = async () => {
    try {
      const url = isEditing
        ? `${REACT_APP_URL}/Member/${memberId}`
        : `${REACT_APP_URL}/Member`;

      const method = isEditing ? "PUT" : "POST";

      const formattedAdmissiondate = moment(dateofAdmission).format("YYYY-MM-DD");
      const formattedEntranceDate = moment(dateofEntrance).format("YYYY-MM-DD");
      const formattedNominationDate = moment(dateofNomination).format("YYYY-MM-DD");
      const formattedCessationDate = moment(dateofCessation).format("YYYY-MM-DD");

      const memberData = {
        memberName,
        ledger: selectedLedgerOption,
        wingName: selectedWing,
        floor: floor,
        unitNum: unitNo,
        unitType: unitType,
        typeOfArea: typeOfArea,
        chargesTemp: selectedChargesTempOption,
        supllimentarychargesTemp: selectedSupplementaryChargesTempOption,
        parkingDetail: parkingDetail,
        contactNum: contactPerson,
        mobileNum: phoneNum,
        email: email,
        pannumber: pan,
        dateOfAdmission: formattedAdmissiondate,
        dateOfEntranceFeePayment: formattedEntranceDate,
        occupation: occupation,
        age: age,
        NameOfNominee: nameofNominee,
        DateOfNomination: formattedNominationDate,
        DateCessationMembership: formattedCessationDate,
        ReasonOfCessation: resonOfCessation,
        Remark: remark
      };

      const memberResponse = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(memberData)
      });

      const memberResult = await memberResponse.json();
      // console.log("Member saved:", memberResult);
      if (!memberResponse.ok) {
        throw new Error(memberResult.message || "Member save failed");
      }

      toast.success(
        isEditing
          ? "Member updated successfully"
          : "Member created successfully"
      );


      // ✅ Create Account 
      if (!isEditing) {
        const accountData = {
          accountName: memberName,
          groupId: "6823344468b28ef8a9e208a4",
          subGroupId: "68242915e1aa0736e9ed99bb",
          opening: 0,
          drOrCr: "DR",
          typeCode: "Balance Sheet"
        };

        const accountResponse = await fetch(`${REACT_APP_URL}/Account`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(accountData)
        });

        const accountResult = await accountResponse.json();

        if (!accountResponse.ok) {
          throw new Error(accountResult.message || "Account creation failed");
        }

        toast.success("Account created successfully");
      }


      handleDrawerClose();
      fetchMemberData();
      resetForm()
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }
  };

  const resetForm = () => {
    setMemberName('')
    setSelectedLedgerOption('')
    setSelectedWing('')
    setFloor('')
    setUnitNo('')
    setUnitType('')
    setTypeOfArea('')
    setSelectedChargesTempOption('')
    setSelectedSupplementaryChargesTempOption('')
    setParkingDetail('')
    setContactPerson('')
    setPhoneNum('')
    setEmail('')
    setPAN('')
    setDateofAdmission('')
    setDateofEntrance('')
    setOccupation('')
    setAge('')
    setNameofNominee('')
    setDateofNomination('')
    setDateofCessatione('')
    setResonOfCessation('')
    setremark('')
  }


  //delete member
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDeleteTemp = () => {
    const url = `${REACT_APP_URL}/Member/${memberId}`;

    fetch(url, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        //console.log('data',data)
        toast.success(`${memberName} deleted successfully!`);
        fetchMemberData();
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
    <Box mt={2}>

      <Box textAlign={'center'}>
        <Typography
          sx={{ color: 'var(--primary-color)' }}
          variant="h4"
        >
          <b>Members</b>
        </Typography>
      </Box>
      <Box >
        <Button ariant="contained" sx={{ background: 'var(--complementary-color)', color: '#fff', ml: 2 }} onClick={handleDrawerOpen}> <b>Create Members</b></Button>
      </Box>


      <Box mt={4} m={2} >
        <MaterialReactTable table={table}

          muiTableHeadCellProps={{
            sx: { color: 'var(--primary-color)', },
          }}
        />
      </Box>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: {
            borderRadius: isSmallScreen ? "0" : "10px 0 0 10px",
            width: isSmallScreen ? "100%" : "60%",
            zIndex: 1000,
          },
        }}
      >

        <Box>
          <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ecfbfd' }}>
            <Typography m={2} color='var(--primary-color)' fontWeight="bold" variant="h6">
              {isEditing ? "Update Members" : "Create Members"}
            </Typography>
            <CloseIcon sx={{ cursor: 'pointer' }} onClick={handleDrawerClose} />
          </Box>
          <Divider />

          <Box m={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box mt={1}>
                <Typography>
                  Member Name
                </Typography>

                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  sx={{
                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#144145',
                      borderBottomWidth: 1.5,
                    },
                  }}
                  focused
                />
              </Box>

              <Box mt={1}>
                <Typography>Ledger</Typography>
                <Autocomplete
                  options={ledgerOption}
                  getOptionLabel={(option) => option.label || ""}
                  value={
                    ledgerOption.find(
                      (opt) => opt.value === selectedLedgerOption
                    ) || null
                  }
                  onChange={(event, newValue) => {
                    setSelectedLedgerOption(newValue ? newValue.value : "");
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
                <Typography>Wing Nane</Typography>
                <FormControl fullWidth size="small" >
                  <Autocomplete
                    fullWidth
                    size="small"
                    options={wingOptions}
                    value={wingOptions.find(option => option.value === selectedWing) || null}
                    getOptionLabel={(option) => option.label}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setSelectedWing(newValue.value);
                        setFloor(newValue.numberOfFloors);
                        setUnitNo(newValue.totalUnits)
                        // setUnitType(newValue.unitTypes)
                        setUnitType(newValue.unitTypes?.[0] || "");


                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}

                        variant="standard"
                        sx={{
                          '& .MuiInput-underline:after': {
                            borderBottomColor: '#144145',
                            borderBottomWidth: 1.5,
                          },
                        }}
                        focused
                      />
                    )}
                  />

                </FormControl>

              </Box>

              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} gap={5} mt={2}>


                <Box>
                  <Typography>
                    Floor
                  </Typography>

                  <TextField
                    fullWidth
                    variant="standard"
                    size="small"
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                    sx={{
                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#144145',
                        borderBottomWidth: 1.5,
                      },
                    }}
                    focused
                  />
                </Box>

                <Box >
                  <Typography>
                    Unit No
                  </Typography>

                  <TextField
                    fullWidth
                    variant="standard"
                    size="small"
                    value={unitNo}
                    onChange={(e) => setUnitNo(e.target.value)}

                    sx={{
                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#144145',
                        borderBottomWidth: 1.5,
                      },
                    }}
                    focused
                  />
                </Box>

                <Box >
                  <Typography>
                    Unit Type
                  </Typography>

                  <TextField
                    fullWidth
                    variant="standard"
                    size="small"
                    value={unitType}
                    onChange={(e) => setUnitType(e.target.value)}
                    sx={{
                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#144145',
                        borderBottomWidth: 1.5,
                      },
                    }}
                    focused
                  />
                </Box>
              </Box>

              <Box mt={2}>
                <Typography> Type Of Area </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  <RadioGroup row value={typeOfArea}
                    onChange={(e) => setTypeOfArea(e.target.value)}>
                    <FormControlLabel value="Carpet" control={<Radio />} label="Carpet" />
                    <FormControlLabel value="Built-up" control={<Radio />} label="Built-up" />
                  </RadioGroup>
                </Box>
              </Box>

              <Box mt={1}>
                <Typography>Charges Template</Typography>
                <Autocomplete
                  options={chargesTempOption}
                  getOptionLabel={(option) => option.label || ""}
                  value={
                    chargesTempOption.find(
                      (opt) => opt.value === selectedChargesTempOption
                    ) || null
                  }
                  onChange={(event, newValue) => {
                    setSelectedChargesTempOption(newValue ? newValue.value : "");
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
                <Typography>Supplementary Charges Template</Typography>
                <Autocomplete
                  options={supplementaryChargesTempOption}
                  getOptionLabel={(option) => option.label || ""}
                  value={
                    supplementaryChargesTempOption.find(
                      (opt) => opt.value === selectedSupplementaryChargesTempOption
                    ) || null
                  }
                  onChange={(event, newValue) => {
                    setSelectedSupplementaryChargesTempOption(newValue ? newValue.value : "");
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
                <Typography>
                  Parking Details
                </Typography>

                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  value={parkingDetail}
                  onChange={(e) => setParkingDetail(e.target.value)}
                  sx={{
                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#144145',
                      borderBottomWidth: 1.5,
                    },
                  }}
                  focused
                />
              </Box>

              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
                <Box>
                  <Typography>
                    Contact Person
                  </Typography>

                  <TextField

                    variant="standard"
                    size="small"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    sx={{
                      width: "300px",
                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#144145',
                        borderBottomWidth: 1.5,
                      },
                    }}
                    focused
                  />
                </Box>

                <Box >
                  <Typography>
                    Phone No.
                  </Typography>

                  <TextField

                    variant="standard"
                    size="small"
                    value={phoneNum}
                    onChange={(e) => setPhoneNum(e.target.value)}
                    sx={{
                      width: "260px",
                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#144145',
                        borderBottomWidth: 1.5,
                      },
                    }}
                    focused
                  />
                </Box>
              </Box>


              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
                <Box mt={1}>
                  <Typography>
                    Email

                  </Typography>

                  <TextField

                    variant="standard"
                    size="small"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      width: '300px',
                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#144145',
                        borderBottomWidth: 1.5,
                      },
                    }}
                    focused
                  />
                </Box>

                <Box mt={1}>
                  <Typography>
                    PAN
                  </Typography>

                  <TextField
                    variant="standard"
                    size="small"
                    value={pan}
                    onChange={(e) => setPAN(e.target.value)}
                    sx={{
                      width: '260px',
                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#144145',
                        borderBottomWidth: 1.5,
                      },
                    }}
                    focused
                  />
                </Box>
              </Box>


              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
                <Box>
                  <Typography>Date of Admission</Typography>
                  <DatePicker
                    value={dateofAdmission ? new Date(dateofAdmission) : null}
                    format="dd-MM-yyyy"
                    onChange={(newValue) => setDateofAdmission(newValue)}
                    slotProps={{
                      textField: { size: "small", fullWidth: true, },
                    }}
                  />
                </Box>

                <Box>
                  <Typography>Date of Entrance Fee Payment</Typography>
                  <DatePicker
                    value={dateofEntrance ? new Date(dateofEntrance) : null}
                    format="dd-MM-yyyy"
                    onChange={(newValue) => setDateofEntrance(newValue)}
                    slotProps={{
                      textField: { size: "small", fullWidth: true, },
                    }}
                  />
                </Box>
              </Box>


              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
                <Box mt={1}>
                  <Typography>
                    Occupation
                  </Typography>

                  <TextField

                    variant="standard"
                    size="small"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    sx={{
                      width: '280px',
                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#144145',
                        borderBottomWidth: 1.5,
                      },
                    }}
                    focused
                  />
                </Box>

                <Box mt={1}>
                  <Typography>
                    Age
                  </Typography>

                  <TextField

                    variant="standard"
                    size="small"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    sx={{
                      width: '280px',
                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#144145',
                        borderBottomWidth: 1.5,
                      },
                    }}
                    focused
                  />
                </Box>

              </Box>

              <Box mt={1}>
                <Typography>
                  Name of Nominee
                </Typography>

                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  value={nameofNominee}
                  onChange={(e) => setNameofNominee(e.target.value)}
                  sx={{

                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#144145',
                      borderBottomWidth: 1.5,
                    },
                  }}
                  focused
                />
              </Box>

              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={2}>

                <Box>
                  <Typography>Date of Nomination</Typography>
                  <DatePicker
                    value={dateofNomination ? new Date(dateofNomination) : null}
                    format="dd-MM-yyyy"
                    onChange={(newValue) => setDateofNomination(newValue)}
                    slotProps={{
                      textField: { size: "small", fullWidth: true, },
                    }}
                  />
                </Box>

                <Box>
                  <Typography>Date of Cessation of Membership</Typography>
                  <DatePicker
                    value={dateofCessation ? new Date(dateofCessation) : null}
                    format="dd-MM-yyyy"
                    onChange={(newValue) => setDateofCessatione(newValue)}
                    slotProps={{
                      textField: { size: "small", fullWidth: true, },
                    }}
                  />
                </Box>
              </Box>

              <Box mt={1}>
                <Typography>Reason of Cessation </Typography>

                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  value={resonOfCessation}
                  onChange={(e) => setResonOfCessation(e.target.value)}
                  sx={{
                    borderBottomWidth: 1.5,
                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#144145',
                      borderBottomWidth: 1.5,
                    },
                  }}
                  focused
                />
              </Box>

              <Box mt={1}>
                <Typography>Remark</Typography>

                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  value={remark}
                  onChange={(e) => setremark(e.target.value)}
                  sx={{

                    '& .MuiInput-underline:after': {
                      borderBottomColor: '#144145',
                      borderBottomWidth: 1.5,
                    },
                  }}
                  focused
                />
              </Box>

            </LocalizationProvider>
          </Box>

          <Dialog
            open={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
          >
            <DialogTitle><b>Confirm Delete </b></DialogTitle>

            <DialogContent>
              Are you sure you want to delete <b> {memberName}</b> this template?
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


          <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2} mt={5} mb={5}>
            <Box>
              <Button
                sx={{ background: 'var(--secondary-color)', color: '#fff', fontWeight: 'bold' }}
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

export default Member
