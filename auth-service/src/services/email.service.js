const nodemailer = require('nodemailer');
const { Resend } = require('resend');

class EmailService {
    constructor() {
        if (process.env.RESEND_API_KEY) {
            console.log('Używam Resend do wysyłania emaili');
            this.resend = new Resend(process.env.RESEND_API_KEY);
            this.useResend = true;
        } else {
            if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
                console.warn('UWAGA: Zmienne EMAIL_USER lub EMAIL_PASSWORD nie są ustawione!');
                console.warn('Wysyłanie emaili nie będzie działać.');
            }

            console.log('Konfiguracja email:', {
                host: process.env.EMAIL_HOST || 'smtp.gmail.com',
                port: process.env.EMAIL_PORT || 587,
                user: process.env.EMAIL_USER ? '***' + process.env.EMAIL_USER.slice(-10) : 'BRAK',
                hasPassword: !!process.env.EMAIL_PASSWORD
            });

            this.transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST || 'smtp.gmail.com',
                port: process.env.EMAIL_PORT || 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD
                }
            });
            this.useResend = false;
        }
    }

    async sendPasswordResetEmail(email, resetToken) {
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        
        if (this.useResend) {
            try {
                await this.resend.emails.send({
                    from: 'onboarding@resend.dev',
                    to: email,
                    subject: 'Resetowanie hasła',
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <h2>Resetowanie hasła</h2>
                            <p>Otrzymaliśmy prośbę o zresetowanie hasła do Twojego konta.</p>
                            <p>Kliknij poniższy link, aby zresetować hasło:</p>
                            <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
                                Zresetuj hasło
                            </a>
                            <p>Link jest ważny przez 1 godzinę.</p>
                            <p>Jeśli nie prosiłeś o reset hasła, zignoruj tę wiadomość.</p>
                            <p style="color: #666; font-size: 12px; margin-top: 30px;">
                                Możesz też skopiować poniższy link do przeglądarki:<br>
                                ${resetLink}
                            </p>
                        </div>
                    `
                });
                console.log(`Email resetowania hasła wysłany do: ${email} (Resend)`);
                return true;
            } catch (error) {
                console.error('Błąd wysyłania emaila przez Resend:', error);
                throw new Error(`Nie udało się wysłać emaila: ${error.message}`);
            }
        } else {
            const mailOptions = {
                from: process.env.EMAIL_FROM,
                to: email,
                subject: 'Resetowanie hasła',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2>Resetowanie hasła</h2>
                        <p>Otrzymaliśmy prośbę o zresetowanie hasła do Twojego konta.</p>
                        <p>Kliknij poniższy link, aby zresetować hasło:</p>
                        <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
                            Zresetuj hasło
                        </a>
                        <p>Link jest ważny przez 1 godzinę.</p>
                        <p>Jeśli nie prosiłeś o reset hasła, zignoruj tę wiadomość.</p>
                        <p style="color: #666; font-size: 12px; margin-top: 30px;">
                            Możesz też skopiować poniższy link do przeglądarki:<br>
                            ${resetLink}
                        </p>
                    </div>
                `
            };

            try {
                await this.transporter.sendMail(mailOptions);
                console.log(`Email resetowania hasła wysłany do: ${email}`);
                return true;
            } catch (error) {
                console.error('Błąd wysyłania emaila:', error);
                console.error('Szczegóły błędu:', {
                    message: error.message,
                    code: error.code,
                    response: error.response,
                    responseCode: error.responseCode
                });
                throw new Error(`Nie udało się wysłać emaila: ${error.message}`);
            }
        }
    }
}

module.exports = new EmailService();
