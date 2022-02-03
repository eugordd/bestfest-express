mongo -- "$MONGO_INITDB_DATABASE" <<EOF
    rootUser = '$MONGO_INITDB_ROOT_USERNAME';
    rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
    adminDb = db.getSiblingDB('admin');
    adminDb.auth(rootUser, rootPassword);

    bestfestDb = db.getSiblingDB('bestfest');
    username = '$MONGO_DEFAULT_ADMIN_USERNAME'
    password = '$MONGO_DEFAULT_ADMIN_PASSWORD'
    bestfestDb.admin.insertOne({ username: username, password: password, email: 'eugord@yandex.ru' });
EOF