
import { useFormContext, Controller } from "react-hook-form";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider
} from "@mui/material";

const Schdule = () => {
  const { watch, control } = useFormContext();


  return (
    <Box>
      <Box>

        <Typography variant='h5' sx={{ textAlign: 'center' }}><b>SCHEDULES</b></Typography>

      </Box>
      <Divider />

      <Box>
        <Box>
          <Box mt={2} >
            <Typography variant='h6'><b>SCHEDULE –I</b></Typography>
          </Box>
          <Box display={'flex'} alignItems={'center'}justifyContent={'space-between'}>  
            <Box  >
            <Typography >Transaction involving infringement of the provisions of the Act, Rules and Bye- laws</Typography>
          </Box>
          <Controller
            name="ScheduleI"
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

{/*  */}
 <Box>
          <Box mt={2} >
            <Typography variant='h6'><b>SCHEDULE –II</b></Typography>
          </Box>
          <Box display={'flex'} alignItems={'center'}justifyContent={'space-between'}>  
            <Box  >
            <Typography >Particular of sums which ought to have been but have not been brought into accounts: -</Typography>
          </Box>
          <Controller
            name="ScheduleII"
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



         <Box>
          <Box mt={2} >
            <Typography variant='h6'><b>SCHEDULE –III</b></Typography>
          </Box>
          <Box display={'flex'} alignItems={'center'}justifyContent={'space-between'}>  
            <Box  >
            <Typography >Improper and Irregular vouchers</Typography>
          </Box>
          <Controller
            name="ScheduleIII"
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




         <Box>
          <Box mt={2} >
            <Typography variant='h6'><b>SCHEDULE –IIIA</b></Typography>
          </Box>
          <Box display={'flex'} alignItems={'center'}justifyContent={'space-between'}>  
            <Box  >
            <Typography >Irregularities in the realization moneys:-</Typography>
          </Box>
          <Controller
            name="ScheduleIIIA"
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


         <Box>
          <Box mt={2} >
            <Typography variant='h6'><b>SCHEDULE –IV</b></Typography>
          </Box>
          <Box display={'flex'} alignItems={'center'}justifyContent={'space-between'}>  
            <Box  >
            <Typography >Transaction involving infringement of the provisions of the Act, Rules and Bye- laws :-</Typography>
          </Box>
          <Controller
            name="ScheduleIV"
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





         <Box>
          <Box mt={2} >
            <Typography variant='h6'><b>SCHEDULE –V</b></Typography>
          </Box>
          <Box display={'flex'} alignItems={'center'}justifyContent={'space-between'}>  
            <Box  >
            <Typography >Particular of sums which ought to have been but have not been brought into accounts: </Typography>
          </Box>
          <Controller
            name="ScheduleV"
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





    // <Box>
    //   <Typography variant="h6">SCHEDULE – I</Typography>

    // <Controller
    //   name="ScheduleI"
    //   control={control}
    //   defaultValue={false}
    //   render={({ field }) => (
    //     <RadioGroup
    //       row
    //       value={field.value ? "yes" : "no"}
    //       onChange={(e) => {
    //         field.onChange(e.target.value === "yes");
    //       }}
    //     >
    //       <FormControlLabel
    //         value="yes"
    //         control={<Radio />}
    //         label="Yes"
    //       />
    //       <FormControlLabel
    //         value="no"
    //         control={<Radio />}
    //         label="No"
    //       />
    //     </RadioGroup>
    //   )}
    // />
    // </Box>
  );
};

export default Schdule;
