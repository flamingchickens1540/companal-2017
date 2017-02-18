from gmail import Gmail
import time, os

def run():
    g = Gmail()
    g.login("1540photo","robotics1540")
    emails = g.inbox().mail(unread=True)
    for email in emails:
        email.fetch()
        subject = email.subject
        for attachment in email.attachments:
            try:
                subject = int(email.subject)
            except:
                break
            subject = str(subject)
            if subject[-4:]=="jpeg":
                subject=subject[:-4]+"jpg"
            exists = True
            num = 1
            while exists:
                if os.path.isfile("../../../Dropbox/1540_Photos/"+"0"+str(num)+"-"+str(subject)+".jpg"):
                    num+=1
                else:
                    exists = False
            if num<10:
                num="0"+str(num)
            else:
                num=str(num)
            print 'Saving attachment: '+attachment.name
            print 'Size: ' +str(attachment.size) + 'KB'
            attachment.save('../../../Dropbox/1540_Photos/'+num+"-"+str(subject)+".jpg")
        email.read()
    g.logout()
while True:
    run()
    time.sleep(10)
