import InputFile_ from '../../../components/Input/InputFile_';

export function PartnerFiles({files, setFiles}: {files: Array<any>, setFiles: React.Dispatch<React.SetStateAction<any[]>>}) {
    function handleChange(val: any) {
        const arr = val.map((item: any) => item.response);

        setFiles(arr);
    }

    return (
        <InputFile_
            value={files}
            onChange={handleChange}
            isEdit={true}
            uploadDir={{path: '/lk_design'}}
        />
    );
}