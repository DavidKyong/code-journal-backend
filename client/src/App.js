import { useState } from 'react';
import EntryForm from './EntryForm';
import EntryList from './EntryList';
import { NavBar } from './NavBar';
import { useEffect } from 'react';
import './App.css';

export default function App() {
  /* What is being currently edited:
   * undefined - nothing, display entries
   * null - creating a new entry
   * defined - the entry being edited
   */
  const [editing, setEditing] = useState();
  const [entries, setEntries] = useState([]);

  console.log('Entries!: ', entries);
  useEffect(() => {
    async function getData() {
      const data = await readData();
      setEntries(data);
    }
    if (!entries) {
      getData();
    }
  }, [entries]);

  async function readData() {
    const res = await fetch('/api/journal');
    if (!res.ok) throw new Error(`fetch Error ${res.status}`);
    return await res.json();
  }

  return (
    <>
      <NavBar onEntries={() => setEditing(undefined)} />
      {editing !== undefined && (
        <EntryForm
          entry={editing}
          onSubmit={() => setEditing(undefined)}
          entries={entries}
          setEntries={setEntries}
        />
      )}
      {editing === undefined && (
        <EntryList
          onCreate={() => setEditing(null)}
          onEdit={(entry) => setEditing(entry)}
          entries={entries}
        />
      )}
    </>
  );
}
