#!/bin/sh

# psql -f $FILE -d fridge

if [ -f "fridge.db" ]; then
    echo "Removing old database..."
    rm fridge.db
fi

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
