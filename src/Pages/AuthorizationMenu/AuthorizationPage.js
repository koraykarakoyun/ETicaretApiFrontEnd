
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

export default function AuthPage(props) {
    const [deger, setDeger] = useState([]);


    useEffect(() => {
        api("GET", "localhost", "7098", "ApplicationServices", "GetAuthorizeDefinitonEndpoints", null, null).then((data) => {
            console.log(data)
            setDeger(data);
        });
    },[])
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
                                  <ConfirmDialog buttonName="Rol Ata" DialogTitle={action.definiton+" Endpoint'ine Rol Atama"}
                                   DialogContent="İlgili Sayfaya Aşağıdan Rolleri Atayabilirsiniz" Button1="Evet" Button2="Hayır" 
                                   apifunction={()=>{
                                    console.log(action.definiton+"a tıklandı")
                                   }}></ConfirmDialog>

                                <TreeItem style={{display:"inline-block"}} nodeId={action.code} label={action.definiton} />
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
