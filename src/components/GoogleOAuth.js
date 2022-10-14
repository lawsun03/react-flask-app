import React, { useState, useEffect } from 'react';
import * as dotenv from 'dotenv';

function GoogleOAuth() {

    function handleCallbackResponse(response) {
        console.log('Encoded JWT ID token:', response.credential)

    }

    useEffect(() => {
        // global google
        google.accounts.id.initialize({
            client_id: process.env.GOOGLE_CLIENT_ID,
            callback: handleCallbackResponse,
        });


        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: 'outline', size: 'large' }
        )

        console.log('client id', process.env.GOOGLE_CLIENT_ID)
    }, [])

  return (
    <>
        <div id='signInDiv'>

        </div>
    </>
  )
}


export default GoogleOAuth