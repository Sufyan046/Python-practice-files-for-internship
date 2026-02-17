
with open("sample.txt", "w") as file:
    file.write("Hello I am Mohammed Sufyan .\n")
    file.write("Python is easy to learn and rate myself 7 out of 10.\n")
    file.write("I am from Mysore , Karnataka.\n")
print("File created successfully!\n")
with open("sample.txt", "r") as file:
    content = file.read()

word = input("Enter the word to search: ")

count = content.lower().split().count(word.lower())
print(f"The word '{word}' appears {count} times in the file.")
