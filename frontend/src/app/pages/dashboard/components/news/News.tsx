interface INewsItem {
    ID: string | number;
    UF_ASSIGNED_BY_ID: string | number;
    UF_DATE_CREATE: string;
    UF_IMAGE: any;
    UF_IS_ACTIVE: string;
    UF_PUBLICATION_DATE: string;
    UF_TEXT: string;
    UF_TITLE: string;
}

export function News({data}: {data: INewsItem}) {
    return (<>
        <a href={`/news/${data.ID}`} target="_blank" className="dashboard-news-link">
            <div 
                className="dashboard-news-image"
                style={data.UF_IMAGE ? {backgroundImage: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url(${process.env.REACT_APP_API_URL + data.UF_IMAGE.url})`} : {}}
            >
                <div className="dashboard-news-title">
                    {data.UF_TITLE}
                </div>
            </div>
        </a>
        <div className="dashboard-news-content d-flex flex-column justify-content-between">
            <div 
                className="dashboard-news-content-text"
                dangerouslySetInnerHTML={data.UF_TEXT ? {__html: JSON.parse(data.UF_TEXT)} : undefined}
            >
            </div>
            <div className="dashboard-news-content-footer d-flex align-items-center justify-content-between"> 
                <a className="dashboard-news-link" href="/news">
                    Все новости
                </a>
                <div className="dashboard-news-date">
                    {data.UF_PUBLICATION_DATE}
                </div>
            </div>
        </div>
    </>);
}