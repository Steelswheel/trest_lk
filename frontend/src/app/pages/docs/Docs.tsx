import { PageTitle } from '../../../_metronic/layout/core';
import { useGetKpkDocumentsQuery } from '../../store/appApi';
import { 
    FilePdfOutlined, 
    FileWordOutlined, 
    FileUnknownOutlined 
} from '@ant-design/icons';
import { Spin } from 'antd';
import 'antd/dist/antd.css';

export function Docs() {
    let { data, isLoading } = useGetKpkDocumentsQuery({}, {
        refetchOnFocus: false
    });

    function getIcon(type: string) {
        switch (type) {
            case 'application/pdf':
                return <FilePdfOutlined/>;
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return <FileWordOutlined/>;
            default:
                return <FileUnknownOutlined/>;
        }
    }

    return (
        <>
            <PageTitle breadcrumbs={[]}>
                Управляющие документы
            </PageTitle>

            {isLoading && 
                <div className="grid-spinner-wrap">
                    <Spin 
                        size="large" 
                        tip="Загрузка..." 
                        spinning={isLoading} 
                    />
                </div>
            }

            {!isLoading && data && data.length > 0 &&
                <div className="docs row align-items-stretch">
                    {data.map((item: {name: string; type: string; url: string}, index: number) => (
                        <div 
                            className="col-12 col-md-6 col-lg-3 my-2"
                            key={`docs-card-${index}`}
                        >
                            <div className="docs-card d-flex align-items-center">
                                <div className="docs-card-icon">
                                    {getIcon(item.type)}
                                </div>
                                <a
                                    href={process.env.REACT_APP_API_URL + '/' + item.url}
                                    className="docs-card-name"
                                    target="_blank"
                                    rel="noreferrer"
                                    download
                                >
                                    {item.name}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </>
    )
}