import React, { useEffect, useState } from "react";
import { Type, List, Calendar, Clipboard } from "react-feather";
import Editable from "../../Editable/Editable";
import Modal from '../../Modal/Modal';
import './CradInfo.css'

function CardInfo(props) {

  const [values, setValues] = useState({ ...props.cards });

  useEffect(() => {
    props.updateCard(props.cards.id, props.boardId, values);
  }, [values]);

  return (
    <div>
      <Modal onClose={() => props.onClose()}>
        <div className="cardinfo">
          <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <Type />
              Title
            </div>
            <div className="cardinfo_box_body">
              <Editable
                text={values.title}
                default={values.title}
                placeholder="Enter Title"
                buttonText="Set Title"
                onSubmit={(value) => setValues({ ...values, title: value })}
              />
            </div>
          </div>

          <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <List />
              Description
            </div>
            <div className="cardinfo_box_body">
              <Editable
                text={values.desc || "Add a description"}
                default={values.desc}
                placeholder="Enter Description"
                buttonText="Set Description"
                onSubmit={(value) => setValues({ ...values, desc: value })}
              />
            </div>
          </div>

          <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <Calendar />
              Date
            </div>
            <div className="cardinfo_box_body">
              <input type="date" defaultValue={values.date ? new Date(values.date).toISOString().substr(0, 10) : ""}
                onChange={(event) => setValues({ ...values, date: event.target.value })}
              />
            </div>
          </div>
          <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <Clipboard/>
              Where To Put?
            </div>
            <div style={{ display: 'flex',flexDirection: 'row' , justifyContent: 'space-between', marginTop: '10px' }}>
            <div onClick={() => { props.moveCard(values, props.boards[0].id)}} className="board-type-container">
              Todo
            </div>
            <div onClick={() => { props.moveCard(values, props.boards[1].id)}} className="board-type-container">
              Processing
            </div>
            <div onClick={() => { props.moveCard(values, props.boards[2].id)}} className="board-type-container">
              Testing
            </div>
            <div onClick={() => { props.moveCard(values, props.boards[3].id)}} className="board-type-container">
              Completed
            </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CardInfo