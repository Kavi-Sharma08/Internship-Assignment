import nodemailer from "nodemailer"

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "kavi.workspaceofficial@gmail.com",
    pass: "lqqqkqcjgycmutyp",
  },
});

// Wrap in an async IIFE so we can use await.
const sendMail = async () => {
    const message  = "You Enquire the Cart"
  const info = await transporter.sendMail({
    
    from: 'kavi.workspaceofficial@gmail.com',
    to: "thekavisharma26@gmail.com",
    subject: "Hello ✔",
    text: message,
    
  });

  return message
}
export {
    sendMail
}