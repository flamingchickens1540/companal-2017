### Supports .jpg .png .gif

from gmail import Gmail
import time, os

def containsNumber(string):
    return any(char.isdigit() for char in string)

def login(g):
    try:
        g.login("1540photo","robotics1540")
    except:
        time.sleep(500)
        login(g)
def run():
    g = Gmail()
    login(g)
    emails = g.inbox().mail(unread=True)
    for email in emails:
        email.fetch()
        subject = email.subject
        for attachment in email.attachments:
            if attachment.name[-5:]==".tiff" or attachment.name[-4:]==".jp2":
                print "An image was received without a proper format."
            else:
                try:
                    subject = int(email.subject)
                except:
                    if not containsNumber(subject):
                        print "An email was received without a proper subject."
                        break
                    else:
                        foundNum = False
                        newSubject = ""
                        for c in subject:
                            c = str(c)
                            if c.isdigit():
                                newSubject=newSubject+c
                                foundNum = True
                            elif foundNum == True:
                                break
                        subject=newSubject
                subject = str(subject)
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
                print 'Saving attachment: '+num+"-"+str(subject)
                print 'Size: ' +str(attachment.size) + 'KB'
                attachment.save('../../../Dropbox/1540_Photos/Z-'+num+"-"+str(subject)+".jpg")
                attachment.save('../../../Dropbox/All_Photos/'+num+"-"+str(subject)+".jpg")
        email.read()
    g.logout()
while True:
    run()
    time.sleep(10)
