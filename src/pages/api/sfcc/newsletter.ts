import { NextApiRequest, NextApiResponse } from "next";
import { middlewareConfig } from "@utils/sfcc-connector/config";
import { sendEmail } from "@utils/helpers/emailHelper";
const newsletterAPI = middlewareConfig.parameters.api + '/newsletter';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const requestMethod = req.method;
    const body = req?.body !== "" ? JSON.parse(req?.body) : null;
    const query = req.query.api ?? "";
    const action = req.query.action ?? "";

    switch (query) {
        case "newsletter":
            try {
                if (requestMethod === "POST" && action === "subscription") {
                    const { email, isSubscribed } = body;
                    /* TODO: The below code is for mulesoft API integration - upsert API
                    const options = {
                        method: requestMethod,
                        headers: {
                            'Content-Type': 'application/json',
                            'client_id': middlewareConfig.parameters.client_id,
                            'client_secret': middlewareConfig.parameters.client_secret,
                            'storeCode': middlewareConfig.parameters.storeCode,
                            'x-correlation-id': middlewareConfig.parameters.x_correlation_id,
                        },
                        body: JSON.stringify({
                            email: email,
                            isSubscribed: isSubscribed,
                            source: middlewareConfig.parameters.source,
                        }),
                    };

                    const response = await fetch(newsletterAPI, options);
                    const result = await response.json();

                    if (!response.ok) {
                        console.log("Newsletter request submission failed.");
                        return res.status(400).json({ isError: true, response: result });
                    }
                    
                    if (result.message === "success" && result.code === 200) {
                        // console.log("newsletter : " + JSON.stringify(result, null, 4));

                        // send email - nodemailer
                        var emailInfo : any;
                        if (isSubscribed) { // subscribed email
                            const subject = "Seddiqi Newsletter Communication";
                            const htmlContent = "You have been successfully subscribed to Seddiqi newsletter.";
                            emailInfo = await sendEmail(email, subject, htmlContent);
                        } else { // unsubscribed email
                            const subject = "Seddiqi Newsletter Communication";
                            const htmlContent = "You have been successfully unsubscribed to our newsletter on Seddiqi.";
                            emailInfo = await sendEmail(email, subject, htmlContent);
                        }
                        if (emailInfo.success) {
                            console.log("Email sent successfully");
                        } else {
                            console.log("Email failed");
                        }
                        return res.status(200).json({ isError: false, response: result, email: emailInfo });
                    } else {
                        console.log("Subscription Failed.");
                        return res.status(400).json({ isError: true, response: "Subscription Failed." });
                    }*/

                    // send email - nodemailer
                    var emailInfo : any;
                    if (isSubscribed) { // subscribed email
                        const subject = "Seddiqi Newsletter Communication";
                        const htmlContent = "You have been successfully subscribed to Seddiqi newsletter.";
                        emailInfo = await sendEmail(email, subject, htmlContent);
                    } else { // unsubscribed email
                        const subject = "Seddiqi Newsletter Communication";
                        const htmlContent = "You have been successfully unsubscribed to our newsletter on Seddiqi.";
                        emailInfo = await sendEmail(email, subject, htmlContent);
                    }
                    if (emailInfo.success) {
                        console.log("Email sent successfully");
                    } else {
                        console.log("Email failed");
                    }
                    return res.status(200).json({ isError: false, response: emailInfo  });
                }

            } catch(err) {
                console.error(err);
      
                return {
                    statusCode: 500,
                    body: JSON.stringify({ msg: err }),
                };
            }
        break;
        default:
            return res.status(400).json({ isError: true });
    }
}

export default handler;
