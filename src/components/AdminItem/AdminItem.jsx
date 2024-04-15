import React from 'react';
import styles from './AdminItem.module.css';
import {MdEdit, MdDelete} from 'react-icons/md';

const AdminItem = ({title, editHandler, deleteHandler, id, dark}) => {
  return <div className={dark ? `${styles.item} ${styles.dark}` : styles.item}>
    <h1>{title}</h1>
    <span onClick={() => editHandler(id)}><MdEdit/></span>
    <span onClick={() => deleteHandler(id)}><MdDelete/></span>
  </div>;
};

export default AdminItem;