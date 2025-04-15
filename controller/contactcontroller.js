import contact from '../model/contactmodel.js';

const contactcontroller=(req,res)=>{
    res.render('contact.ejs',{"title":"contact page"})
}

const saveusercontroller = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send({
            message: "Please fill all fields",
            success: false
        });
    }

    try {
        const newuser = new contact({ name, email, message });
        await newuser.save();
        res.redirect("/contact")
        
        
    } catch (error) {
        return res.status(500).send({
            message: "Some error occurred",
            success: false,
            error: error.message
        });
    }
};



export {contactcontroller,saveusercontroller}