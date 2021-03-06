#isbn, language, name, year
#AUTHOR
#!/usr/bin/env python
import os.path

# Define a filename.
filename = "book.csv"

if not os.path.isfile(filename):
  print('File does not exist.')
else:
# Open the file as f.
# The function readlines() reads the file.
  
  with open(filename) as f:
    content = f.read().splitlines()

# Show the file contents line by line.
# We added the comma to print single newlines and not double newlines.
# This is because the lines contain the newline character '\n'.
fout = open("bookInfo_data.csv", "a")
for line in content:
  #print(line.split(',')[8])
  name  = line.split(',')[1]
  isbn13  = line.split(',')[8]
  date  = line.split(',')[13]
  fout.write(name)#name
  fout.write(',')
  fout.write(isbn13)#isbn
  fout.write(',')
  fout.write(date)#publish date
  #fout.write(',')
  fout.write('\n')

f.close()

#open and read the file after the appending:
