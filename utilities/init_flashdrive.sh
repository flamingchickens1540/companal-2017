#!/bin/bash

#(C) 2017 Ryan Selden
#This should be run on a Macintosh computer only.

cd /Volumes/1540 || exit
rm -rf /Volumes/1540/companal

mkdir companal
cd companal
mkdir stand-scouting
cd stand-scouting
echo "[]">manifest.json
cd ..
mkdir pit-scouting
cd pit-scouting
echo "[]">manifest.json
cd ..
mkdir tournament
mkdir output
cd output/
mkdir stand-scouting
mkdir pit-scouting
mkdir tournament

cd ../..
echo "This is the property of team 1540. We would be grateful if you could return it. Please call Ryan at (503) 828-4225. Thank you!!!" > PLEASE_RETURN.txt

cd
diskutil unmount /Volumes/1540