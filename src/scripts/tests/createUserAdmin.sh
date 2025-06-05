curl -X POST \
     -H "Content-Type: application/json" \
     -d '{ "nickname": "admin", "email": "admin@example.com", "password": "admin123" }' \
     localhost:7777/api/user
