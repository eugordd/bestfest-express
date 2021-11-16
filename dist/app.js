"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = __importDefault(require("./config/config"));
const artist_1 = __importDefault(require("./routes/artist"));
const festival_1 = __importDefault(require("./routes/festival"));
const genre_1 = __importDefault(require("./routes/genre"));
const main_1 = __importDefault(require("./routes/main"));
const admin_1 = __importDefault(require("./routes/admin"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    return next();
});
app.use('/artists', artist_1.default);
app.use('/festivals', festival_1.default);
app.use('/genres', genre_1.default);
app.use('/admin', admin_1.default);
app.use('/', main_1.default);
app.use(errorHandler_1.default);
// DB CONNECT
const mongoHost = config_1.default.database.host;
const dbName = config_1.default.database.name;
mongoose_1.default.connect(`mongodb://${mongoHost}:27017/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    app.listen(8080);
})
    .catch(err => console.log(err));
