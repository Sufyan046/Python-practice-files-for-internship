
numbers = [1,1,2,3,4,4,5,5,6,6,6]
duplicates = []
seen = set()
for num in numbers:
    if num in seen:
        if num not in duplicates:
            duplicates.append(num)
    else:
        seen.add(num)

print("Original List:", numbers)
print("Duplicate Elements:", duplicates)
