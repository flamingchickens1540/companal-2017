from gmail import Gmail
import time

def run():
    g = Gmail()
    g.login("1540photo","robotics1540")
    emails = g.inbox().mail(unread=True)
    for email in emails:
        email.fetch()
        print email.subject
        subject = email.subject
        for attachment in email.attachments:
            try:
                subject = int(email.subject)
            except:
                break
            print 'Saving attachment: '+attachment.name
            print 'Size: ' +str(attachment.size) + 'KB'
            attachment.save('attachments/'+str(subject))
        email.read()
    g.logout()
while True:
    run()
    time.sleep(10)
