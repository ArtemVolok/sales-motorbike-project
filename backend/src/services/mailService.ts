// eslint-disable-next-line import/no-extraneous-dependencies
import nodemailer from 'nodemailer';
import { ProfileUserModel } from '../schema/ProfileUser/profileUser';
import { host, port, frontendUrl, mailPassword, mailUser } from '../constants';

interface IMailService {
  to: string;
  link: string;
}

interface IActivated {
  activationLink: string;
}

export const sendActivationEmail = async ({ to, link }: IMailService) => {
  if (!host || !port || !mailUser || !mailPassword) {
    throw new Error('Error in mail data');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
      user: mailUser,
      pass: mailPassword,
    },
  });

  try {
    await transporter.sendMail({
      from: mailUser,
      to,
      subject: 'Активація аккаунту на ' + frontendUrl,
      text: '',
      html: `
        <div>
          <h1>Для активації аккаунту перейдіть за посиланням нижче:</h1>
          <a href="${link}">${link}</a>
        </div>
      `,
    });
  } catch (error) {
    console.log(`Nodemailer error sending email to ${mailUser}`, error);
  }
};

export const activateUserAccount = async ({ activationLink }: IActivated) => {
  const user = await ProfileUserModel.findOne({ activationLink });

  if (!user) {
    return null;
  }

  const updateUser = await ProfileUserModel.updateOne(
    { activationLink },
    { isActivated: true },
  );
  return updateUser;
};
