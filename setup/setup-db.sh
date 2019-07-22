mongoimport -d hackweek -c property --type csv --file server/property-service/data/properties_2016.csv --headerline
mongoimport -d hackweek -c sales --type csv --file server/score-service/data/train_2016_v2.csv --headerline
