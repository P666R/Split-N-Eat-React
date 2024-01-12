interface Friends {
  id: number;
  name: string;
  image: string;
  balance: number;
}

const initialFriends: Friends[] = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

function App(): JSX.Element {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
      </div>
    </div>
  );
}

function FriendsList(): JSX.Element {
  return (
    <>
      <ul>
        {initialFriends.map((friend) => {
          return <Friend key={friend.id} {...friend} />;
        })}
      </ul>
      <button className="button">Add Friend</button>
    </>
  );
}

function Friend({ id, name, image, balance }: Friends): JSX.Element {
  return (
    <li>
      <img src={image} alt={name} />
      <h3>{name}</h3>

      {balance < 0 && (
        <p className="red">
          You owe {name} {Math.abs(balance)}₹
        </p>
      )}

      {balance > 0 && (
        <p className="green">
          {name} owes you {balance}₹
        </p>
      )}

      {balance === 0 && <p>You and {name} are even</p>}

      <button className="button">Select</button>
    </li>
  );
}

export default App;
