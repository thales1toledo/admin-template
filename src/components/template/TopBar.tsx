import useAppData from "../../data/hook/useAppData"
import AvatarUser from "./Avatar"
import SwitchThemeButton from "./SwitchThemeButton"
import Title from "./Title"

interface TopbarProps {
    title: string
    subtitle: string
}

export default function Topbar(props: TopbarProps) {
    
    const {tema, alternarTema} = useAppData()
    
    return (
        <div className={`flex`} >
            <Title title={props.title} subtitle={props.subtitle} />
            <div className={`flex flex-grow justify-end items-center`}>
                <SwitchThemeButton tema={tema} alternarTema={alternarTema} />
                <AvatarUser className="ml-5" />
            </div>
        </div>
    )
}