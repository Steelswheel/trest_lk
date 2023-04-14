import { Modal } from 'antd';
import 'antd/dist/antd.css';

interface IImageDetail {
    isModalOpen: boolean;
    handleCancel: () => void
    imageUrl: string
}

export function ImageDetail({isModalOpen,handleCancel, imageUrl} : IImageDetail) {
    return (
        <Modal 
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            width="70%"
            centered={true}
        >
            <div className="image-detail">
                <img src={imageUrl} alt="modal-image" />
            </div>
        </Modal>
    );
}