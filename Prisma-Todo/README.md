#### What is the Project :- 
## Try creating a todo application that let's a user signup, put todos and fetch todos.
## Use
## 1. Typescript as the language
## 2. Prisma as the ORM
## 3. Postgres as the database
## 4. Zod as validation library

### Project setup :-

`npm init -y`
`npm install prisma typescript ts-node @types/node --save-dev`
`npx tsc --init`

### Change `rootDit` to `src`
### Change `outDir` to `dist`

`npx prisma init`

## Generate migrations
`npx prisma migrate dev --name Initialize the schema`

## How to generate the client?
`npx prisma generate`

## How to run ??
`npx tsc -b `
`node dist/index.js`
