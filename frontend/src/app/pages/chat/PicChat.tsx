import {toApiUrl} from '../../../_metronic/helpers'

interface IPicChat {
    src?: string
    name: string
    lastName: string
    isOnline?: boolean
    size?: number
}

export const PicChat = ({src, name, lastName, isOnline, size = 45}: IPicChat) => {

    const initials = name[0] + "" + lastName[0] + ""

    return (<>
        <div className={`symbol symbol-${size}px`}>

            {src && <img style={{objectFit: 'cover'}} alt='Pic' src={toApiUrl(src)}/>}

            {!src && <span className="symbol-label bg-light-danger text-danger fs-6 fw-bolder">
                {initials}
            </span>}

            {isOnline && <div className="symbol-badge bg-success start-100 top-100 border-4 h-8px w-8px ms-n2 mt-n2"/>}
        </div>
    </>)
}

