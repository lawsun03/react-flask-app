import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import jwt_decode from "jwt-decode"
import { startSetUser } from '../store/actions/user'

function GoogleOAuth({
    startSetUser,
    user,
}) {

    const [tokenClient, setTokenClient] = useState({})

    let gapi = window.gapi
    const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
    const API_KEY = process.env.REACT_APP_API_KEY
    const DISCOVERY_DOCS = process.env.REACT_APP_GOOGLE_DISCOVERY_DOCS
    const SCOPES = process.env.REACT_APP_GOOGLE_SCOPES

    // const handleClick = () => {

    //     gapi.load('client:auth2', () => {
    //         console.log('loaded client')
    //         gapi.client.init({
    //             apiKey: API_KEY,
    //             clientId: CLIENT_ID,
    //             discoveryDocs: [DISCOVERY_DOCS],
    //             scope: SCOPES,
    //         })


    //         gapi.client.load('calendar', 'v3', () => console.log('bam!'))

    //         gapi.auth2.getAuthInstance().signIn()
    //     })
    // }

    // const initClient = () => {

    //     console.log('loaded client')

    //     gapi.client.init({
    //         apiKey: API_KEY,
    //         clientId: CLIENT_ID,
    //         discoveryDocs: [DISCOVERY_DOCS],
    //         scope: SCOPES,
    //     }).then(function () {
    //         gapi.client.load('calendar', 'v3', () => console.log('bam!'))

    //         gapi.auth2.getAuthInstance().signIn()

    //     })

    // }

    // function handleClientLoad() {
    //     // Load the API's client and auth2 modules.
    //     // Call the initClient function after the modules load.
    //     gapi.load('client:auth2', initClient)
    // }

    function handleCallbackResponse(response) {
        console.log('response', response)
        console.log('Encoded JWT ID token:', response.credential)
        var userObject = jwt_decode(response.credential)
        console.log('Decoded JWT ID token:', userObject)
        startSetUser(userObject)
        document.getElementById("signInDiv").hidden = true
    }

    function handleSignOut(event) {
        startSetUser({})
        document.getElementById("signInDiv").hidden = false
    }

    function createNewEvent() {
        tokenClient.requestAccessToken()
    }

    useEffect(() => {
        /*global google*/

        const google = window.google

        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleCallbackResponse,
            auto_select: true,
        });


        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: 'outline', size: 'large' }
        )

        // Access Tokens
        // Create events in user's Google Calendar
        setTokenClient(google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: "https://www.googleapis.com/auth/calendar",
            callback: (tokenResponse) => {
                console.log(tokenResponse)
                // var event = {
                //     'summary': 'Awesome Event!',
                //     'location': '800 Howard St., San Francisco, CA 94103',
                //     'description': 'Really great refreshments',
                //     'start': {
                //         'dateTime': '2022-10-20T09:00:00-07:00',
                //         'timeZone': 'America/Los_Angeles'
                //     },
                //     'end': {
                //         'dateTime': '2022-10-20T17:00:00-07:00',
                //         'timeZone': 'America/Los_Angeles'
                //     },
                //     'recurrence': [
                //         'RRULE:FREQ=DAILY;COUNT=2'
                //     ],
                //     'attendees': [
                //         { 'email': 'lpage@example.com' },
                //         { 'email': 'sbrin@example.com' }
                //     ],
                //     'reminders': {
                //         'useDefault': false,
                //         'overrides': [
                //             { 'method': 'email', 'minutes': 24 * 60 },
                //             { 'method': 'popup', 'minutes': 10 }
                //         ]
                //     }
                // }
                // We now have access to a live token to use for ANY google API
                if (tokenResponse && tokenResponse.access_token) {
                    fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${tokenResponse.access_token}`
                        },
                        body: JSON.stringify({
                            'summary': 'Awesome Event!',
                            'location': '800 Howard St., San Francisco, CA 94103',
                            'description': 'Really great refreshments',
                            'start': {
                                'dateTime': '2022-10-20T09:00:00-07:00',
                                'timeZone': 'America/Los_Angeles'
                            },
                            'end': {
                                'dateTime': '2022-10-20T17:00:00-07:00',
                                'timeZone': 'America/Los_Angeles'
                            },
                            'recurrence': [
                                'RRULE:FREQ=DAILY;COUNT=2'
                            ],
                            'attendees': [
                                { 'email': 'lpage@example.com' },
                                { 'email': 'sbrin@example.com' }
                            ],
                            'reminders': {
                                'useDefault': false,
                                'overrides': [
                                    { 'method': 'email', 'minutes': 24 * 60 },
                                    { 'method': 'popup', 'minutes': 10 }
                                ]
                            }
                        })
                    })

                }
            },
        }))

        // tokenClient

        google.accounts.id.prompt()

        console.log('google', google)

    }, [])

    return (
        <div>
            {/* <div id='signInDiv' onClick={() => handleClick()}>hjello</div> */}
            <div id='signInDiv'></div>
            <input type='submit' onClick={createNewEvent} value="Create Event" />
            {/* {Object.keys(user).length != 0 &&
                <button onClick={(e) => handleSignOut(e)} className="signout-button text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium text-center items-center dark:focus:ring-gray-500 mr-2">
                    Sign Out
                </button>
            } */}
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
})

export default connect(mapStateToProps, { startSetUser })(GoogleOAuth)
