
interface Title {
    title: string
    subtitle: string
}

export default function Title(props: Title) {
    return (
        <div>
            <h1 className="font-black text-3xl text-gray-900 dark:text-gray-100">
                {props.title}
            </h1>
            <h2 className="font-light text-sm text-gray-600 dark:text-gray-200">
                {props.subtitle}
            </h2>
        </div>
    )
}