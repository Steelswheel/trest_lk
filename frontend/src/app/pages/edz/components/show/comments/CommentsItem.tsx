import { ICommentGetData } from '../../../../../interface/Interface';

export function CommentsItem({comment}: {comment: ICommentGetData}) {
    function hideHandler(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        const parent = event.currentTarget.closest('.comments-item-content');
        const text = parent?.querySelector('.comments-item-content-text');

        if (parent && text) {
            if (text.classList.contains('hidden-text')) {
                text.classList.remove('hidden-text');
                event.currentTarget.innerHTML = 'Свернуть';
            } else {
                text.classList.add('hidden-text');
                event.currentTarget.innerHTML = 'Показать полностью';
            }
        }
    }

    return (
        <div className="d-flex align-items-end comments-item">
            {comment.AUTHOR_PHOTO && 
                <div style={{backgroundImage: `url(${comment.AUTHOR_PHOTO})`}} className="comments-item-image"></div>
            }
            <div className="comments-item-content">
                <div className="d-flex justify-content-between align-items-center comments-item-header">
                    <div className="comments-item-name">
                        { comment.AUTHOR_NAME }
                    </div>
                    <div className="comments-item-date">
                        { comment.DATE }
                    </div>
                </div>
                <div className="comments-item-text">
                    <div className="hidden-text">
                        { comment.TEXT }
                    </div>
                    {comment.TEXT.length > 100 && 
                        <span
                            className="comments-item-text-show"
                            onClick={hideHandler}
                        >
                            Показать полностью
                        </span>
                    }
                </div>
            </div>
        </div>
    );
}