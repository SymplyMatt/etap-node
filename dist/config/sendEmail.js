"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function sendEmail(emailOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        const host = process.env.SMTP_HOST;
        const user = process.env.SMTP_EMAIL;
        const pass = process.env.SMTP_PASSWORD;
        const from = user;
        if (!host || !user || !pass || !from) {
            console.error('Missing required environment variables');
            return;
        }
        try {
            const transporter = nodemailer_1.default.createTransport({
                host,
                port: 465,
                secure: true,
                auth: {
                    user,
                    pass,
                },
            });
            const info = yield transporter.sendMail({
                from: from,
                to: emailOptions.to.join(','),
                subject: emailOptions.subject,
                html: emailOptions.html,
                text: emailOptions.text,
            });
            console.log(info);
        }
        catch (error) {
            console.error('Error occurred while sending email:', error);
        }
    });
}
exports.sendEmail = sendEmail;
