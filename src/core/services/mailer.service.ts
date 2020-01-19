import { Injectable } from '@nestjs/common';

import { readFile } from 'fs';
import { createTransport } from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { compile } from 'handlebars';

@Injectable()
export class MailerService {
    constructor(private config: ConfigService) {}

    public readHTMLFile(path: string): Promise<any> {
        return new Promise((resolve, reject) => {
            readFile(path, {encoding: 'utf-8'}, (err, html) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(html);
                }
            });
        });
    }

    public createTransporter() {
        return createTransport({
            host: this.config.get('MAIL_HOST'),
            port: this.config.get('MAIL_PORT'),
            auth: {
              user: this.config.get('MAIL_USER'),
              pass: this.config.get('MAIL_PASSWORD'),
            },
        });
    }

    public async sendPasswordResetLink(email, link): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const transporter = await this.createTransporter();
                const html = await this.readHTMLFile(join(__dirname, '../..', 'common/templates/password-reset.html'));
                const template = compile(html);
                const replacements = {
                    action_url: link,
                };
                const htmlToSend = template(replacements);
                const mailOptions = {
                    from: 'test@api.com',
                    to : email,
                    subject : 'password reset',
                    html : htmlToSend,
                 };
                await transporter.sendMail(mailOptions);
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    }
}
