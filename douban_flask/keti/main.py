# coding=utf-8
import random

names = ['a', 'b', 'c', 'd', 'e', 'f', 'g']

offices = [[], [], []]

for name in names:
    offices[random.randint(0, 2)].append(name)

i = 1
for office in offices:
    print("第%d组有%d人" % (i,len(office)))
    i += 1
    for name in office:
        print(name, end="")
    print()
