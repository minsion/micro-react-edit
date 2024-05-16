import '../App.css';

import React, {useEffect, useRef, useState}  from 'react'
import Editor from './Eidtor';
import { Button, Modal } from 'antd';
import { CheckOutlined, EditOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';

function App() {
  const [list, setList] = useState([
    {
      postTitle: 'Orci varius natoque penatibus et magnis',
      html: "<p><strong>Nunc eu quam sit amet justo elementum mollis</strong></p><p>Maecenas quam nunc, sagittis non condimentum at, rutrum sit amet eros. Fusce rutrum, lectus in blandit sagittis, mi tortor ullamcorper mi, vitae vestibulum libero quam a nisi. In eu mauris et neque sodales porta eu eget dui. Nunc eu quam sit amet justo elementum mollis.</p><p>Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed laoreet metus nulla, in gravida urna rhoncus in. Proin laoreet semper tortor ac posuere.</p>"
    },
    {
      postTitle: "Proin laoreet semper",
      html: "<p><strong>Proin laoreet semper</strong></p><p>Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed laoreet metus nulla, in gravida urna rhoncus in. Proin laoreet semper tortor acp posuere.</p>"
    }
  ])
  const [open, setOpen] = useState(false)
  const modalRef = useRef(null)
  const [id, setId] = useState(0)
  const [modalData, setModalData] = useState()
 
  useEffect(() => {

  }, [])
  
  const handleEdit = (item, id) => {
    setOpen(true)
    setModalData(item)
    setId(id)
  }
  const handleOk = () => {
    setOpen(false)
    list[id] = modalRef.current
    setList(list)
  }
  const handleCancel = () => {
    setOpen(false)
  }
  const handleDelete = (item, id) => {
    list[id] = []
    const filterData = list.filter(con => con.postTitle)
    setList(filterData)
  }
  return (
    <div className="App">
      {
        list.length > 0 && list.map((item, i) => {
          return <div className='list-content' key={i}>
            <div className='title'>
              <div className='left'>{item.postTitle}</div>
              <div className='center'></div>
              <div className='right'>
                <Button
                  shape="round"
                  icon={<EditOutlined />}
                  className='edit-btn'
                  onClick={() => handleEdit(item, i)}
                >Edit</Button>
                <Button
                  className='del-btn'
                  shape="circle"
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(item, i)}
                ></Button>
              </div>
            </div>
            <div dangerouslySetInnerHTML={{__html: item.html}} />
          </div>
        })
      }
      <Modal
        closable={false}
        open={open}
        width={800}
        title="Edit Post"
        footer={[
          <Button style={{ width: 300, height: 40, float: 'left', backgroundColor: '#591fca', color: '#fff' }} icon={<CheckOutlined />} key="submit" onClick={handleOk}>
            Save
          </Button>,
          <Button key="cancel" type='text' icon={<CloseOutlined />} onClick={handleCancel}>
           Cancel
          </Button>,
        ]}
      >
        <Editor ref={modalRef} content={modalData} />
      </Modal>
    </div>
  );
}

export default App;
