import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
    },
});

export async function POST(req: NextRequest) {
    const { name, email, message } = await req.json();

    try{
        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER, 
            subject: `Contact Us`,
            text: `From: ${name} \nEmail: ${email} \n\n${message}`,
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: 'Email sent successfully.' }, { status: 200 });

    }
    catch (error) {
        console.error('Error sending the mail:', error);
        return NextResponse.json({ message: 'Email sent unsuccessful.' }, { status: 500 });
    }
};
