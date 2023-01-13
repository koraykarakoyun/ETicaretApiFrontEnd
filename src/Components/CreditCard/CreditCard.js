import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
const CreditCard = (props) => {

  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const cardInfoVerify = (name, number, cvc, expiry) => {
    if (name !== null && name !== "" && name !== undefined
      && number !== null && number !== "" && number !== undefined && number.length === 16
      && cvc !== null && cvc !== "" && cvc !== undefined&& cvc.length === 3
      && expiry !== null && expiry !== "" && expiry !== undefined&& expiry.length === 4 ) {
      props.setCardinfos(true);
    }
    else {
      props.setCardinfos(false);
    }
  }
  useEffect(() => {
    cardInfoVerify(name, number, cvc, expiry);
  })



  const dates = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  const years = [
    {
      value: '23',
      label: '2023',
    },
    {
      value: '24',
      label: '2024',
    },
    {
      value: '25',
      label: '2025',
    },
    {
      value: '26',
      label: '2026',
    },
  ];

  const handleInputChange = (e) => {
    if (e.target.id == "number") {
      setNumber(e.target.value);
    }
    else if (e.target.id == "name") {
      setName(e.target.value);
    }
    else if (e.target.id == "cvc") {

      setCvc(e.target.value);
    }
    else if (e.target.name == "expiry-date") {
      setExpiry(e.target.value);
    }
    else if (e.target.name == "expiry-year") {

      setExpiry(expiry.slice(0, 2) + e.target.value);
    }
  }


  return (
    <div style={{ marginBottom: "3%" }} id="PaymentForm">
      <Cards
        cvc={cvc}
        expiry={expiry}
        name={name}
        number={number}

      />
      <form style={{ marginTop: "3%" }}>
        <Grid spacing={2} container>
          <Grid xs={6} item >
            <h6>Kart Numarası</h6>
            <TextField
              required
              id="number"
              onChange={handleInputChange}
              inputProps={{ maxLength: 16 }}
              style={{ width: "100%" }}
            />
            <h6>Kart Üzerindeki CVC Kodu</h6>
            <TextField
              required
              id="cvc"
              inputProps={{ maxLength: 3 }}
              onChange={handleInputChange}
              style={{ width: "100%" }}
            />
          </Grid>

          <Grid xs={6} item >

            <h6>Kart Üzerindeki İsim Soyisim</h6>
            <TextField
              required
              id="name"
              label="Name"
              onChange={handleInputChange}
              inputProps={{ maxLength: 20 }}
              style={{ width: "100%" }}
            />

            <h6>Kart Üzerindeki Son Kullanma Tarihi</h6>
            <Grid spacing={2} container>
              <Grid xs={6} item >
                <TextField
                  required
                  name='expiry-date'
                  select
                  label="Ay"
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                >
                  {dates.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={6} item >
                <TextField
                  required
                  name='expiry-year'
                  select
                  label="Yıl"
                  style={{ width: "100%" }}

                  onChange={handleInputChange}
                >
                  {years.map((option) => (
                    <MenuItem key={option.label} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </form>
    </div>
  );
}

export default CreditCard
