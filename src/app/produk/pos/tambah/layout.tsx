export default function Layout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>
        <body>
            <main>{children}</main>
        </body>
        </>
    )
}