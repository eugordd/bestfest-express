mongo -- "$MONGO_INITDB_DATABASE" <<EOF
    rootUser = '$MONGO_INITDB_ROOT_USERNAME';
    rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
    adminDb = db.getSiblingDB('admin');
    adminDb.auth(rootUser, rootPassword);

    dbName = '$MONGO_INITDB_DATABASE';
    bestfestDb = db.getSiblingDB(dbName');
    bestfestUser = '$MONGO_BESTFESTDB_ROOT_USERNAME';
    bestfestPassword = '$MONGO_BESTFESTDB_ROOT_PASSWORD';
    bestfestDb.createUser({
      user: bestfestUser,
      pwd: bestfestPassword,
      roles: [{ role: 'readWrite', db: dbName}]
    })

    defaultUser = '$MONGO_DEFAULT_ADMIN_USERNAME'
    defaultPassword = '$MONGO_DEFAULT_ADMIN_PASSWORD'
    bestfestDb.admins.insertOne({
      username: defaultUser,
      password: defaultPassword,
      email: 'eugord@yandex.ru'
    });
EOF