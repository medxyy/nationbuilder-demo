const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const moment = require("moment-timezone");

const url =
  "https://mohamedidar.nationbuilder.com/api/v1/sites/meddev/pages/events";
const test_token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImFsZyI6IkhTNTEyIiwia2lkIjoiWlppUUxYRkd2cVRZNHdBMzVOMzBCZElhTENsblE2VV8weF90T3JuWF9JZyJ9.eyJpc3MiOiJuYnVpbGQiLCJpYXQiOjE3MzQ4ODU0MTcsImp0aSI6IjU1MWQ3NjU1LTFkMzctNDQ0Mi1iNDMyLTNjZWNmNDMwYjdiMCIsInBybiI6IjJ8bW9oYW1lZGlkYXIiLCJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6Im1vaGFtZWRpZGFyNEBnbWFpbC5jb20ifSwibmF0aW9uIjp7ImlkIjoiNjY2OGE1ODU1MjE2MDIwM2UwYjAyZDdjIiwic2x1ZyI6Im1vaGFtZWRpZGFyIn19._6eFU5u9fwn88FBmu1WG93vKxRVMJrMbdPgvo1HDcctGC1SLwZbUwMx_HdIguxUJjFTUfTJTtt_v3Rumfy6-UQ";

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("eventForm");
});

// Handle form submission
app.post("/update-event", async (req, res) => {
  const {
    id,
    status,
    name,
    headline,
    title,
    tags,
    intro,
    contactName,
    contactPhone,
    contactEmail,
    startTime,
    endTime,
    venueName,
    venueAddress1,
    venueCity,
    venueState,
  } = req.body;

  //   console.log(req.body);
//   console.log(startTime, endTime)
  const eventData = {
    event: {
      status,
      name,
      time_zone: "London",
      start_time: moment(startTime).format(),
      end_time: moment(endTime).format(),
      contact: {
        name: contactName,
        email: contactEmail,
      },
    },
  };

  if (headline) eventData.event.headline = headline;
  if (title) eventData.event.title = title;
  if (tags) eventData.event.tags = tags.split(","); // split tags by comma
  if (intro) eventData.event.intro = intro;

  if (contactPhone) eventData.event.contact.phone = contactPhone;
  eventData.event.contact.show_phone = true;
  eventData.event.contact.show_email = true;

  if (venueName || venueAddress1 || venueCity || venueState) {
    eventData.event.venue = {};
    if (venueName) eventData.event.venue.name = venueName;
    if (venueAddress1 || venueCity || venueState) {
        eventData.event.venue.address = {};
        if (venueAddress1) eventData.event.venue.address.address1 = venueAddress1;
        if (venueCity) eventData.event.venue.address.city = venueCity;
        if (venueState) eventData.event.venue.address.state = venueState;
    }
}

  console.log(eventData);

  try {
    const response = await axios.put(url + "/" + id, eventData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: {
        access_token: test_token,
      },
    });
    res.send("Event updated successfully!");
  } catch (error) {
    console.log(error)
    res.send(
      "Failed to update event. " +
        (error.response ? JSON.stringify(error.response.data) : error.message)
    );
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
