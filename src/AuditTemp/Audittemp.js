import { useState, useEffect, useMemo } from 'react'
import { Divider, TextField, Button, Box, Typography, Drawer, useMediaQuery, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { toast } from "react-toastify";
import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
import DeleteIcon from '@mui/icons-material/Delete';

const Audittemp = () => {
    const REACT_APP_URL = process.env.REACT_APP_URL
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [tempId, setTempId] = useState('');
    
    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
        setIsEditing(false);
        resetForm()
    };

    const handleDrawerClose = () => {
        setTempId('')
        setIsDrawerOpen(false);
        resetForm()
    };

    const [tempname, setTempname] = useState()
    const [subject, setSubject] = useState()
    const [content, setcontent] = useState()

    //post n update 
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const payload = {
                tempName: tempname,
                subject: subject,
                tempBody: content,
            };

            const requestOptions = {
                method: tempId ? "PATCH" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            };


            const url = tempId
                ? `${REACT_APP_URL}/Auditemp/${tempId}`
                : `${REACT_APP_URL}/Auditemp/`;

            const response = await fetch(url, requestOptions);

            if (!response.ok) {
                throw new Error("Failed to save template");
            }

            const result = await response.json();
            // console.log("API Result:", result);


            setIsDrawerOpen(false);
            toast.success(tempId ? " Audit Template updated successfully!" : " Audit Template created successfully!");
            getAuditTemp()
            resetForm();


        } catch (error) {
            console.error("Error submitting template:", error);
            toast.error("Something went wrong while saving template");
        }
    };


    //get all temp
    const [tempData, setTempData] = useState([]);
    const getAuditTemp = () => {
        const url = `${REACT_APP_URL}/Auditemp`;
        // console.log(" URL:", url);
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then(data => {
                // console.log('data', data);
                setTempData(data);

            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        getAuditTemp()
    }, []);

    const twoLineEllipsis = {
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        lineHeight: '1.4em',
        maxHeight: '2.8em',
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
                accessorKey: 'tempName',
                header: 'Template Name',
                size: 250,
            },

            {
                accessorKey: 'subject',
                header: 'Subject',
                size: 250,
                Cell: ({ cell }) => (
                    <Box sx={twoLineEllipsis}>
                        {cell.getValue()}
                    </Box>
                ),
            },

            {
                accessorKey: 'tempBody',
                header: 'Content',
                size: 250,
                Cell: ({ cell }) => (
                    <Box sx={twoLineEllipsis}>
                        {cell.getValue()}
                    </Box>
                ),
            },

            // {
            //     header: 'Actions',
            //     size: 50,
            //     Cell: ({ row }) => (
            //         <Box display="flex" gap={1}>
            //             <Button
            //                 variant="contained"
            //                 size="small"
            //                 sx={{ background: '#10370d' }}
            //             // onClick={() => handleEdit(row.original)}
            //             >
            //                 Edit
            //             </Button>
            //         </Box>
            //     ),
            // },

        ];
    }, []);

    const table = useMaterialReactTable({
        columns,
        data: tempData,
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
        setTempId(templateData._id);
        setTempname(templateData.tempName)
        setSubject(templateData.subject)
        setcontent(templateData.tempBody)
        setIsDrawerOpen(true);
    }

    const resetForm = () => {
        setTempname('')
        setSubject('')
        setcontent('')
    }

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleDeleteTemp = () => {
        const url = `${REACT_APP_URL}/Auditemp/${tempId}`;

        fetch(url, { method: "DELETE" })
            .then((response) => response.json())
            .then((data) => {
                //console.log('data',data)
                toast.success(`${tempname} deleted successfully!`);
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
                <Button ariant="contained" sx={{ background: 'var(--complementary-color)', color: '#fff', ml: 2, mt: 4,fontWeight:'bold' }} onClick={handleDrawerOpen}>Create Audit Template</Button>
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
                            {isEditing ? "Update Audit Template" : "Create Audit Template"}
                        </Typography>
                        <CloseIcon sx={{ cursor: 'pointer' }} onClick={handleDrawerClose} />
                    </Box>
                    <Divider />

                    <Box>
                        <Box m={2}>
                            <Typography>Template Name</Typography>
                            <TextField
                                variant="standard"
                                sx={{
                                    '& .MuiInput-underline:after': {
                                        borderBottomWidth: 1.5,
                                        borderBottomColor: '#144145',
                                    },
                                }}
                                focused


                                value={tempname}
                                onChange={(e) => setTempname(e.target.value)}

                                size="small" placeholder="Template Name" fullWidth />
                        </Box>

                        <Box m={2}>
                            <Typography>Subject</Typography>
                            <TextField
                                variant="standard"
                                sx={{
                                    '& .MuiInput-underline:after': {
                                        borderBottomWidth: 1.5,
                                        borderBottomColor: '#144145',
                                    },
                                }}
                                focused


                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}

                                size="small" placeholder="Subject" fullWidth />
                        </Box>

                        <Box m={2}>
                            <Typography>Content</Typography>

                            <TextareaAutosize
                                minRows={4}
                                value={content}
                                onChange={(e) => setcontent(e.target.value)}
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

                    </Box>

                    <Dialog
                        open={openDeleteDialog}
                        onClose={() => setOpenDeleteDialog(false)}
                    >
                        <DialogTitle><b>Confirm Delete </b></DialogTitle>

                        <DialogContent>
                            Are you sure you want to delete <b> {tempname}</b> this template?
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
                                sx={{ background: 'var(--secondary-color)', color: '#ffffff' }}
                                onClick={handleSubmit}
                                variant="contained"
                            >
                                {isEditing ? "Update" : "Save"}
                            </Button>


                        </Box>

                        <Box>
                            <Button variant="outlined"
                                sx={{ borderColor: 'var(--secondary-color)', color: 'var(--secondary-color)' }}

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

export default Audittemp
