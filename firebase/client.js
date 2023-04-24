import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyABoZ1X_PjhUSBLuMy6M1q_ydE0jMyO__I',
  authDomain: 'twitter-clone-6598b.firebaseapp.com',
  projectId: 'twitter-clone-6598b',
  storageBucket: 'twitter-clone-6598b.appspot.com',
  messagingSenderId: '455618641113',
  appId: '1:455618641113:web:23b4ee2b899de792f8d2c8'
}

const app = initializeApp(firebaseConfig)

export const storage = getStorage(app)
