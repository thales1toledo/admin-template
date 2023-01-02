import Image from "next/image";
import Link from "next/link";
import useAuth from "../../data/hook/useAuth";

interface AvatarUserProps {
    className?: string
}

export default function AvatarUser(props: AvatarUserProps) {
    const { usuario } = useAuth()
    return (
        <Link href='/perfil'>
            {/* <img
                className={`h-10 rounded-full cursor-pointer ${props.className}`}
                src={usuario?.imagemUrl ?? '/images/avatar.svg'}
                alt="AvatarUser"
            /> */}
            <Image height={40} width={40} className={`h-10 rounded-full cursor-pointer ${props.className}`} src={'/images/avatar.svg'} alt="AvatarUser" />


        </Link>
    )
}