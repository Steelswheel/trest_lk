export function Wrap(
    {
        label, 
        description,
        component,
        template
    } : {
        label: string,
        description: string,
        component: JSX.Element | undefined,
        template: string
    }
) {
    return (
        <div className="wrap-item border-bottom border-1 border-gray-400">
            <div className="wrap-item-label bg-secondary p-3 border-end border-1 border-gray-400">
                <div className="d-flex align-items-center h-100">
                    <div>
                        <div className="fw-bold">
                            {label}
                        </div>
                        {description && <div>{description}</div>}
                    </div>
                </div>
            </div>
            <div className="wrap-item-input p-3">
                <div className={template === 'flex' ? 'd-flex align-items-end h-100' : ''}>
                    {component}
                </div>
            </div>
        </div>
    )
}