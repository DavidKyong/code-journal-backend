// import { readEntries } from './data';
import { useEffect } from 'react';

export default function EntryList({ onCreate, onEdit, entries, setEntries }) {
  // const entries = readEntries();
  // const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await readData();
      setEntries(data);
    }
    if (!entries) getData();
  }, [entries, setEntries]);

  return (
    <div className="container">
      <div className="row">
        <div className="column-full d-flex justify-between align-center">
          <h1>Entries</h1>
          <h3>
            <button
              type="button"
              className="white-text form-link"
              onClick={onCreate}>
              NEW
            </button>
          </h3>
        </div>
      </div>
      <div className="row">
        <div className="column-full">
          <ul className="entry-ul">
            {entries.map((entry) => (
              <Entry key={entry.entryId} entry={entry} onEdit={onEdit} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Entry({ entry, onEdit }) {
  return (
    <li>
      <div className="row">
        <div className="column-half">
          <img
            className="input-b-radius form-image"
            src={entry.photoUrl}
            alt=""
          />
        </div>
        <div className="column-half">
          <div className="row">
            <div className="column-full d-flex justify-between">
              <h3>{entry.title}</h3>
              <i
                className="fa-solid fa-pencil"
                onClick={() => onEdit(entry)}></i>
            </div>
          </div>
          <p>{entry.notes}</p>
        </div>
      </div>
    </li>
  );
}

async function readData() {
  const res = await fetch('/api/journal');
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}
