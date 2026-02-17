
with open("numbers.txt", "w") as file:
    for i in range(1, 21):
        file.write(str(i) + " ")

print("File created successfully!")

with open("numbers.txt", "r") as file:
    content = file.read()

numbers = list(map(int, content.split()))

even = []
odd = []

for num in numbers:
    if num % 2 == 0:
        even.append(num)
    else:
        odd.append(num)

print("Even Numbers:", even)
print("Odd Numbers:", odd)


word = input("Enter a word/number to search: ")

with open("numbers.txt", "r") as file:
    data = file.read()

count = data.count(word)

print(f"'{word}' appears {count} times in the file.")
