import { useAppData } from "@/data/hook/useAppData"
import { ButtonAlterTheme } from "./ButtonAlterTheme"
import { Title } from "./Title"
import { AvatarUser } from "./AvatarUser"


interface HeaderProps {
  title: string
  subtitle: string
}


export default function Header(props: HeaderProps) {
  const {theme, alterTheme} = useAppData()
  return (
    <div className="flex">
      <Title title={props.title} subtitle={props.subtitle} />
      <div className="flex flex-grow justify-end items-center">
        <ButtonAlterTheme theme={theme} alterTheme={alterTheme} />
        <AvatarUser className="ml-3" />
      </div>
    </div>
  )
}