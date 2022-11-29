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
import RolesList from '../../Components/RolesList/RolesList';

export default function UsersPage(props) {
    const [deger, setDeger] = useState([]);
    const [endpoint, setEndpoint] = useState([]);
    const [rolesList, setRolesList] = useState();
    const [rolesToEndpoint, setRolesToEndpoint] = useState([]);
    const [formdata, setFormdata] = useState({});
    const [selectedRoles, setSelectedRoles] = useState([]);

    useEffect(() => {

        api("GET", "localhost", "7098", "ApplicationServices", "GetAuthorizeDefinitonEndpoints", null, null).then((data) => {
            data.forEach(element => {
                if (element.name == "Users") {
                    setFormdata({
                        "menu": element.name,
                        "code": element.action[0].code
                    })
                }
            });
        });

        api("GET", "localhost", "7098", "Users", "Getallusers", null, null).then((data) => {
            setDeger(data)
        });

        api("GET", "localhost", "7098", "Roles", "getallroles", null, null).then((data) => {
            setRolesList(data.result);
        });



    }, [])


    return (
        <div style={{ marginLeft: "64px" }}>
            <ToastContainer />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">NameSurname</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">UserName</TableCell>
                            <TableCell align="center">Two Factory</TableCell>

                            <TableCell align="right">Add</TableCell>
                            <TableCell align="right">Update</TableCell>
                            <TableCell align="right">Delete</TableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {deger.map((row) => (
                            <TableRow key={row.id}>

                                <TableCell align="center">{row.name + " " + row.surname}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.userName}</TableCell>
                                <TableCell align="center">{row.twoFactoryEnable}</TableCell>


                                <TableCell align="right">

                                    <ConfirmDialog buttonName="Rol Ata" handleclickfunction={() => {

                                        api("GET", "localhost", "7098", "Users", "GetByIdUserRoles", row.id, null).then((data) => {
                                            console.log(data)
                                            if (data.roles != null) {
                                                setRolesToEndpoint(data.roles)
                                            }
                                            else {
                                                setRolesToEndpoint([])
                                            }
                                        });
                                    }}

                                        DialogTitle=" Endpoint'ine Rol Atama"
                                        DialogContent={<RolesList rolesList={rolesList} rolesToEndpoint={rolesToEndpoint} setSelectedRoles={setSelectedRoles}></RolesList>} Button1="Rol Ata2" Button2="İptal Et"

                                        apifunction={() => {
                                            let userData = {
                                                "id": row.id,
                                                roles: selectedRoles.map((element) => {
                                                    return element.name;
                                                })
                                            }

                                            api("POST", "localhost", "7098", "Users", "AssignUserRoles", null, userData);
                                        }}

                                    ></ConfirmDialog>

                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        </div >
    );

}
