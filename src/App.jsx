import { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import { FaPerson, FaPersonDress  } from "react-icons/fa6";

const socket = io("https://surrounded-server-127d32d9b659.herokuapp.com"); 
function App() {
  const [rule, setRule] = useState("Waiting for host");
  const [password, setPassword] = useState("");
  const [admin, isAdmin] = useState(false)
  const [availableRules, setAvailableRules] = useState([]);

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
    "Repeat part of the question before answering",
    "Your answer must contain a number, even if it doesn’t make sense",
    "Always reference something that happened 'yesterday'",
    "At any point, touch your head/face while you answer",
    "Use the name of a famous person somewhere in your answer",
    "Act like you’re unsure of your answer, even if it’s obvious",
    "Your answer must always contain the word 'technically'",
    "Include the name of a country in your response",
    "Your answer must contain the word 'idk'",
    "Look at the ceiling when answering",
    "Laugh before or after answering, even if it's not funny",
    "Your answer must contain a famous movie title",
    "Your answer must include a type of food",
    "Your answer must include a reference to the weather",
    "Don't look at the person while you are answering",
    "Answer as if you're offended",
    "Incorporate the phrase \"what do you mean\" into your answer",
    "Answer in one sentence", 
    "Mention how \"tall\" or \"short\" something is in your answer ",
    "Answer as serious as possible (don't smile or laught)", 
    "Compliment the person during your answer", 
    "Mention the name of a fast food restaurant in your answer", 
    "Mention a city in your answer", 
    "At any point, point to someone while you answer",
    "Clap your hands before or after answering",
    "Use a rhyme in your answer",
    "Use only single-syllable words in your answer",
    "Mention a sport in your answer",
    "Include \"In my opinon...\" somewhere in your answer",
    "Reference something you are wearing somewhere in your asnwer",
    "Say the name of the person to your right at some point in your answer",
    "Say the name of the person to your left at some point in your answer",
    "At some point, stretch while you answer",
    "Every sentence must start with a word that starts with \"T\"",
    "Every sentence must start with a word that starts with \"s\"",
    "Every sentence must start with a word that starts with \"A\"",
    "At some point, stutter",
    "Every answer must end with \"You know?\"",
    "Say the name of a flower in your answer",
    "Say the name of a pokemon in your answer",
    "Say \"Chat\" at any point during your answer",
    "Only speak while tapping your foot",
    "Nod/shake your head after every sentence",
    "Squint while answering",
    "Look at the floor while answering",
    "Mention something related to gambling in your answer",
    "Say a type of rock/gem in your answer (Granite, Diamond, Ruby)",
    "Act like you really don't want to answer before givng your answer",
    "Mention something space related in your answer",
    "The person to your left ust do the \"layup\" gesture before your answer",
    "Say \"I'm cooked\" or \"I'm so cooked\" before you answer",
    "Place something on the floor/table before your answer",
    "Say your height at some point in your answer",
    "Answer in the form of a metaphor",
    "Put your hands in the \"prayer\" positon, while answering",
  ];

  useEffect(() => {
    socket.on("updateRule", (newRule) => {
      setRule(newRule);
    });

    return () => {
      socket.off("updateRule"); 
    };
  }, []);

  useEffect(() => {
    setAvailableRules([...rules]);
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
    if (availableRules.length === 0) {
      setAvailableRules([...rules]); 
    }
    const randomIndex = Math.floor(Math.random() * availableRules.length);
    const newRule = availableRules[randomIndex];
    setAvailableRules(availableRules.filter((_, index) => index !== randomIndex));
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
          <div className="icon"><FaPerson /></div>
          <div className="icon"><FaPersonDress /></div>
          <div className="icon"><FaPerson /></div>
          <div className="icon"><FaPerson /></div>
          <div className="icon"><FaPerson /></div>
          <div className="icon"><FaPersonDress /></div>
          <div className="icon"><FaPerson /></div>
          <div className="icon"><FaPersonDress /></div>
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
