import Earthview.run
import WallpaperReddit.run
import Poems.run
import METPaintings.run
import urllib2
from random import randint
import time

num_pics = 5

mods = [Earthview.run, WallpaperReddit.run, Poems.run, METPaintings.run]

def internet_on():
    try:
        urllib2.urlopen('http://www.google.com', timeout=1)
        return True
    except:
        return False

tries = 0

while (not internet_on()) and tries < 5:
    print "No connection, trying again in 10 seconds"
    time.sleep(10)
    tries += 1


if internet_on():
    mods[randint(0, len(mods) - 1)].generate(num_pics)
else:
    print "Failed lmao"
