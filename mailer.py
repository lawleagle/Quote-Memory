import os, smtplib, logging
from queue import Queue
from threading import Thread
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders

from header import logger


email_provider = 'smtp.gmail.com'
email_provider_port = 587
email_login_address = 'quote.memory@gmail.com'
email_login_password = '123quote.memory123'


class Mailer():
    q = Queue()
    _initialized = False

    @staticmethod
    def init():
        if Mailer._initialized == True: return
        Mailer._initialized = True
        thread = Thread(target = Mailer.worker)
        thread.start()

    @staticmethod
    def worker():
        while True:
            mail_entry = Mailer.q.get()
            to_address = mail_entry[0]
            content = mail_entry[1]

            logger.info('Composing mail to: {}'.format(to_address))
            mail_server = smtplib.SMTP(email_provider, email_provider_port)
            mail_server.ehlo()
            mail_server.starttls()
            mail_server.login(email_login_address, email_login_password)
            mail_server.sendmail(email_login_address, to_address, content)
            mail_server.close()

            Mailer.q.task_done()

    @staticmethod
    def send_mail(to_address, subject, content, Files = None):
        Mailer.init()
        logger.info('Adding mail to mailing queue for address: {}'.format(to_address))

        wrapped_content = '''\
Subject: {}
        
{}
'''.format(subject, content)
    
        Mailer.q.put((to_address, wrapped_content, Files))


    @staticmethod
    def send_mail_with_attachment(to_address, Subject, Text, attachment_path = None):
        logger.info('Sending mail with attachment. For now, this type of sending is just a test, and it is not asyncron.')
        message = MIMEMultipart()

        message['From'] = email_login_address
        message['To'] = to_address
        message['Subject'] = Subject

        message.attach(MIMEText(Text))

        if attachment_path != None:
            Path = os.path.dirname(os.path.abspath(__file__)) + '\\' + attachment_path
            if os.path.isfile(Path):
                print('Loading file from: ', Path)
                part = MIMEBase('application', 'octet-stream')
                part.set_payload(open(Path, 'rb').read())
                encoders.encode_base64(part)
                part.add_header('content-Disposition',
                                'attachment; filename = "{}"'.format(Path))
                message.attach(part)

        mail_server = smtplib.SMTP(email_provider, email_provider_port)
        mail_server.ehlo()
        mail_server.starttls()
        mail_server.login(email_login_address, email_login_password)
        mail_server.sendmail(email_login_address, to_address, message.as_string())
        mail_server.close()
