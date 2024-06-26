import {useState} from 'react';
export default function Player({name, symmbol, isActive, onChangeName}) {
    const [isEditing, setIsEditing] = useState(false );
    const [playerName, setPlayerName] = useState(name );

    function handelEdit(){
        setIsEditing((editing) => !editing);
        if (isEditing) {
            onChangeName(symmbol, playerName);
        }
    }
    function handleChange(event) {
        setPlayerName(event.target.value)
    }


    let editablePlayerName = <span className="player-name">{playerName}</span>
    if (isEditing) {
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symmbol}</span>
            </span>
            <button onClick={handelEdit}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}