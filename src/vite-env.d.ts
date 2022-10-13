/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_FB_ApiKey: string
  readonly VITE_FB_authDomain: string
  readonly VITE_FB_projectId: string
  readonly VITE_FB_storageBucket: string
  readonly VITE_FB_messagingSenderId: string
  readonly VITE_FB_appId: string
  readonly VITE_FB_measurementId: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}