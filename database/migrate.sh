#!/bin/sh

echo "Removing old database..."
rm fridge.db

echo "Applying schema..."
FILES=$(ls database/migration/*.sql)
for FILE in $FILES; do
    echo processing "$FILE"
    sqlite3 fridge.db < $FILE
done

echo "Populating tables..."
FILES=$(ls database/seed/*.sql)

for FILE in $FILES; do
    echo processing "$FILE"
    sqlite3 fridge.db < $FILE
done
