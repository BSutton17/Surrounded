import { FaPerson, FaPersonDress, FaArrowRightArrowLeft } from "react-icons/fa6";

// Same ring as Surrounded, but in swapping pairs: person, swap arrow, person.
// Each arrow is turned to run along the ring between the two it connects.
const ring = [
  { Icon: FaPerson, tone: "orange" },
  { Icon: FaArrowRightArrowLeft, tone: "swap", turn: 120 },
  { Icon: FaPersonDress, tone: "green" },
  { Icon: FaPersonDress, tone: "orange" },
  { Icon: FaArrowRightArrowLeft, tone: "swap", turn: 210 },
  { Icon: FaPerson, tone: "green" },
  { Icon: FaPerson, tone: "orange" },
  { Icon: FaArrowRightArrowLeft, tone: "swap", turn: 300 },
  { Icon: FaPersonDress, tone: "green" },
  { Icon: FaPersonDress, tone: "orange" },
  { Icon: FaArrowRightArrowLeft, tone: "swap", turn: 30 },
  { Icon: FaPerson, tone: "green" },
];

function FreakyFriday({ state, playerId, name, onNameChange, admin, onNewRound, onSelectMiddle }) {
  const players = state?.players ?? [];
  const nameOf = (id) => players.find((p) => p.id === id)?.name || "???";
  const present = players.filter((p) => p.name && p.active);

  let message;
  if (!name.trim()) {
    message = <h1 className="rule">Enter your name above to join</h1>;
  } else if (!state?.round) {
    message = <h1 className="rule">Waiting for host</h1>;
  } else if (!(playerId in state.assignments)) {
    message = <h1 className="rule">Waiting for the next round</h1>;
  } else if (state.assignments[playerId] === "middle") {
    message = <h1 className="rule">{"You're in the middle"}</h1>;
  } else if (state.assignments[playerId] === null) {
    message = <h1 className="rule">{"No swap this round. Answer truthfully or try to decieve the person in the middle..."}</h1>;
  } else {
    message = (
      <h1 className="rule">
        You swapped with <span className="swap-name">{nameOf(state.assignments[playerId])}</span>
      </h1>
    );
  }

  return (
    <>
      <input
        className="name-input"
        placeholder="Your name"
        maxLength={20}
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
      />

      <div className="title-container">
        <h1 className="title">Freaky Friday</h1>

        <div className="icons">
          {ring.map(({ Icon, tone, turn }, i) => (
            <div key={i} className={`icon ${tone}`}>
              <Icon style={turn ? { transform: `rotate(${turn}deg)` } : undefined} />
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        {message}
        {admin && <button onClick={onNewRound}>New Round</button>}
      </div>

      {admin && present.length > 0 && (
        <div className="middle-picker">
          <div className="middle-label">{"Who's in the middle?"}</div>
          {present.map((p) => (
            <button
              key={p.id}
              className={p.id === state.middleId ? "selected" : ""}
              onClick={() => onSelectMiddle(p.id === state.middleId ? null : p.id)}
            >
              {p.name}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export default FreakyFriday;
