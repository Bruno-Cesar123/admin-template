import { ReactNode } from "react"
import Image from 'next/image'
import Head from 'next/head'
import router from 'next/router'
import loading from '../../public/images/loading.gif'
import { useAuth } from "@/data/hook/useAuth"



export function forcedAuthentication(jsx: ReactNode) {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user, isLoading } = useAuth()

  function renderContent() {
    return (
      <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if(!document.cookie?.includes("admin-template-auth")) {
                window.location.href = "/authentication"
              }
            `
          }}
        />
      </Head>
        {jsx}
      </>
    )
  }

  function renderLoading() {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src={loading} alt="imagem de carregando a tela" />
      </div>
    )
  }

  if(!isLoading && user?.email) {
    return renderContent()
  } else if(isLoading) {
    return renderLoading()
  } else {
    router.push('/authentication')
    return null
  }
}