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


import FileUploadModelDialog from '../../Components/FileUploadModelDialog';
import ConfirmDialog from '../../Components/ConfirmDialog/ConfirmDialog';

export default function RolesPage(props) {
    const [deger, setDeger] = useState([]);
    useEffect(() => {
        api("GET", "localhost", "7098", "Roles", "getallroles", null, null).then((data) => {

            console.log(data.result);
            setDeger(data.result)
        });
    }, [])


    return (
        <div style={{ marginLeft: "64px" }}>
            <ToastContainer />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Role Name</TableCell>

                            <TableCell align="right">Add</TableCell>
                            <TableCell align="right">Update</TableCell>
                            <TableCell align="right">Delete</TableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {deger.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="center">{row.name}</TableCell>

                                <TableCell align="right">

                                    <ConfirmDialog icon={<AddIcon></AddIcon>} DialogTitle="Dikkat" DialogContent={<>
                                        <form>
                                            <label>
                                                Name:<input id='role_name' type="text" />
                                            </label>
                                        </form>
                                    </>}
                                        Button1="Evet" Button2="Hayır"
                                        apifunction={() => {

                                            var role_name = document.getElementById("role_name").value;
                                            var role = {
                                                "Name": String(role_name)
                                            }
                                            api("POST", "localhost", "7098", "roles", "CreateRole", null, role).then(res => notify(res.message))
                                        }}
                                    ></ConfirmDialog>

                                </TableCell>


                                <TableCell align="right">

                                    <ConfirmDialog icon={<AutorenewIcon></AutorenewIcon>} DialogTitle="Dikkat" DialogContent={<>
                                        <form>
                                            <label>
                                                Yeni Isim:<input id='role_name' type="text" />
                                            </label>
                                        </form>
                                    </>} Button1="Evet" Button2="Hayır" apifunction={() => {

                                        var role_name = document.getElementById("role_name").value;
                                        var role = {
                                            "Id": String(row.id),
                                            "Name": String(role_name)
                                        }
                                        api("PUT", "localhost", "7098", "roles", "updaterole", null, role).then(res => notify(res.message))
                                    }}></ConfirmDialog>

                                </TableCell>

                                <TableCell align="right">

                                    <ConfirmDialog icon={<DeleteIcon></DeleteIcon>} DialogTitle="Dikkat" DialogContent="Urunu Silmek Istiyormusunuz?" Button1="Evet" Button2="Hayır" apifunction={
                                        () => {

                                            console.log(row.id)

                                            api("DELETE", "localhost", "7098", "roles", "DeleteRole", row.id, null).then(res => notify(res.message))
                                        }
                                    }></ConfirmDialog>

                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        </div>
    );

}
