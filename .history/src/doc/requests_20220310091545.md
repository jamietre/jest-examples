# Sample requests for interacting with service

curl -X POST http://localhost:3000/reg -H 'content-type: application/json' \
 -d '{ "carId": "tesla-model-3", "owner": "elon musk", "vin": "111", }'

curl -X GET http://localhost:3000/reg/bebab66c-8575-41cb-9d3a-9986637bff2c

curl -X GET http://localhost:3000/reg/all
