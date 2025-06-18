import smtplib
import random
import string
from email.mime.text import MIMEText
# 
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SENDER_EMAIL = "bookgmmail22@gmail.com"
API_KEY = "ihgf odku keqs ygdo"
y7=0
def generate_token():
    return ''.join(random.choices(string.digits, k=6))

def send_verification_email(receiver_email):
    subject = "Email Verification"
    token=''.join(random.choices(string.digits, k=6))
    body = f"Your verification code is: {token}"
    
    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = SENDER_EMAIL
    msg['To'] = receiver_email
    
    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SENDER_EMAIL, API_KEY)
            server.sendmail(SENDER_EMAIL, receiver_email, msg.as_string())
        print("Verification email sent successfully!")
        print(token)
        return token
    except Exception as e:
        print(f"Failed to send verification email: {e}")
        return False
    
