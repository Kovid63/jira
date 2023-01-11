import React, { useEffect, useState } from 'react';
import './App.css';
import Board from './Components/Board/Board';
import Editable from './Components/Editable/Editable';
import Modal from './Components/Modal/Modal';
import CardInfo from './Components/Cards/CardInfo/CardInfo';

function App() {

  const [mounted, setMounted] = useState(false);
  const [boards, setBoards] = useState([

    {
      id: Date.now() + Math.random() * 2,
      title: "To Do",
      cards: [],
      /* {
         id: Date.now() + Math.random(),
         title: "Card 1",
         date: "",
         desc: "bvg hsu sgb"
       },
       {
         id: Date.now() + Math.random(),
         title: "Card 2",
         date: "",
         desc: "bvg hsu sgb"
       },
       {
         id: Date.now() + Math.random(),
         title: "Card 2",
         date: "",
         desc: "bvg hsu sgb"
       },
       {
         id: Date.now() + Math.random(),
         title: "Card 2",
         date: "",
         desc: "bvg hsu sgb"
       }
     ]*/
    },
    {
      id: Date.now() + Math.random() * 2,
      title: "Processing",
      cards: [],
      //   {
      //     id: Date.now() + Math.random(),
      //     title: "Card 1",
      //     date: "",
      //     desc: "bvg hsu sgb"
      //   }
      // ]
    },
    {
      id: Date.now() + Math.random() * 2,
      title: "Testing",
      cards: [],
      //   {
      //     id: Date.now() + Math.random(),
      //     title: "Card 1",
      //     date: "",
      //     desc: "bvg hsu sgb"
      //   },
      //   {
      //     id: Date.now() + Math.random(),
      //     title: "Card 2",
      //     date: "",
      //     desc: "bvg hsu sgb"
      //   }
      // ]
    },
    {
      id: Date.now() + Math.random() * 2,
      title: "Completed",
      cards: [],
      //   {
      //     id: Date.now() + Math.random(),
      //     title: "Card 1",
      //     date: "",
      //     desc: "bvg hsu sgb"
      //   },
      //   {
      //     id: Date.now() + Math.random(),
      //     title: "Card 2",
      //     date: "",
      //     desc: "bvg hsu sgb"
      //   }
      // ]
    },
  ]);

  useEffect(() => {
    setMounted(true);
  }, [])

  useEffect(() => {
    if (!mounted) return;
    //setBoards(JSON.parse(localStorage.getItem('items')));
  }, [mounted])


  window.addEventListener('unload', () => {
      localStorage.setItem('items', JSON.stringify(boards));
  })

  const [target, setTarget] = useState({
    cid: "",
    bid: "",
  });

  const addCard = (title, bid) => {
    const cards = {
      id: Date.now() + Math.random(),
      title,
      date: "",
      desc: "",
    };

    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push(cards);
    setBoards(tempBoards);
  };

  const moveCard = (value, bid) => {

    const cards = {
      id: value.id,
      title: value.title,
      date: value.date,
      desc: value.desc,
    };

    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    console.log(index);
    const tempBoards = [...boards];
    tempBoards[index].cards.push(cards);
    setBoards(tempBoards);
  };

  const removeCard = (cid, bid) => {
    const bIndex = boards.findIndex((item) => item.id === bid);
    if (bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid);
    if (cIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[bIndex].cards.splice(cIndex, 1);
    setBoards(tempBoards);
  };

  const handleDragEnd = (cid, bid) => {
    let s_bIndex, s_cIndex, t_bIndex, t_cIndex;

    s_bIndex = boards.findIndex((item) => item.id === bid);
    if (s_bIndex < 0) return;

    s_cIndex = boards[s_bIndex]?.cards?.findIndex((item) => item.id === cid);
    if (s_cIndex < 0) return;

    t_bIndex = boards.findIndex((item) => item.id === target.bid);
    if (t_bIndex < 0) return;

    t_cIndex = boards[t_bIndex]?.cards?.findIndex((item) => item.id === target.cid);
    if (t_cIndex < 0) return;

    const tempBoards = [...boards];
    const tempCard = tempBoards[s_bIndex].cards[s_cIndex];

    tempBoards[s_bIndex].cards.splice(s_cIndex, 1);
    tempBoards[t_bIndex].cards.splice(t_cIndex, 0, tempCard);

    setBoards(tempBoards);
  };

  const handleDragEnter = (cid, bid) => {
    setTarget({
      cid,
      bid,
    });
  };

  const updateCard = (cid, bid, cards) => {
    const bIndex = boards.findIndex((item) => item.id === bid);
    if (bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid);
    if (cIndex < 0) return;

    const tempBoards = [...boards]
    tempBoards[bIndex].cards[cIndex] = cards;
    setBoards(tempBoards);
  }

  // useEffect(()=>{
  //   localStorage.setItem('Jira',JSON.stringify(boards));
  // },[boards])

  return (
    <div className="app">
      <div className="app_nav">
        <h1>JIRA   <span className="s_dec">SOFTWARE</span></h1>
        <div className="app_nav_button">
          <Editable
            displayClass="app_nav_button_add"
            text="Create Task" placeholder="Enter Board Title"
            onSubmit={(value) => {addCard(value, boards[0]?.id)}}
          />
        </div>
      </div>
      <div className="app_outer">
        <div className="app_boards">
          {
            boards.map((item) => (
              <Board key={item.id} board={item}
                boards={boards}
                moveCard={moveCard}
                addCard={addCard}
                removeCard={removeCard}
                handleDragEnd={handleDragEnd}
                handleDragEnter={handleDragEnter}
                updateCard={updateCard}
              />
            ))
          }

        </div>
      </div>
    </div>
  );
}

export default App;
