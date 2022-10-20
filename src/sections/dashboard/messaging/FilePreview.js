import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import { useCallback, useRef, useState } from "react";
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import { uploadTemplate } from '../../../redux/slices/campaigns';
import { FormProvider, RHFUploadSingleFile } from '../../../components/hook-form';


import "./styles.css";
import { SendFromTemplate } from '.';

export default function FilePreview() {
    const dispatch = useDispatch();
    const {  file } = useSelector((state) => state.messaging);
    const { clients } = useSelector((state) => state.jasmine);
    const { enqueueSnackbar } = useSnackbar();
    const [stateValue, setStateValue] = useState();
    const [stateFile, setStateFile] = useState();

    const ref = useRef();
    //   const [values, setValues] = useState();

    const fileHandler = e => {
        const fileObj = e.target.files[0];
        console.log(fileObj);
    
        ExcelRenderer(fileObj, (err, resp) => {
          if (err) {
            console.log(err);
          } else {
            setStateFile({
              cols: resp.cols,
              rows: resp.rows
            });
          }
        });
      };
  
    const handleChange = (event, newValue) => {
      setStateValue(newValue);
    };
  
    const ContactsSchema = Yup.object().shape({
      contacts: Yup.mixed().required('Contacts is required'),
    });
  
    const defaultValues = {
      contacts: null,
    };
  
    const methods = useForm({
      resolver: yupResolver(ContactsSchema),
      defaultValues,
    });
  
    const {
      reset,
      watch,
      control,
      setValue,
      handleSubmit,
      formState: { isSubmitting, isValid },
      getValues,
    } = methods;
  
    const values = watch();
  
    const onSubmit = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const bodyFormdata = new FormData();
        bodyFormdata.append('file', values.contacts);
        dispatch(uploadTemplate(bodyFormdata));
        // dispatch(fileUploadSuccess(getValues().contacts));
  
        console.log({ values });
        if (values.contacts) {
          enqueueSnackbar('Import Success!');
        }else{
          enqueueSnackbar('Import Failed!', { variant: 'error' });
        }
        reset();
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleDrop = useCallback(
      (acceptedFiles) => {
        const file = acceptedFiles[0];
  
        if (file) {
          setValue(
            'contacts',
            file
            // Object.assign(file, {
            //   preview: URL.createObjectURL(file),
            // })
          );

          ExcelRenderer(file, (err, resp) => {
            if (err) {
              console.log(err);
            } else {
              setStateFile({
                cols: resp.cols,
                rows: resp.rows
              });
            }
          });
        }
      },
      [setValue]
    );

    const handleNavigate = () => {
        
    }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    <div className="App">
    <RHFUploadSingleFile name="contacts" accept=".xlsx, .csv" maxSize={3145728} onDrop={handleDrop} sx={{my:2}}/>
      {stateFile && (
        <Box>
        <OutTable
          data={stateFile.rows}
          columns={stateFile.cols}
          tableClassName="table"
          tableHeaderRowClass="heading"
        />
        <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting} sx={{my:2}} onClick={onSubmit}>Upload</LoadingButton>
        </Box>
      )}
    </div>
    </FormProvider>
  );
}
