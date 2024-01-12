import React, { useState } from 'react';

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

export default function App(): React.JSX.Element {
  const [friends, setFriends] = useState<Friends[]>(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState<boolean>(false);

  function handleAddShowFriend() {
    setShowAddFriend((s) => !s);
  }

  function handleAddFriend(friend: Friends) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleAddShowFriend}>
          {showAddFriend ? 'Close' : 'Add friend'}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

type FriendsListProps = {
  friends: Friends[];
};

// !Friends List component
function FriendsList({ friends }: FriendsListProps): React.JSX.Element {
  return (
    <ul>
      {friends.map((friend) => {
        return <Friend key={friend.id} {...friend} />;
      })}
    </ul>
  );
}

type FriendProps = {
  name: string;
  image: string;
  balance: number;
};

// !Friend component
function Friend({ name, image, balance }: FriendProps): React.JSX.Element {
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

      <Button>Select</Button>
    </li>
  );
}

type FromAddFriendProps = {
  onAddFriend: (friend: Friends) => void;
};
// !Form Add Friend component
function FormAddFriend({ onAddFriend }: FromAddFriendProps): React.JSX.Element {
  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<string>(
    'https://i.pravatar.cc/48?u=499476'
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !image) return;

    const id: number = crypto.getRandomValues(new Uint32Array(1))[0];

    const newFriend = {
      id,
      name,
      image: `${image}?random=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName('');
    setImage('https://i.pravatar.cc/48?u=499476');
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🤗Friend</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>📷Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

// !Form Split Bill component
function FormSplitBill(): React.JSX.Element {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with x</h2>

      <label>💰Bill value</label>
      <input type="number" />

      <label>🧍Your expense</label>
      <input type="number" />

      <label>🧑‍🤝‍🧑x's expense</label>
      <input type="number" disabled />

      <label>🤑Who is paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">x</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

// !Button component
function Button({ children, onClick }: ButtonProps): React.JSX.Element {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
