const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.firstName;
  const secondName = req.body.secondName;
  const email = req.body.email;
  const phone = req.body.phone;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: secondName,
          PHONE: phone,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us12.api.mailchimp.com/3.0/lists/cc0c98eee4";
  const options = {
    method: "POST",
    auth: "noReplayCreativa2020:90c915aa3e090457ec2a1fc969648cdd-us12",
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {});
  });

  request.write(jsonData);
  request.end();
});

app.use(express.static("public"));

app.listen(process.env.PORT || 3000),
  function () {
    console.log("Server is running on port 3000");
  };
