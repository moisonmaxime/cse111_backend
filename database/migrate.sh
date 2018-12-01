#!/bin/sh

# psql -f $FILE -d $DB
DB=$"postgres://hulxdpyzfkowpi:0330c72eab9e57090e7afdb934c4ffec01934ad41d3f837bdad82c6b6c57de3b@ec2-54-204-40-248.compute-1.amazonaws.com:5432/duh4gc86mstpp"

echo "Dropping schema..."
psql -c "DROP SCHEMA public CASCADE;" -d $DB

echo "Initializing schema..."
psql -c "CREATE SCHEMA public;" -d $DB

echo "Applying schema..."
FILES=$(ls database/migration/*.sql)
for FILE in $FILES; do
    echo processing "$FILE"
    psql -f $FILE -d $DB
done

echo "Populating tables..."
FILES=$(ls database/seed/*.sql)

for FILE in $FILES; do
    echo processing "$FILE"
    psql -f $FILE -d $DB
done
