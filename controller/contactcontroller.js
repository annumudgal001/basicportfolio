import dotenv from 'dotenv';
dotenv.config();
import contact from '../model/contactmodel.js';
import { sendMail } from '../helpers/sendmail.js';

const contactcontroller = (req, res) => {
    res.render('contact.ejs', { "title": "contact page" });
}

const saveusercontroller = async (req, res) => {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim();
    const message = req.body.message?.trim();

    const html = `
    <div style="
        background-image: url('/images/bg.png'), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80');
        background-size: cover;
        background-position: center;
        background-color: #333;
        padding: 40px;
        font-family: Arial, sans-serif;
        color: white;
        text-align: center;
        border-radius: 10px;
      ">
      <h1 style="font-size: 36px;">🎉 Welcome, ${name}! 🎉</h1>
      <p style="font-size: 18px;">
        Thank you for visiting my portfolio site. 💼 <br/>
        I really appreciate your message and will get back to you ASAP. 📩
      </p>
      <p style="margin-top: 30px;">
        Best regards,<br/>
        <strong>Annu Mudgal</strong> ✨
      </p>
    </div>
  `;

  const toadminhtml = `
  <div style="
      background-image: url('/images/bg.png'), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80');
      background-size: cover;
      background-position: center;
      background-color: #333;
      padding: 40px;
      font-family: Arial, sans-serif;
      color: white;
      border-radius: 10px;
      text-align: center;
    ">
    <h1 style="font-size: 36px;">📨 New Message Alert!</h1>
    
    <div style="
        text-align: left;
        background: rgba(0,0,0,0.6);
        padding: 25px;
        border-radius: 8px;
        margin: 30px auto;
        max-width: 500px;
      ">
      <p style="font-size: 18px; margin: 10px 0;">
        <strong>From:</strong> ${name} &lt;${email}&gt;
      </p>
      <p style="font-size: 18px; margin: 10px 0;">
        <strong>Message:</strong><br>
        <span style="display: block; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 5px; margin-top: 10px;">
          ${message}
        </span>
      </p>
    </div>
  
    <p style="font-size: 16px; margin-top: 20px;">
      Please respond to this inquiry within 24 hours.<br>
      <em>Sent via portfolio contact form</em>
    </p>
    
    <p style="margin-top: 40px;">
      Best regards,<br>
      <strong>Your Portfolio System</strong> 🤖
    </p>
  </div>
  `;

    if (!name || !email || !message) {
        return res.status(400).send({
            message: "Please fill all fields",
            success: false
        });
    }

    try {
        const newuser = new contact({ name, email, message });
        await newuser.save();
        
        await sendMail(
            email,
            `🎉 Welcome to my Portfolio - ${name}`,
            html
        );
        
        await sendMail(
            process.env.ADMIN_MAIL,
            `🎉 Hello sir-${name} tried reaching you`,
            toadminhtml
        );

        res.redirect("/contact");
        
    } catch (error) {
        return res.status(500).send({
            message: "Some error occurred",
            success: false,
            error: error.message
        });
    }
};

export { contactcontroller, saveusercontroller };