import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//      All Instructions to run prisma
/*
npm init -y
npm install prisma typescript ts-node @types/node --save-dev
npx tsc --init
Change `rootDit` to `src`
Change `outDir` to `dist`
npx prisma init

Generate migrations
npx prisma migrate dev --name Initialize the schema

How to generate the client?
npx prisma generate

How to run ??
npx tsc -b 
node dist/index.js
*/



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

//CREATE

async function insertUser(username: string, password: string, firstName: string, lastName: string) {
    //Creating single user
    const res = await prisma.user.create({
        data: {
            username,
            password,
            firstName,
            lastName
        }
    })
    console.log(res);
}

//insertUser("Monkey D. Luffy", "300000", "Luffy", "Monkey");



async function insertManyUser() {
    //Creating many users
    const result = await prisma.user.createMany({
        data: usersToCreate
    })
    console.log(result);

}

// insertManyUser();

//READ

async function readUsers() {
    const allUsers = await prisma.user.findMany();
    console.log(allUsers);
}
//readUsers();

async function readUsers1() {
    const result = await prisma.user.findMany({
        where: {
            // id : 13
            // username : "frankyF",
            lastName: "Robin"
        }
    })
    console.log(result);

}
//readUsers1();

interface UpdateParams {
    firstName: string;
    lastName: string
}

async function updateUser(username: string, {
    firstName,
    lastName
}: UpdateParams) {
    const result = await prisma.user.update({
        where: { username },
        data: {
            firstName,
            lastName
        }
    })
    console.log(result);
}

/* updateUser("jinbeJ" , {
    firstName : "random",
    lastName : "user"
}) */

    async function insertTodos(){
        await prisma.todos.create({
            data : {
                title : "Worlds best swordsman",
                description : "Loyal",
                user_id : 5
            }
        })
    }

    insertTodos();