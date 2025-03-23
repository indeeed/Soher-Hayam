import express from "express"
import { api } from "./api.js"
import session from "cookie-session"
import { remult } from 'remult'
import { Country } from '../shared/Country'

const app = express()

app.use(
    session({
      secret: process.env["SESSION_SECRET"] || "my secret"
    })
  )
app.use(api)




// הפעלת השרת ויצירת משתמש ברירת מחדל
app.listen(3010, async () => {
  console.log("Server started on http://localhost:3010")
})