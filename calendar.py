import datetime

day, month, year = map(int, input().split())

date = datetime.date(year, month, day)
print(date.strftime("%A").upper())
