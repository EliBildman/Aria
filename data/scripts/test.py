from random import randint

x = [0, 1, 2, 3, 4]

for i in range(100000):
    print x[randint(0, len(x) - 1)]
