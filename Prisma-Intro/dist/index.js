"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const usersToCreate = [
    {
        username: "luffyM",
        password: "GomuGomu01",
        firstName: "Monkey",
        lastName: "D. Luffy",
    },
    {
        username: "zoroR",
        password: "ThreeSwords",
        firstName: "Roronoa",
        lastName: "Zoro",
    },
    {
        username: "namiN",
        password: "ClimaTact2",
        firstName: "Nami",
        lastName: "Cat Burglar",
    },
    {
        username: "usoppU",
        password: "SniperKing",
        firstName: "Usopp",
        lastName: "Sogeking",
    },
    {
        username: "sanjiS",
        password: "BlackLeg3",
        firstName: "Sanji",
        lastName: "Vinsmoke",
    },
    {
        username: "chopperT",
        password: "HitoHitoNo",
        firstName: "Tony Tony",
        lastName: "Chopper",
    },
    {
        username: "robinN",
        password: "Ohanami15",
        firstName: "Nico",
        lastName: "Robin",
    },
    {
        username: "frankyF",
        password: "Cyborg34F",
        firstName: "Franky",
        lastName: "Cutty Flam",
    },
    {
        username: "brookB",
        password: "SoulKing7",
        firstName: "Brook",
        lastName: "Humming",
    },
    {
        username: "jinbeJ",
        password: "Fishman88",
        firstName: "Jinbe",
        lastName: "Knight of the Sea",
    },
];
function insertUser(username, password, firstName, lastName) {
    return __awaiter(this, void 0, void 0, function* () {
        //Creating single user
        const res = yield prisma.user.create({
            data: {
                username,
                password,
                firstName,
                lastName
            }
        });
        console.log(res);
    });
}
//insertUser("Monkey D. Luffy", "300000", "Luffy", "Monkey");
function insertManyUser() {
    return __awaiter(this, void 0, void 0, function* () {
        //Creating many users
        const result = yield prisma.user.createMany({
            data: usersToCreate
        });
        console.log(result);
    });
}
// insertManyUser();
function readUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const allUsers = yield prisma.user.findMany();
        console.log(allUsers);
    });
}
//readUsers();
function readUsers1() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield prisma.user.findMany({
            where: {
                // id : 13
                // username : "frankyF",
                lastName: "Robin"
            }
        });
        console.log(result);
    });
}
readUsers1();
