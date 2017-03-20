#!/usr/bin/python

#Don't judge this code, I am on a plane and I don't have internet so I can't look up any documentation.

filename = raw_input("CSV Filename:")

content = open(filename).read()

teams = []

for line in content.split('\n'):
	vals = line.split(',')
	rank = vals.pop(0)
	teamNumber = vals.pop(0)
	notes = ','.join(vals)
	realNotes = ''
	for char in notes:
		if 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_!@#$%^&*()=+/?.,<>~`|{}[] '.count(char) > 0:
			realNotes += char
	teams.append({"rank": rank, "teamNumber": teamNumber, "notes": realNotes})

import json
print json.dumps(teams)