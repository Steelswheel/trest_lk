import { useState, useEffect } from 'react';
import { useGetCommentsQuery, useLazyAddCommentQuery } from '../../../../../store/appApi';
import InputTexarea from '../../../../../components/Input/InputTextarea';
import { ICommentGetData } from '../../../../../interface/Interface';
import { CommentsItem } from './CommentsItem';

export function Comments({dealId, className}: {dealId: number, className?: string}) {
    let { data: commentsData, isFetching, refetch } = useGetCommentsQuery(dealId, {
        refetchOnFocus: false
    });

    const [reposFetch] = useLazyAddCommentQuery({refetchOnFocus: false});
    const [text, setText] = useState('');
    const [commentsHidden, setCommentsHidden] = useState(true);
    const [placeholder, setPlaceholder] = useState('Добавить комментарий');
    let status: '' | 'warning' | 'error' | undefined;
    const [inputStatus, setInputStatus] = useState(status);
    let arr: Array<any> = [];
    const [comments, setComments] = useState(arr);
    let maxCount = 5;

    function switchComments() {
        if (commentsData) {
            if (commentsHidden) {
                setCommentsHidden(false);
                setComments(commentsData.map((comment: ICommentGetData) => (
                    <CommentsItem comment={comment} key={comment.ID} />
                )));
            } else {
                setCommentsHidden(true);
                setComments(commentsData.slice(0, maxCount).map((comment: ICommentGetData) => (
                    <CommentsItem comment={comment} key={comment.ID} />
                )));

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
    }

    function addComment(): void {
        if (text && text.length > 0) {
            let comment = {
                from_partner: true,
                show_to_partner: true,
                text: text,
                files: [],
                dealId
            };

            reposFetch(comment).then((data) => {
                if (data) {
                    setText('');
                    refetch();
                }
            });
        } else {
            setPlaceholder('Введите текст комментария');
            setInputStatus('error');
        }
    }

    useEffect(() => {
        if (commentsData) {
            setComments(commentsData.slice(0, maxCount).map((comment: ICommentGetData) => (
                <CommentsItem comment={comment} key={comment.ID} />
            )));
        }
    }, [commentsData, setComments, maxCount]);

    return (
        <div className={`custom-card mb-5 mb-xl-10 comments ${className ? className : ''}`}>
            <div className="custom-card-header">
                Комментарии
            </div>
            <div className="custom-card-content">
                <div className="comments-form">
                    <InputTexarea 
                        value={text}
                        onChange={(value) => setText(value)} 
                        isEdit={true} 
                        allowClear={false}
                        placeholder={placeholder}
                        status={inputStatus}
                        autoSize={true}
                        onFocus={() => {
                            setPlaceholder('Добавить комментарий');
                            setInputStatus(undefined);
                        }}
                        onBlur={() => {
                            setPlaceholder('Добавить комментарий');
                            setInputStatus(undefined);
                        }}
                    />

                    <div className="comments-form-buttons">
                        <div>
                            <i className="fa-regular fa-image comments-form-buttons-files"></i>
                        </div>
                        <div>
                            <i 
                                className="fa-sharp fa-solid fa-paper-plane comments-form-buttons-send"
                                onClick={addComment}
                            />
                        </div>
                    </div>
                </div>
            
                {!isFetching && commentsData && 
                    <>
                        <div className="comments-content d-flex flex-column">
                            {comments}
                        </div>
                        {
                            commentsData.length >= maxCount &&
                            <div
                                className="comments-show-other"
                                onClick={switchComments}
                            >
                                {commentsHidden ? 'Показать предыдущие комментарии' : 'Свернуть'}
                            </div>
                        }
                    </>
                }
            </div>
        </div>
    );
}