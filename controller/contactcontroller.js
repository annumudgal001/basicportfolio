import contact from '../model/contactmodel.js';
import { sendMail } from '../helpers/sendmail.js';

const contactcontroller = (req, res) => {
    res.render('contact.ejs', { title: 'contact page' });
};

const saveusercontroller = async (req, res) => {
    const myemail = 'akshitmudgal001@gmail.com';
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
        text-align: center;
        border-radius: 10px;
      ">
      <h1 style="font-size: 36px;">🎉 Welcome, Annu-Mudgal Sir ! 🎉</h1>
      <p style="font-size: 18px;">
        ${name} just visited your portfolio site. 💼 <br/>
        EMAIL-${email} <br>
        MESSAGE-${message}
         appreciate their message and get back to them ASAP. 📩
      </p>
      <p style="margin-top: 30px;">
        Best regards,<br/>
        <strong>Annu Mudgal</strong> ✨
      </p>
    </div>
    `;

    if (!name || !email || !message) {
        req.flash('error', 'Please fill all fields');
        return res.redirect('/contact');
    }

    try {
        const newuser = new contact({ name, email, message });
        await newuser.save();
        await sendMail(email, `🎉 Welcome to my Portfolio - ${name}`, html);
        await sendMail(myemail, `🎉 Hello sir`, toadminhtml);
        
        req.flash('success', 'Your message has been sent successfully!');
        res.redirect('/contact');
    } catch (error) {
        req.flash('error', 'An error occurred while sending your message');
        res.redirect('/contact');
    }
};

export { contactcontroller, saveusercontroller };