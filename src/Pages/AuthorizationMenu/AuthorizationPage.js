
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../Utilities/Api';
import { notify } from '../../Utilities/Notify';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import ConfirmDialog from '../../Components/ConfirmDialog/ConfirmDialog';
import RolesList from '../../Components/RolesList/RolesList';
import { act } from 'react-dom/test-utils';

export default function AuthPage(props) {
    const [deger, setDeger] = useState([]);
    const [rolesList, setRolesList] = useState();
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [rolesToEndpoint, setRolesToEndpoint] = useState([]);
    useEffect(() => {
        api("GET", "localhost", "7098", "ApplicationServices", "GetAuthorizeDefinitonEndpoints", null, null).then((data) => {
            console.log(data)
            setDeger(data);
        });

        api("GET", "localhost", "7098", "Roles", "getallroles", null, null).then((data) => {
            setRolesList(data.result);
        });


    }, [])
    return (
        <div style={{ marginLeft: "0.1%" }}>
            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {deger.map((data) => (
                    <TreeItem nodeId={data.name} label={data.name}>
                        {
                            data.action.map(action => {

                                return (<div>
                                    <ConfirmDialog buttonName="Rol Ata" handleclickfunction={() => {
                                        let formdata = {
                                            "menu": data.name,
                                            "code": action.code
                                        }
                                        api("POST", "localhost", "7098", "AuthorizationEndpoints", "GetRolesToEndpoint", null, formdata).then((data) => {
                                            if (data.datas != null) {
                                                setRolesToEndpoint(data.datas)
                                            }
                                            else {
                                                setRolesToEndpoint([])
                                            }
                                        });
                                    }} DialogTitle={action.definiton + " Endpoint'ine Rol Atama"}
                                        DialogContent={<RolesList rolesList={rolesList} rolesToEndpoint={rolesToEndpoint} setSelectedRoles={setSelectedRoles}></RolesList>} Button1="Rol Ata2" Button2="İptal Et"
                                        apifunction={() => {
                                            let formdata = {
                                                "menu": String(data.name),
                                                "code": String(action.code),
                                                roles: selectedRoles.map((element) => {
                                                    return element.name;
                                                })
                                            }
                                            console.log(formdata);
                                            api("POST", "localhost", "7098", "AuthorizationEndpoints", "AssingRoleEndpoint", null, formdata);
                                        }}></ConfirmDialog>

                                    <TreeItem style={{ display: "inline-block" }} nodeId={action.code} label={action.definiton} />
                                </div>
                                )
                            })

                        }
                    </TreeItem>
                )

                )}

            </TreeView>
        </div>
    );

}
