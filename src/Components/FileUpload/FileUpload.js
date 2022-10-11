
import React, { useState } from 'react';
import { api } from "../../Utilities/Api"
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';

export default function FileUpload(props) {

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [IsSelected, setIsSelected] = useState(false);
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);

    };


    const handleSubmission = () => {

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('fileName', selectedFile.name);
        formData.append('ProductId',props.productId);
        api("POST", "localhost", "7098", "products", "upload", null, formData).then(res => console.log(res));

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
                <button onClick={handleSubmission}>Submit</button>
            </div>
        </div>
    )
}
