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
import RolesList from '../../Components/RolesList/RolesList';
import UserAuth from './UserAuth';


export default function UsersPage(props) {
    const [deger, setDeger] = useState({ success: false, data: [] });
    const [endpoint, setEndpoint] = useState([]);
    const [rolesList, setRolesList] = useState();
    const [rolesToEndpoint, setRolesToEndpoint] = useState([]);
    const [formdata, setFormdata] = useState({});
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [userAuthRoles, setUserAuthRoles] = useState([]);
    const [selectedUserAuthRoles, setSelectedUserAuthRoles] = useState("");
    const [defaultUserAuthRoles, setDefaultUserAuthRoles] = useState("");
    useEffect(() => {
        api("GET", "localhost", "7098", "Users", "Getallusers", null, null).then((data) => {
            console.log(data);
            if (data.status == 401) {
              
                setDeger({ success: false, data: [] })
            }
            else {
                setDeger({ success: true, data: data })
            }
        });

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



        api("GET", "localhost", "7098", "Roles", "getallroles", null, null).then((data) => {
            setRolesList(data.result);
        });

        api("GET", "localhost", "7098", "UserAuthRoles", "GetAllUserAuthRoles", null, null).then((res) => {
            setUserAuthRoles(res);
        })

    }, [])


    return (
        deger.success ? (<div style={{ marginLeft: "64px" }}>
            <ToastContainer />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Ad Soyad</TableCell>
                            <TableCell align="center">E-Posta</TableCell>
                            <TableCell align="center">Kullanıcı Adı</TableCell>
                            <TableCell align="center">İki Faktörlü Doğrulama</TableCell>
                            <TableCell align="center">Rol Ata</TableCell>
                            <TableCell align="center">Yetki Ata</TableCell>


                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {deger.data.map((row) => (
                            <TableRow key={row.id}>

                                <TableCell align="center">{row.name + " " + row.surname}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.userName}</TableCell>
                                <TableCell align="center">{
                                row.twoFactoryEnable?(<CheckCircleIcon></CheckCircleIcon>):(<RemoveCircleIcon></RemoveCircleIcon>)
                                }</TableCell>
                                <TableCell align="center">
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
                                        DialogTitle=" Kullanıcıya Rol Atama"
                                        DialogContent={<RolesList rolesList={rolesList} rolesToEndpoint={rolesToEndpoint} setSelectedRoles={setSelectedRoles}></RolesList>} Button1="Rolu Onayla" Button2="İptal Et"
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




                                <TableCell align="center">

                                    <ConfirmDialog buttonName="Yetki Ata" handleclickfunction={() => {
                                        api("PUT", "localhost", "7098", "UserAuthRoles", "GetByIdUserAuthRole", row.id, null).then((data) => {

                                            setDefaultUserAuthRoles(data.roleId)

                                        });
                                    }}

                                        DialogTitle="Kullanıcıya Yetki Atama"
                                        DialogContent={<UserAuth setSelectedUserAuthRoles={setSelectedUserAuthRoles} userAuthRoles={userAuthRoles}
                                            defaultUserAuthRoles={defaultUserAuthRoles}
                                        ></UserAuth>} Button1="Yetkiyi Onayla" Button2="İptal Et"

                                        apifunction={() => {
                                            let userData = {
                                                "userid": row.id,
                                                "roleid": selectedUserAuthRoles
                                            }
                                            api("PUT", "localhost", "7098", "UserAuthRoles", "SetUserAuthRole", null, userData);

                                        }}

                                    ></ConfirmDialog>

                                </TableCell>






                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        </div >) : (null)
    );

}
