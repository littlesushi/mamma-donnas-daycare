// styles
import './TaskFilter.css'

const filterList = ['all', 'breathing checks', 'diaper change', 'on-site', 'messaging', 'announcements', 'accounting', 'invoicing']

export default function TaskFilter({ currentFilter, changeFilter }) {
    

    const handleClick = (newFilter) => {
        changeFilter(newFilter)
    }

    return (
        <div className="project-filter">
            <nav>
                <p>Filter by:</p>
                {filterList.map((f) => (
                    <button key={f}
                        onClick={() => handleClick(f)}
                        className={currentFilter === f ? 'active' : ''}
                    >
                        {f}
                    </button>
                ))}
            </nav>
        </div>
    )
}