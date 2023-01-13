import React, { useState } from 'react';
import { useEffect } from 'react';
import Posts from '../../Pagination/Posts';
import { api } from '../../Utilities/Api';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import FileUploadPosts from './FileUploadPosts';
import { useAlert } from 'react-alert'
import { types } from 'react-alert'
export default function FileUpload(props) {
    const alert = useAlert()
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [IsSelected, setIsSelected] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);



    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);

    };



    return (
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
                <ConfirmDialog DialogTitle="Dikkat" DialogContent=" Seçilen Resmi Yüklemek Istiyormusunuz?" Button1="Seçimi Onayla" Button2="İptal" buttonName="Resmi Kaydet" apifunction={() => {

                    const formData = new FormData();
                    formData.append('file', selectedFile);
                    formData.append('fileName', selectedFile.name);
                    formData.append('ProductId', props.productId);
                    api("POST", "localhost", "7098", "products", "upload", null, formData).then(res => {
                        if (res.isSuccess) {
                            alert.show(res.message, { type: types.SUCCESS })
                        }
                        else {
                            alert.show(res.message, { type: types.SUCCESS })
                        }
                    });
                }} ></ConfirmDialog>
            </div>


            <div style={{ width: "100%", marginTop: "2%" }}>
                <FileUploadPosts productId={props.productId}></FileUploadPosts>
            </div>
        </div>
    )
}
