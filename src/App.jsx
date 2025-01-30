import { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import { FaPerson, FaPersonDress  } from "react-icons/fa6";

const socket = io("https://surrounded-server-127d32d9b659.herokuapp.com"); 
function App() {
  const [rule, setRule] = useState("");
  const [password, setPassword] = useState("");
  const [admin, isAdmin] = useState(false)

  const rules = [
    "Answer as if you are the person to your left",
    "Answer as if you are the person to your right",
    "Answer the question how the person asking it would answer",
    "Give the opposite of your real answer",
    "Use exactly five words in every answer",
    "Say 'uhh' or 'umm' before you answer",
    "Always mention an animal in your response",
    "Subtly work the word 'school' into your answer",
    "Your answer must always contain a color",
    "Answer correctly, but say the opposite emotion (e.g., 'I love it' instead of 'I hate it')",
    "Repeat part of the question before answering",
    "Your answer must contain a number, even if it doesn’t make sense",
    "Always reference something that happened 'yesterday'",
    "Answer normally, but touch your face whenever you lie",
    "Use the name of a famous person somewhere in your answer",
    "Act like you’re unsure of your answer, even if it’s obvious",
    "Your answer must always contain the word 'technically'",
    "Include the name of a country in your response",
    "Your answer must contain the word 'idk'",
    "Look at the ceiling when answering",
    "Laugh before or after answering, even if it's not funny",
    "Your answer must contain a famous movie title",
    "Always smile while answering, no matter the question",
    "Your answer must include a type of food",
    "Your answer must include a reference to the weather",
    "Don't look at the person while you are answering",
    "Answer as if you're offended"
  ];

  useEffect(() => {
    socket.on("updateRule", (newRule) => {
      setRule(newRule);
    });

    return () => {
      socket.off("updateRule"); 
    };
  }, []);

  useEffect(()=>{
    if(password=="5648"){
      isAdmin(true);
    }
    else{
      isAdmin(false);
    }
  },[password])

  const changeRule = () => {
    const newRule = rules[Math.floor(Math.random() * rules.length)];
    setRule(newRule);
    socket.emit("ruleChange", newRule);
  };

  return (
    <>
      <div className="title-container">
        <h1 className="title">Surrounded</h1>
        <div className="icons">
        <div className="icon"><FaPerson /></div>
          <div className="icon"><FaPersonDress /></div>
          <div className="icon"><FaPerson /></div>
          <div className="icon"><FaPersonDress /></div>
          <div className="icon"><FaPersonDress /></div>
          <div className="icon"><FaPerson /></div>
          <div className="icon"><FaPersonDress /></div>
          <div className="icon"><FaPersonDress /></div>
          <div className="icon"><FaPerson /></div>
          <div className="icon"><FaPersonDress /></div>
          <div className="icon"><FaPersonDress /></div>
          <div className="icon"><FaPerson /></div>
        </div>
      </div>
  
      <div className="container">
        <h1 className="rule">{rule}</h1>
        {admin && <button onClick={changeRule}>Change Rule</button>}
      </div>
      <input value={password} onChange={(e)=>setPassword(e.target.value)}/>
    </>
  );
  
}

export default App;
