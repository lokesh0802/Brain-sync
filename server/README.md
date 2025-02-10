npm init -y 
npm install typescript
npx tsc --init
Change rootDir and outDir in tscongif.json
"rootDir": "./src",
"outDir": "./dist"
make a src folder-> index.ts
npm install express
import express from "express" ->here get error (declaration file for module express) measn there  is no file .d.ts so when we see express code in npm we say code is written in js not ts so later express ppl write types and expoer library
npm install @type/express

---in mongoose already declartion file there
npm install mongoose
---jwt
npm install jsonwebtoken
again same error
so can write -> npm install @types/jsonwebtoken


