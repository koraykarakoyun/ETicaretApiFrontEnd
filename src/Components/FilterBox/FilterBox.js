import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { fontSize } from '@mui/system';
import { useEffect, useState } from 'react';
import { api } from '../../Utilities/Api';
import { Button } from '@mui/material';
const FilterBox = (props) => {

    const [filters, setFilters] = useState({ success: false, data: [], category: true });

    let [category, setCategory] = useState("default");
    let [brand, setBrand] = useState("default");
    let [model, setModel] = useState("default");
    let [color, setColor] = useState("default");
    const defaultValue = "default";
    const autoMargin = {
        margin: "auto"
    }
    const formLabel = {
        margin: "auto", fontSize: "1.2rem", fontWeight: "bold"
    }

    const handleCategory = (event) => {

        if (event == undefined) {
            console.log("category default atandı")
            setCategory("default");
            console.log(category);
        }
        else {
            setCategory(event.target.value);
          
        }

        
    };

    const handleBrands = (event) => {
        if (event == undefined) {
            console.log("brands default atandı")
            setBrand("default");
            console.log(brand);
        }
        else {
            setBrand(event.target.value);
        }
    };

    const handleModel = (event) => {
        if (event== undefined) {
            console.log("model default atandı")
            setModel("default");
            console.log(model);

        }
        else {
            setModel(event.target.value);
        }

    };
    const handleColor = (event) => {
        if (event == undefined) {
            console.log("color default atandı");
            setColor("default");
            console.log(color);

        }
        else {
            setColor(event.target.value);
        }
    };

    useEffect(() => {

        if (props.category == undefined) {
            api("GET", "localhost", "7098", "Products", "getallfilters", null, null).then((data) => {
                console.log(data);

                setFilters({ success: true, data: data, category: true });
            });

        }
        else {
            let data = {
                "category": props.category
            }
            api("POST", "localhost", "7098", "Products", "getcategoryfilters", null, data).then((data) => {
                setFilters({ success: true, data: data, category: false });

            });
        }

        console.log(document.getElementsByTagName("brand_name").defaultValue)
       
        handleBrands();
        handleModel();
        handleColor();
    }, [props.category])

    return (

        filters.success ? (
            <>

                {
                    filters.category ? (
                        < FormControl style={{ width: "100%" }
                        }>
                            <FormLabel style={formLabel} id="demo-radio-buttons-group-label">Kategori</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                onChange={handleCategory}

                            >

                                <FormControlLabel value="default" control={<Radio />} label="varsayılan" />
                                {
                                    filters.data.categories.map((filter) => (
                                        <FormControlLabel value={filter} control={<Radio />} label={filter} />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl >) : (
                        null
                    )
                }


                <FormControl style={{ width: "100%", marginTop: "10%" }}>
                    <FormLabel style={formLabel} id="demo-radio-buttons-group-label">Marka</FormLabel>
                    <RadioGroup
                  
                        name="brand_name"
                        defaultValue="default"
                        aria-labelledby="demo-radio-buttons-group-label"
                        onChange={handleBrands}
                    >
                        <FormControlLabel value="default" control={<Radio />} label="varsayılan" />
                        {

                            filters.data.brands.map((filter) => (
                                <FormControlLabel value={filter} control={<Radio />} label={filter} />
                            ))
                        }
                    </RadioGroup>
                </FormControl>



                <FormControl style={{ width: "100%", marginTop: "10%" }}>
                    <FormLabel style={formLabel} id="demo-radio-buttons-group-label">Model</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"

                        name="model_name"
                        onChange={handleModel}
                    >
                        <FormControlLabel value="default" control={<Radio />} label="varsayılan" />
                        {
                            filters.data.models.map((filter) => (
                                <FormControlLabel value={filter} control={<Radio />} label={filter} />
                            ))
                        }
                    </RadioGroup>
                </FormControl>

                <FormControl style={{ width: "100%", marginTop: "10%" }}>
                    <FormLabel style={formLabel} id="demo-radio-buttons-group-label">Renk</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"

                        name="color_name"
                        onChange={handleColor}
                    >
                        <FormControlLabel value="default" control={<Radio />} label="varsayılan" />
                        {
                            filters.data.colors.map((filter) => (
                                <FormControlLabel value={filter} control={<Radio />} label={filter} />
                            ))
                        }
                    </RadioGroup>
                </FormControl>

                <Button onClick={() => {

                    if (props.category == undefined) {
                        var data = {
                            "category": category == "default" ? null : category,
                            "brand": brand == "default" ? null : brand,
                            "model": model == "default" ? null : model,
                            "color": color == "default" ? null : color
                        }
                    }
                    else {
                        var data = {
                            "category": props.category == undefined ? null : props.category,
                            "brand": brand == "default" ? null : brand,
                            "model": model == "default" ? null : model,
                            "color": color == "default" ? null : color
                        }
                    }
                    console.log(data);
                    // api("POST", "localhost", "7098", "Products", "GetAllFilteredProducts", null, data).then((data) => {

                    // });

                }}>Filtrele</Button>
            </>) : (null)



    )
}

export default FilterBox