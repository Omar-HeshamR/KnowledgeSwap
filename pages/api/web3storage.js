import { Web3Storage } from 'web3.storage'

function getAccessToken () {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY2NTAwYzhjNmQyNjAzRDBiMjA3Qjc1MTdiMzUwOGU4ZTJDOEI0NzkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njk2ODc5MjYxMjcsIm5hbWUiOiJLUyBkZW1vIn0.Ud0YxkS5V9CpfFe8FYXRuarO1on5MwpjtunDZ5_XkOo'

  // In a real app, it's better to read an access token from an
  // environement variable or other configuration that's kept outside of
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
//   return process.env.WEB3STORAGE_TOKEN
}

export default function makeStorageClient () {
  return new Web3Storage({ token: getAccessToken() })
}