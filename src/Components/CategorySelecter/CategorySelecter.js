import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';
import { api } from '../../Utilities/Api';
export default function CategorySelecter(props) {
    
    const [categories, setcategories] = useState({ success: false, data: [] });
    const handleChange = (event) => {
        props.setCategoryId(event.target.value);
        console.log(props.setCategoryId)
    };
 

    useEffect(() => {

        api("GET", "localhost", "7098", "categories", "GetAllCategories", null, null).then((data) => {
            if (data.status == 401) {

                setcategories({ success: false, data: [] })
            }
            else {
                setcategories({ success: true, data: data })
            }

        });

    }, [])

    return (


        categories.success ? (
            < Box sx={{ minWidth: 120 }
            }>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Kategori"
                        onChange={handleChange}
                        defaultValue={props.categoryId}
                    >
                        {

                            categories.data.map(
                                (element) => (<MenuItem value={element.id}>{element.name}</MenuItem>)
                            )
                        }
                    </Select>
                </FormControl>
            </Box >

        ) : (null)


    );
}
