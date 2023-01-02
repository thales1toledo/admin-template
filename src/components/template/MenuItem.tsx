import Link from "next/link"

interface MenuitemProps {
    url?: string
    text: string
    icon: any
    className?: string
    onClick?: (event: any) => void
}

export default function MenuItem(props: MenuitemProps) {
    function renderizarLink() {
        return (
            <a className={`flex flex-col justify-center items-center 
            w-20 h-20 dark:text-gray-200 ${props.className}`}>
                {props.icon}
                <span className="text-xs font-light">{props.text}</span>
            </a>
        )
    }
    return (
        <li onClick={props.onClick} className="hover:bg-gray-300 dark:hover:bg-gray-800 cursor-pointer">
            {props.url ?
                (<Link legacyBehavior href={props.url}>
                    {renderizarLink()}
                </Link>)
                :
                (renderizarLink())
            }
        </li>
    )
}