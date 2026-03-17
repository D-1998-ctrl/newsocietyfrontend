
import { useState, useEffect, useMemo } from 'react'
import { FormControl, Select, MenuItem, InputLabel, Divider, TextField, Button, Box, Typography, Drawer, useMediaQuery, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { toast } from "react-toastify";
import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
import DeleteIcon from '@mui/icons-material/Delete';

const Service = () => {
  const REACT_APP_URL = process.env.REACT_APP_URL
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [serviceId, setServiceId] = useState('');

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
    setIsEditing(false);
    resetForm()
  };

  const handleDrawerClose = () => {
    setServiceId('')
    setIsDrawerOpen(false);
    resetForm()
  };

  const [servicename, setServicename] = useState()
  const [description, setDescription] = useState()
  const [reff, setReff] = useState()
  const [factor, setFactor] = useState(1)

  //post n update 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: servicename,
        description: description,
        reference: reff,
        factor: factor
      };

      const requestOptions = {
        method: serviceId ? "put" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      };


      const url = serviceId
        ? `${REACT_APP_URL}/service/${serviceId}`
        : `${REACT_APP_URL}/service/`;


      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("Failed to save template");
      }

      const result = await response.json();
      // console.log("API Result:", result);
      setIsDrawerOpen(false);
      toast.success(serviceId ? " Services updated successfully!" : " Services created successfully!");
      getAuditTemp()
      resetForm();


    } catch (error) {
      console.error("Error submitting template:", error);
      toast.error("Something went wrong while saving template");
    }
  };


  //get all temp
  const [serviceData, setServiceData] = useState([]);
  const getAuditTemp = () => {
    const url = `${REACT_APP_URL}/service`;
    // console.log(" URL:", url);
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then(data => {
        console.log('data', data);
        setServiceData(data.data);

      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAuditTemp()
  }, []);


  const columns = useMemo(() => {
    return [
      {
        accessorKey: 'srNo',
        header: 'Sr No',
        size: 100,
        Cell: ({ row }) => row.index + 1,
      },

      {
        accessorKey: 'name',
        header: 'Service Name',
        size: 250,
      },

      {
        accessorKey: 'description',
        header: 'Description',
        size: 250,

      },

      {
        accessorKey: 'reference',
        header: 'Reference',
        size: 250,

      },
    ];
  }, []);

  const table = useMaterialReactTable({
    columns,
    data: serviceData,
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
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      },
    }),
  });

  const handleEdit = async (templateData) => {
    // console.log("This row has been clicked:", templateData);
    setIsEditing(true);
    setServiceId(templateData._id);
    setServicename(templateData.name)
    setDescription(templateData.description)
    setReff(templateData.reference)
    setFactor(templateData.factor)
    setIsDrawerOpen(true);
  }

  const resetForm = () => {
    setServicename('')
    setDescription('')
    setReff('')
    setFactor('')
  }

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDeleteTemp = () => {
    const url = `${REACT_APP_URL}/service/${serviceId}`;

    fetch(url, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        //console.log('data',data)
        toast.success(`${servicename} deleted successfully!`);
        getAuditTemp();
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
        <Button ariant="contained" sx={{ background: '#1b575c', color: '#fff', ml: 2, mt: 4 }} onClick={handleDrawerOpen}>Create Services</Button>
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
            width: isSmallScreen ? "100%" : "50%",
            zIndex: 1000,
          },
        }}
      >

        <Box>
          <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ecfbfd', }}>

            <Typography m={2} fontWeight="bold" variant="h6">
              {isEditing ? "Update Services " : "Create Services "}
            </Typography>
            <CloseIcon sx={{ cursor: 'pointer' }} onClick={handleDrawerClose} />
          </Box>
          <Divider />

          <Box>
            <Box m={2}>
              <Typography>Service Name</Typography>
              <TextField
                variant="standard"
                sx={{
                  '& .MuiInput-underline:after': {
                    borderBottomWidth: 1.5,
                    borderBottomColor: '#144145',
                  },
                }}
                focused


                value={servicename}
                onChange={(e) => setServicename(e.target.value)}

                size="small" placeholder="Service Name" fullWidth />
            </Box>

            <Box m={2}>
              <Typography>Description</Typography>

              <TextareaAutosize
                minRows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  width: "100%",
                  border: "none",
                  borderBottom: "1.5px solid #144145",
                  outline: "none",
                  padding: "8px 0",
                  fontFamily: "inherit",
                  fontSize: '18px'
                }}
              />
            </Box>


            <Box
              m={2}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={3}
            >


              <FormControl
                variant="standard"
                flex={1}
                sx={{
                  flex: 1,
                  '& .MuiInput-underline:after': {
                    borderBottomWidth: 1.5,
                    borderBottomColor: '#144145',
                  },
                }}
                focused
              >

                <Typography>Reference</Typography>

                <Select

                  value={reff}
                  onChange={(e) => setReff(e.target.value)}
                >
                  <MenuItem value=" ">No Reference Needed</MenuItem>
                  <MenuItem value="Area">Area</MenuItem>
                  <MenuItem value="CC">CC</MenuItem>
                  <MenuItem value="Service Charges">Service Charges</MenuItem>
                </Select>

              </FormControl>

              <Box flex={1}>
                <Typography>Multiplication Factor</Typography>
                <TextField
                  fullWidth
                  variant="standard"
                  value={factor}
                  onChange={(e) => setFactor(e.target.value)}
                  sx={{
                    '& .MuiInput-underline:after': {
                      borderBottomWidth: 1.5,
                      borderBottomColor: '#144145',
                    },
                  }}
                  focused
                  type="number"
                  size="small"
                  placeholder="Multiplication Factor"
                />
              </Box>


            </Box>

          </Box>

          <Dialog
            open={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
          >
            <DialogTitle><b>Confirm Delete </b></DialogTitle>

            <DialogContent>
              Are you sure you want to delete <b> {servicename}</b> this template?
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
                sx={{ background: '#10370d', color: '#ffffff' }}
                onClick={handleSubmit}
                variant="contained"
              >
                {isEditing ? "Update" : "Save"}
              </Button>


            </Box>

            <Box>
              <Button variant="outlined"
                sx={{ borderColor: '#1b575c', color: '#1b575c' }}

                onClick={handleDrawerClose}><b>Cancel </b> </Button>
            </Box>


            <Box>
              {isEditing &&
                <Button
                  sx={{ background: 'rgb(211, 47, 47)', color: '#fff' }}

                  variant="contained"
                  onClick={() => setOpenDeleteDialog(true)}
                >
                  Delete
                </Button>

              }
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  )
}

export default Service
