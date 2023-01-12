
import React, { useState } from 'react';
import { useEffect } from 'react';
import Posts from '../../Pagination/Posts';
import { api } from '../../Utilities/Api';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import FileUploadPosts from './FileUploadPosts';

export default function FileUpload(props) {

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
                <ConfirmDialog DialogTitle="Dikkat" DialogContent=" Seçilen Resmi Yüklemek Istiyormusunuz?" Button1="Seçimi Onayla" Button2="İptal"  buttonName="Resmi Kaydet" apifunction={() => {

                    const formData = new FormData();
                    formData.append('file', selectedFile);
                    formData.append('fileName', selectedFile.name);
                    formData.append('ProductId', props.productId);
                    api("POST", "localhost", "7098", "products", "upload", null, formData).then(res => console.log(res));
                }} ></ConfirmDialog>
            </div>


            <div style={{ width: "100%", marginTop: "2%" }}>
                <FileUploadPosts productId={props.productId}></FileUploadPosts>
            </div>
        </div>
    )
}
