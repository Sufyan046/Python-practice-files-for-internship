
def person_lister(func):
    def inner(people):
        people.sort(key=lambda x: int(x[2]))
        
        return [func(person) for person in people]
    return inner


@person_lister
def name_format(person):
    title = "Mr." if person[3] == "M" else "Ms."
    return f"{title} {person[0]} {person[1]}"
n = int(input())
people = [input().split() for _ in range(n)]
for name in name_format(people):
    print(name)
