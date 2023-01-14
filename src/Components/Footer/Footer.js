import React from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn
} from 'mdb-react-ui-kit';
import { MDBIcon } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Footer() {
    return (
        <MDBFooter style={{ backgroundColor: "#193441" }} className='text-center text-white'>
            <MDBContainer className='p-4 pb-0'>
                <section className='mb-4'>
                    <MDBBtn
                        floating
                        className='m-1'
                        style={{ backgroundColor: '#3b5998' }}
                        onClick={() => { window.location.assign('https://www.facebook.com')}}
                        role='button'
                    >
                        <MDBIcon fab icon='facebook-f' />
                    </MDBBtn>

                    <MDBBtn
                        floating
                        className='m-1'
                        style={{ backgroundColor: '#55acee' }}
                        onClick={() => { window.location.assign('https://www.twitter.com')}}
                        role='button'
                    >
                        <MDBIcon fab icon='twitter' />
                    </MDBBtn>

                    <MDBBtn
                        floating
                        className='m-1'
                        style={{ backgroundColor: '#dd4b39' }}
                        onClick={() => { window.location.assign('https://www.google.com')}}
                        role='button'
                    >
                        <MDBIcon fab icon='google' />
                    </MDBBtn>
                    <MDBBtn
                        floating
                        className='m-1'
                        style={{ backgroundColor: '#ac2bac' }}
                        onClick={() => { window.location.assign('https://www.instagram.com')}}
                        role='button'
                    >
                        <MDBIcon fab icon="instagram" />
                    </MDBBtn>

                    <MDBBtn
                        floating
                        className='m-1'
                        style={{ backgroundColor: '#0082ca' }}
                        onClick={() => { window.location.assign('https://www.linkedin.com')}}
                        role='button'
                    >
                        <MDBIcon fab icon='linkedin-in' />
                    </MDBBtn>

                    <MDBBtn
                        floating
                        className='m-1'
                        style={{ backgroundColor: '#333333' }}
                        onClick={() => { window.location.assign('https://github.com')}}
                        role='button'
                    >
                        <MDBIcon fab icon='github' />
                    </MDBBtn>
                </section>
            </MDBContainer>

            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2023 Koray Karakoyun - Tüm Hakları Saklıdır.
            </div>
        </MDBFooter>
    );
}