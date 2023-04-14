import {  IGridDesignRow, IDesignFile } from '../../../interface/Interface';

export function Files({value}: {value: IGridDesignRow['FILES']}) {
    return <>
        {value?.map((file: IDesignFile) => {
            return <a href={file.LINK} key={file.KEY} download style={{display: 'inline-block'}} className="m-2">
                <span className="badge badge-light-primary">
                    {file.NAME}
                </span>
            </a>
        })}
    </>
}