import { Router } from "express";
import { Resend } from "resend";
import "dotenv/config";

const router = Router();

// Resend config
const resend = new Resend(process.env.RESEND_KEY);

// Default route
router.get("/", (req, res) => {
    res.status(200).json({data:{message: "Hello! This is the API's endpoint for mailing service..."}})
})

// Email send route
router.post("/send-email" , async (req, res) => {
    const { body } = req;

    const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: ["agu.musumeci@gmail.com"],
        subject: "New Portfolio Message!",
        html: `
        <body style="padding:20px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; background-color: pink;">
                <article>
                    <h3 style="font-weight: 500;">New Portfolio message from:</h3>
                    <p style="margin-top: -10px; color:#222222; font-weight:400;">
                        <span style="font-weight:500;">Name:</span> 
                        ${body.name}
                    </p>

                    <p style="margin-top: -10px; color:#222222; font-weight:400;">
                        <span style="font-weight:500;">Email:</span> 
                        ${body.email}
                    </p>

                    <p style="margin-top: -10px; color:#222222; font-weight:400;">
                        <span style="font-weight:500;">Message:</span>
                        ${body.message}
                    </p>
                </article>

                <br />
            </main>
        </body>
        `
    }) 

    if (error) {
        return res.status(400).json({error})
    }

    res.status(200).json({data:{...data, message:"Your message has been successfully sent!"}})
})

export default router;