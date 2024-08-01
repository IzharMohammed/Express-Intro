# Reference to Article :- 
`https://projects.100xdevs.com/tracks/gZf9uBBNSbBR7UCqyyqT/prisma-1`


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
