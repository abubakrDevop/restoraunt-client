import styles from './UploadInput.module.css';
import {MdDriveFolderUpload} from 'react-icons/md';
import {sliceTitle} from '../../utils/sliceTitle.js';

const UploadInput = ({setPhoto, photo}) => {
  return (
    <label className={styles.label}>
      <div className={styles.title}>
        <h1>{sliceTitle(photo?.name) || 'Выберите файл...'}</h1>
        <MdDriveFolderUpload size={18}/>
      </div>
      <input tabIndex="-1" onChange={setPhoto} type="file" name="myImage"
             accept="image/jpg"/>
    </label>
  );
};

export default UploadInput;