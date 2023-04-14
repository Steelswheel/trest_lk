import { IGridEdzRow } from '../../../../interface/Interface';

export function Comments({value}: {value: IGridEdzRow['COMMENTS']}) {
    function switchVisibility(event: React.MouseEvent) {
        event.currentTarget.classList.contains('hidden') ? event.currentTarget.classList.remove('hidden') : event.currentTarget.classList.add('hidden');
    }

    return (
        <div className="edz-list-comments">
            {value.map((item, index) => (
                <div 
                    key={`edz-list-comment-${index}`} 
                    className="edz-list-comments-item hidden"
                    onClick={switchVisibility}
                >
                        {item}
                </div>
            ))}
        </div>
    );
}