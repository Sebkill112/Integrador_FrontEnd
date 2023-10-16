import PropTypes from 'prop-types';
import { useCallback, memo, useRef } from 'react';

import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// Assets
import SvgUploadFile from 'assets/images/upload_file.svg';
import Swal from 'sweetalert2';

const Wrap = styled('label')(
    () => `
        display: flex;
        flex-direction: row;
        gap: 0.1rem;
        padding: 0.1rem ;
        border: 2px dashed #bbb;
        border-radius: 15px;
        cursor: pointer;
        text-align: center;
        align-items: center;
        justify-content: center;
    `
);

const ImageUpload = styled('img')(
    () => `
        width: 20%;
        max-width: 50px;
        min-width: 30px;
        height: auto;
    `
);

const Message = styled(Typography)(
    () => `
        text-align: center;
        color: #666666;
        letter-spacing: 1px;
        font-size: clamp(1rem, 1.w, 0.2rem);
        padding: 4px 0.2rem;
    `
);

/* eslint-disable */
const UploadFileComponent = ({ onResult, validate, accept}) => {
    const ref = useRef()
  const handleClick = (e) => {
    ref.current.click()
  }
    const handleChange = useCallback((event) => {
        event.preventDefault();
        // suport only one file
        // only events change or drop
        const type = event.type;

        let file = null;
        let imageURL = null;
        if (type === 'change') {
            file = event.target.files[0];
        } else if (type === 'drop') {
            file = event.dataTransfer.files[0];
        }
         
            if (file) {
                // Aquí puedes verificar el tamaño del archivo seleccionado
                const fileSize = file.size;
                const maxSizeInBytes = 15 * 1024 * 1024; // 15MB
          
                if (fileSize > maxSizeInBytes) {
                    Swal.fire(
                        'Alerta!',
                        'El archivo es demasiado grande. El tamaño máximo permitido es de 15MB.',
                        'warning'
                      )
                  event.target.value = ''; // Limpia el input para permitir seleccionar otro archivo
                } else {
                    const isValid = validate(file);

                    if (isValid)
                        onResult(file);
                }
            }

        // const excelFile = new ExcelFile(file);

        // if (excelFile.isValid()) {
        //     onResult(excelFile);
        // }
    }, []);

    return (
        <Button
        fullWidth
             variant='outlined'
            onClick={handleClick}
            onDragOver={(event) => { event.preventDefault(); }}
            onDragEnter={(event) => { event.preventDefault(); }}
            onDrop={handleChange}
        >
            < InsertDriveFileIcon />
            <Message variant="h3">
                Añadir archivo
            </Message>
            
            <input
                ref={ref}
                type="file"
                id="i_file"
                accept={accept}
                style={{ display: 'none' }}
                onChange={handleChange}
            />
        </Button>
    );
};

UploadFileComponent.defaultProps = {
    validate: () => true
};

UploadFileComponent.propTypes = {
    onResult: PropTypes.func.isRequired,
    validate: PropTypes.func,
    accept: PropTypes.func
};

export default memo(UploadFileComponent);