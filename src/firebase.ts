import admin from 'firebase-admin'
import { env } from './env'

const serviceAccount = env.FIREBASE_ADMIN

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(serviceAccount))
  })

  console.log('Firebase initialized')
}

const auth = admin.auth()

export { auth }