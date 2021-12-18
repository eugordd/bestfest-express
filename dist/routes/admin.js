"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_1 = require("../controllers/admin");
const router = express_1.Router();
// POST /admin/login
router.post('/login', admin_1.adminLogin);
// POST /admin/register
router.post('/register', admin_1.adminRegister);
exports.default = router;
