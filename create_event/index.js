const axios = require('axios');
const moment = require('moment-timezone');

const url = 'https://mohamedidar.nationbuilder.com/api/v1/sites/meddev/pages/events';
const test_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImFsZyI6IkhTNTEyIiwia2lkIjoiWlppUUxYRkd2cVRZNHdBMzVOMzBCZElhTENsblE2VV8weF90T3JuWF9JZyJ9.eyJpc3MiOiJuYnVpbGQiLCJpYXQiOjE3MzQ4ODU0MTcsImp0aSI6IjU1MWQ3NjU1LTFkMzctNDQ0Mi1iNDMyLTNjZWNmNDMwYjdiMCIsInBybiI6IjJ8bW9oYW1lZGlkYXIiLCJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6Im1vaGFtZWRpZGFyNEBnbWFpbC5jb20ifSwibmF0aW9uIjp7ImlkIjoiNjY2OGE1ODU1MjE2MDIwM2UwYjAyZDdjIiwic2x1ZyI6Im1vaGFtZWRpZGFyIn19._6eFU5u9fwn88FBmu1WG93vKxRVMJrMbdPgvo1HDcctGC1SLwZbUwMx_HdIguxUJjFTUfTJTtt_v3Rumfy6-UQ"

// Calculate the start and end times
const startTime = moment().tz('Europe/London').add(2, 'days').format();
const endTime = moment(startTime).add(24, 'hours').format();

const eventData = {
    event: {
        status: 'unlisted',
        name: 'Fasting Day',
        intro: 'Take the 24hr nofoodchallenge!!!',
        time_zone: 'Pacific Time (US & Canada)',
        start_time: startTime,
        end_time: endTime,
        contact: {
            name: 'Byron Anderson',
            contact_phone: '1234567890',
            show_phone: true,
            contact_email: 'contact@venue.com',
            email: 'contact@venue.com',
            show_email: true
        },
        rsvp_form: {
            phone: 'optional',
            address: 'required',
            allow_guests: true,
            accept_rsvps: true,
            gather_volunteers: true
        },
        show_guests: true,
        capacity: 80,
        venue: {
            name: 'Ralphs Parking Lot',
            address: {
                address1: '123 Foo St',
                city: 'Pasadena',
                state: 'CA'
            }
        }
    }
};

axios.post(url, eventData, {
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    params: {
        access_token: test_token
    }
})
    .then(response => {
     console.log('Event created successfully!', response.data);
    })
    .catch(error => {
        // console.error(error)
        console.error('Failed to create event.', error.response ? error.response.data : error.message);
    });