
// children 用 React.ReactNode
export function UserListContainer({children}: {children: React.ReactNode}) {
    return (
    <div style={{marginTop: 20}}>
        {children}
    </div>
    )
}