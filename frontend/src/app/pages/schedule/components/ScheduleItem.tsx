import { useState, useEffect } from 'react';
import { Collapse } from 'antd';
import 'antd/dist/antd.css';
import { cloneDeep } from 'lodash';

interface IScheduleItem {
    UF_SORT: number;
    UF_TITLE: string;
    UF_TEXT: string;
}

export function ScheduleItem({data, index, openModal}: {data: IScheduleItem, index: number, openModal: (src: string) => void}) {
    const [content, setContent] = useState(data);

    const { Panel } = Collapse;

    useEffect(() => {
        let obj = cloneDeep(data);

        if (obj.UF_TEXT) {
            obj.UF_TEXT = JSON.parse(obj.UF_TEXT).replace(/\/upload\/elTiptapImg\/[a-zA-z0-9-_.]{1,}/g, (str: string) => process.env.REACT_APP_API_URL + str);
            obj.UF_TEXT = obj.UF_TEXT.replace(/<img[\sa-zA-Z0-9."-=_\/]{1,}>/g, (str: string) => '<div class="schedule-image-wrapper"><svg viewBox="64 64 896 896" focusable="false" data-icon="zoom-in" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z"></path></svg>' + str + '</div>');
        }

        setContent(obj);
    }, [data]);

    useEffect(() => {
        console.log(document.querySelectorAll('.schedule-image-wrapper'));
    }, []);

    function getImage(event: any) {
        if (event.target.hasAttribute('src')) {
            openModal(event.target.getAttribute('src'));
        }
    }

    return (
        <Collapse className="my-2">
            <Panel 
                key={index}
                header={data.UF_TITLE}
                className="schedule-item"
            >
                <div
                    className="schedule-item-content"
                    onClick={getImage}
                    dangerouslySetInnerHTML={content.UF_TEXT ? {__html: content.UF_TEXT} : undefined}
                ></div>
            </Panel>
        </Collapse>
    );
}