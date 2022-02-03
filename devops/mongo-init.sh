mongo -- "$MONGO_INITDB_DATABASE" <<EOF
    db = db.getSiblingDB('bestfest');
    username = '$MONGO_DEFAULT_ADMIN_USERNAME'
    password = '$MONGO_DEFAULT_ADMIN_PASSWORD'
    db.admin.insertOne({ username: username, password: password, email: 'eugord@yandex.ru' });
EOF