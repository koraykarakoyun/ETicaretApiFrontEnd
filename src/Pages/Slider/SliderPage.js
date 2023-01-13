import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Link, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../Utilities/Api';
import { notify } from '../../Utilities/Notify';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import FileUploadModelDialog from '../../Components/FileUploadModelDialog';
import ConfirmDialog from '../../Components/ConfirmDialog/ConfirmDialog';
import CardMedia from '@mui/material/CardMedia';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAlert } from 'react-alert'
import { types } from 'react-alert'

export default function SliderPage(props) {
  const alert = useAlert()
  const [deger, setDeger] = useState({ success: false, data: [] });
  const [selectedFile, setSelectedFile] = useState();
  const [IsSelected, setIsSelected] = useState(false);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);

  };
  useEffect(() => {
    api("GET", "localhost", "7098", "Sliders", "getallslidephoto", false, null).then((data) => {
      console.log(data);
      if (data.status == 401) {
        setDeger({ success: false, data: [] })
      }
      else {
        setDeger({ success: true, data: data })
      }

    });
  }, SliderPage)
  return (


    deger.success ? (<div style={{ marginLeft: "0.1%" }} >



      <ToastContainer />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Resim</TableCell>
              <TableCell align="center">Dosya Adı</TableCell>
              <TableCell align="center">Dosya Yolu</TableCell>
              <TableCell align="center">Durum</TableCell>
              <TableCell align="center">Resim Ekle</TableCell>
              <TableCell align="center">Resim Sil</TableCell>
              <TableCell align="center">Vitrin</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {deger.data.map((row) => (
              <TableRow key={row.fileId}>
                <TableCell align="center">{
                  <CardMedia
                    component="img"
                    src={
                      `http://127.0.0.1:8887/${row.filePath}`
                    }
                    style={{ height: "5rem", width: "100%", objectFit: "fill" }}
                  />
                }</TableCell>
                <TableCell align="center">{row.fileName}</TableCell>
                <TableCell align="center">{row.filePath}</TableCell>
                <TableCell align="center">
                  {
                    row.showCase ? (<VisibilityIcon></VisibilityIcon>) : (<RemoveCircleIcon></RemoveCircleIcon>)
                  }
                </TableCell>


                <TableCell align="center">
                  <IconButton aria-label="delete">

                    <ConfirmDialog icon={<AddIcon></AddIcon>} DialogTitle="Vitrine Resim Ekleme" DialogContent={

                      <div>
                        <input type="file" name="file" onChange={changeHandler} />
                        {IsSelected ? (
                          <div>
                            <p>Filename: {selectedFile.name}</p>
                            <p>Filetype: {selectedFile.type}</p>
                            <p>Size in bytes: {selectedFile.size}</p>
                            <p>
                              lastModifiedDate:{' '}
                              {selectedFile.lastModifiedDate.toLocaleDateString()}
                            </p>
                          </div>
                        ) : null}
                        <div>
                          <ConfirmDialog buttonName="Kaydet" DialogTitle="Vitrine Resim Ekleme" DialogContent={"Vitrine Resim Ekleme İşlemi"} apifunction={() => {
                            console.log(selectedFile)
                            const formData = new FormData();
                            formData.append('file', selectedFile);
                            console.log(formData)
                            api("POST", "localhost", "7098", "sliders", "addslidephoto", null, formData).then(response => {
                              if (response.isSuccess) {
                                alert.show(response.message, { type: types.SUCCESS })
                              }
                              else {
                                alert.show(response.message, { type: types.ERROR })
                              }
                            });

                          }} Button1="Onayla" Button2="Kapat" ></ConfirmDialog>
                        </div>
                      </div>

                    }
                      apifunction={null} Button2="Kapat"  ></ConfirmDialog>
                  </IconButton>
                </TableCell>


                <TableCell align="center">
                  <IconButton aria-label="delete">

                    <ConfirmDialog icon={<DeleteIcon></DeleteIcon>} DialogTitle="Dikkat" DialogContent="Resmi Silmek Istiyormusunuz?" Button1="Onayla" Button2="Kapat" apifunction={() => {
                      api("DELETE", "localhost", "7098", "sliders", "deletebyidslidephoto", row.fileId, null).then(response => {
                        if (response.isSuccess) {
                          alert.show(response.message, { type: types.SUCCESS })
                        }
                        else {
                          alert.show(response.message, { type: types.ERROR })
                        }
                      });
                    }} ></ConfirmDialog>

                  </IconButton>
                </TableCell>

                <TableCell align="center">


                  {
                    row.showCase ? (
                      <IconButton aria-label="delete">

                        <ConfirmDialog icon={<VisibilityOffIcon></VisibilityOffIcon>} DialogTitle="Dikkat" DialogContent="Resmi Vitrinden Çıkarmak Istiyormusunuz?" Button1="Onayla" Button2="Kapat" apifunction={() => {
                          api("DELETE", "localhost", "7098", "sliders", "deletebyidshowcase", row.fileId, null).then(response => {
                            if (response.isSuccess) {
                              alert.show(response.message, { type: types.SUCCESS })
                            }
                            else {
                              alert.show(response.message, { type: types.ERROR })
                            }
                          });
                        }} ></ConfirmDialog>

                      </IconButton>
                    ) : (
                      <IconButton aria-label="add">

                        <ConfirmDialog icon={<VisibilityIcon></VisibilityIcon>} DialogTitle="Dikkat" DialogContent="Resmi Vitrine Eklemek Istiyormusunuz?" Button1="Onayla" Button2="Kapat" apifunction={() => {
                          api("POST", "localhost", "7098", "sliders", "ActivateByIdShowCase", row.fileId, null).then(response => {
                            if (response.isSuccess) {
                              alert.show(response.message, { type: types.SUCCESS })
                            }
                            else {
                              alert.show(response.message, { type: types.ERROR })
                            }
                          });
                        }} ></ConfirmDialog>

                      </IconButton>
                    )
                  }

                </TableCell>













              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div >) : (null)


  );

}
