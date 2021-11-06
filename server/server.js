const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { getParsedCommandLineOfConfigFile } = require("typescript");

const app = express();
const PORT = process.env.PORT || 3002;
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(PORT, ()=>{
    console.log(`server starting at port ${PORT}`);
})

app.get("/", (req, res) => {
    res.send(
      "<h1>Welcome</h1>"
    );
  });

app.post("/sendmail", (req, res) => {
    console.log("request came");
    let user = req.body;
    sendMail(user, info => {
      console.log(`The mail has been sent successfully`);
      res.send(info);
    });
});

async function sendMail(user, callback) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, 
      auth: {
        user: 'madmweb@gmail.com',
        pass: 'FrontEnd'
      }
    });

let mailOptions = {
    from: user.userEmail, 
    to: 'madmweb@gmail.com', 
    subject: "New comment from Medeor client",
    html: `<p>My name is ${user.userName}.</p>
    <p>${user.message}. You can contact me at my email ${user.userEmail}.</p>`
};

let info = await transporter.sendMail(mailOptions);
  callback(info);

}