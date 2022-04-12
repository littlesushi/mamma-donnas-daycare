import { useCollection } from '../../hooks/useCollection'

// components
import Avatar from '../../components/Avatar'

export default function StudentList({ students }) {
    const { error, documents } = useCollection('users')

    return (
        <div className="user-list">
            <h2>All Users</h2>
            {error && <div className="error">{error}</div>}
            {documents && documents.map(user => (
                <div key={user.id}>
                    <span>{user.displayName}</span>
                    <Avatar src={user.photoUrl} />
                </div>
            ))}
        </div>
    )
}